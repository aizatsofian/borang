// Gantikan dengan ID Folder Google Drive anda
const FOLDER_ID = "1syIm9KNyEAck1RUtcov1ktzPxFYAm1L7"; 

// Maklumat ToyyibPay - Disimpan dalam Script Properties
const TOYYIBPAY_SECRET_KEY = PropertiesService.getScriptProperties().getProperty('TOYYIBPAY_SECRET_KEY');
const TOYYIBPAY_CATEGORY_CODE = PropertiesService.getScriptProperties().getProperty('TOYYIBPAY_CATEGORY_CODE');
const TOYYIBPAY_CREATE_BILL_URL = "https://toyyibpay.com/index.php/api/createBill";
const TOYYIBPAY_PAYMENT_URL = "https://toyyibpay.com/";

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const folder = DriveApp.getFolderById(FOLDER_ID);
   const parts = Utilities.parseMultipart(e.postData.getDataAsString(), e.postData.getContentType());

const data = {};
let cidbBlob, icBlob, certBlob;

parts.forEach(part => {
  const disposition = part.headers['Content-Disposition'];
  const nameMatch = disposition && disposition.match(/name="([^"]+)"/);
  const name = nameMatch ? nameMatch[1] : null;

  if (name) {
    if (part.blob.getContentType().startsWith('image/')) {
      if (name === "oldCidbPic") cidbBlob = part.blob;
      else if (name === "icPic") icBlob = part.blob;
      else if (name === "academicCertPic") certBlob = part.blob;
    } else {
      data[name] = part.getDataAsString();
    }
  }
});

    const timestamp = new Date();

    Logger.log("e.parameter keys:", Object.keys(e.parameter));
    Logger.log("e.files keys:", Object.keys(e.files || {}));
    
    // ================== BAHAGIAN DIPERBAIKI ==================
    // Fungsi untuk memuat naik fail. Kini ia menerima blob terus dari e.parameter.
// Gunakan emel sebagai pengecam folder
const applicantIdentifier = data.email || `user-${timestamp.getTime()}`;

// CIPTA FOLDER PERMOHONAN DALAM FOLDER UTAMA
const parentFolder = DriveApp.getFolderById(FOLDER_ID);
const applicantFolder = parentFolder.createFolder(`${applicantIdentifier}_${timestamp.getTime()}`);

// Fungsi upload fail ke folder pemohon
const uploadFileToFolder = (fileBlob, fieldName) => {
  if (fileBlob) {
    const fileName = `${fieldName}_${timestamp.getTime()}.${fileBlob.getContentType().split("/")[1] || 'jpg'}`;
    const file = applicantFolder.createFile(fileBlob).setName(fileName);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return file.getUrl();
  }
  return "Tiada Fail Dimuat Naik";
};

// Simpan fail ke dalam folder pemohon
const cidbUrl = uploadFileToFolder(cidbBlob, "CIDB_Lama");
const icUrl = uploadFileToFolder(icBlob, "IC");
const certUrl = uploadFileToFolder(certBlob, "Sijil_Akademik");

Logger.log("Nama pemohon: " + data.email);
Logger.log("Blob CIDB: " + (cidbBlob ? cidbBlob.getContentType() : "Tiada"));
Logger.log("Blob IC: " + (icBlob ? icBlob.getContentType() : "Tiada"));
Logger.log("Blob Sijil: " + (certBlob ? certBlob.getContentType() : "Tiada"));


    // ================== AKHIR BAHAGIAN DIPERBAIKI ==================

    // Sediakan data untuk ToyyibPay
    const pricePerYear = 1000; // Harga dalam sen (cth: RM10.00)
    const amount = parseInt(data.applicationYears) * pricePerYear;

    const billData = {
      'billName': 'Permohonan Kad CIDB',
      'billDescription': `Bayaran untuk permohonan kad CIDB selama ${data.applicationYears} tahun.`,
      'billPriceSetting': 1,
      'billPayorInfo': 1,
      'billAmount': amount,
      'billReturnUrl': '',
      'billCallbackUrl': '',
      'billExternalReferenceNo': `CIDB-${timestamp.getTime()}`,
      'billTo': data.nextOfKinName,
      'billEmail': data.email,
      'billPhone': data.phone,
      'billSplitPayment': 0,
      'billSplitPaymentArgs': '',
      'billPaymentChannel': '0',
      'billContentEmail': 'Terima kasih atas bayaran anda!',
      'billChargeToCustomer': 1
    };

    // Panggil API ToyyibPay untuk cipta bil
    const options = {
      'method': 'post',
      'payload': {
        'userSecretKey': TOYYIBPAY_SECRET_KEY,
        'categoryCode': TOYYIBPAY_CATEGORY_CODE,
        ...billData
      }
    };
    
    const response = UrlFetchApp.fetch(TOYYIBPAY_CREATE_BILL_URL, options);
    const result = JSON.parse(response.getContentText());
    
    if (result && result.length > 0 && result[0].BillCode) {
      const billCode = result[0].BillCode;
      
      // Simpan data ke Google Sheet
      const newRow = [
        timestamp,
        data.email,
        data.phone,
        data.homeAddress,
        data.companyName,
        data.companyAddress,
        data.applicationYears,
        data.deliveryOption,
        data.nextOfKinName,
        data.nextOfKinIC,
        data.nextOfKinPhone,
        data.nextOfKinRelationship,
        cidbUrl,
        icUrl,
        certUrl,
        billCode,
        "Pending"
      ];
      sheet.appendRow(newRow);

      // Hantar respons kembali ke frontend dengan URL pembayaran
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        redirectUrl: TOYYIBPAY_PAYMENT_URL + billCode
      })).setMimeType(ContentService.MimeType.JSON);

    } else {
      throw new Error("Gagal mencipta bil ToyyibPay. Respons: " + JSON.stringify(result));
    }

  } catch (error) {
    Logger.log(error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}