`index.html`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Borang Permohonan Kad CIDB</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h2>Borang Permohonan Kad CIDB</h2>
        <form id="cidbApplicationForm" enctype="multipart/form-data">
            <fieldset>
                <legend>Maklumat Peribadi & Syarikat</legend>

                <div class="form-group">
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="phone">No. Telefon:</label>
                    <input type="tel" id="phone" name="phone" required>
                </div>

                <div class="form-group">
                    <label for="homeAddress">Alamat Rumah:</label>
                    <textarea id="homeAddress" name="homeAddress" rows="3" required></textarea>
                </div>

                <div class="form-group">
                    <label for="companyName">Nama Syarikat:</label>
                    <input type="text" id="companyName" name="companyName" required>
                </div>

                <div class="form-group">
                    <label for="companyAddress">Alamat Syarikat:</label>
                    <textarea id="companyAddress" name="companyAddress" rows="3" required></textarea>
                </div>

                <div class="form-group">
                    <label for="applicationYears">Tempoh Permohonan (Tahun):</label>
                    <select id="applicationYears" name="applicationYears" required>
                        <option value="">Pilih</option>
                        <option value="1">1 Tahun</option>
                        <option value="2">2 Tahun</option>
                        <option value="3">3 Tahun</option>
                        <option value="4">4 Tahun</option>
                        <option value="5">5 Tahun</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Pilihan Pengeposan Kad CIDB:</label>
                    <div class="radio-group">
                        <input type="radio" id="deliveryHome" name="deliveryOption" value="Alamat Rumah" required>
                        <label for="deliveryHome">Alamat Rumah</label>
                        <input type="radio" id="deliveryCompany" name="deliveryOption" value="Alamat Syarikat">
                        <label for="deliveryCompany">Alamat Syarikat</label>
                    </div>
                </div>
            </fieldset>

            <fieldset>
                <legend>Maklumat Waris</legend>

                <div class="form-group">
                    <label for="nextOfKinName">Nama Waris:</label>
                    <input type="text" id="nextOfKinName" name="nextOfKinName" required>
                </div>

                <div class="form-group">
                    <label for="nextOfKinIC">No. Kad Pengenalan Waris:</label>
                    <input type="text" id="nextOfKinIC" name="nextOfKinIC" pattern="[0-9]{12}" placeholder="e.g., 888022235453" required>
                    <small>Sila masukkan 12 digit tanpa sempang.</small>
                </div>

                <div class="form-group">
                    <label for="nextOfKinPhone">No. Telefon Waris:</label>
                    <input type="tel" id="nextOfKinPhone" name="nextOfKinPhone" required>
                </div>

                <div class="form-group">
                    <label for="nextOfKinRelationship">Hubungan dengan Waris:</label>
                    <input type="text" id="nextOfKinRelationship" name="nextOfKinRelationship" required>
                </div>
            </fieldset>

            <fieldset>
                <legend>Muat Naik Dokumen</legend>

                <div class="form-group">
                    <label for="oldCidbPic">Gambar CIDB Lama:</label>
                    <input type="file" id="oldCidbPic" name="oldCidbPic" accept="image/*" required>
                </div>

                <div class="form-group">
                    <label for="icPic">Gambar Kad Pengenalan:</label>
                    <input type="file" id="icPic" name="icPic" accept="image/*" required>
                </div>

                <div class="form-group">
                    <label for="academicCertPic">Gambar Sijil Akademik:</label>
                    <input type="file" id="academicCertPic" name="academicCertPic" accept="image/*" required>
                </div>
            </fieldset>

            <button type="submit">Hantar Permohonan & Buat Bayaran</button>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>


`style.css`
/* General Body and Container Styling */
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f4f7f6;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    padding: 20px;
    box-sizing: border-box; /* Include padding in element's total width and height */
}

.container {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 800px; /* Max width for larger screens */
    box-sizing: border-box;
}

h2 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 2em;
}

/* Form Fieldset and Legend Styling */
fieldset {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 25px;
    margin-bottom: 30px;
    background-color: #fdfdfd;
}

legend {
    font-size: 1.3em;
    font-weight: bold;
    color: #007bff; /* Primary blue color */
    padding: 0 10px;
    margin-left: -10px; /* Adjust to align with fieldset border */
}

/* Form Group Styling */
.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #555;
    font-weight: 600;
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="tel"],
.form-group textarea,
.form-group select {
    width: calc(100% - 20px); /* Full width minus padding */
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 1em;
    box-sizing: border-box; /* Include padding in width */
    transition: border-color 0.3s ease;
}

.form-group input[type="text"]:focus,
.form-group input[type="email"]:focus,
.form-group input[type="tel"]:focus,
.form-group textarea:focus,
.form-group select:focus {
    border-color: #007bff; /* Highlight on focus */
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.form-group textarea {
    resize: vertical; /* Allow vertical resizing */
    min-height: 80px;
}

/* Radio Button Styling */
.radio-group {
    display: flex;
    gap: 25px; /* Space between radio options */
    flex-wrap: wrap; /* Allow wrapping on smaller screens */
}

.radio-group input[type="radio"] {
    margin-right: 8px;
    transform: scale(1.1); /* Slightly larger radio buttons */
    cursor: pointer;
}

.radio-group label {
    display: inline-flex; /* Align label with radio button */
    align-items: center;
    cursor: pointer;
    margin-bottom: 0; /* Remove default bottom margin */
    font-weight: normal; /* Labels for radio can be lighter */
    color: #333;
}

/* File Input Styling */
.form-group input[type="file"] {
    width: 100%;
    padding: 10px 0; /* Adjust padding for file input */
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f0f0f0;
    cursor: pointer;
}

.form-group input[type="file"]::-webkit-file-upload-button {
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 15px;
    transition: background-color 0.3s ease;
}

.form-group input[type="file"]::-webkit-file-upload-button:hover {
    background-color: #0056b3;
}

/* Small Text for Hints */
.form-group small {
    display: block;
    color: #777;
    margin-top: 5px;
    font-size: 0.85em;
}

/* Submit Button Styling */
button[type="submit"] {
    display: block;
    width: 100%;
    padding: 15px 20px;
    background-color: #28a745; /* Success green color */
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 1.1em;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    margin-top: 30px;
}

button[type="submit"]:hover {
    background-color: #218838; /* Darker green on hover */
    transform: translateY(-2px); /* Slight lift effect */
}

button[type="submit"]:active {
    transform: translateY(0);
}

/* Responsive Adjustments */
@media (max-width: 768px) {
    .container {
        padding: 25px;
        margin: 15px; /* Add margin on smaller screens */
    }

    h2 {
        font-size: 1.8em;
    }

    fieldset {
        padding: 20px;
    }

    legend {
        font-size: 1.2em;
    }

    .form-group input[type="text"],
    .form-group input[type="email"],
    .form-group input[type="tel"],
    .form-group textarea,
    .form-group select {
        width: 100%; /* Full width on smaller screens */
        padding: 10px;
    }
}

@media (max-width: 480px) {
    h2 {
        font-size: 1.5em;
    }

    .form-group label {
        font-size: 0.9em;
    }

    button[type="submit"] {
        font-size: 1em;
        padding: 12px 15px;
    }
}

`success.html`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pembayaran Berjaya!</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background-color: #f4f7f6;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
            text-align: center;
        }

        .container {
            background-color: #ffffff;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 600px;
            box-sizing: border-box;
        }

        h2 {
            color: #28a745; /* Success green */
            margin-bottom: 20px;
            font-size: 2.2em;
        }

        p {
            color: #555;
            font-size: 1.1em;
            line-height: 1.6;
            margin-bottom: 25px;
        }

        .success-icon {
            color: #28a745;
            font-size: 4em; /* Larger icon */
            margin-bottom: 30px;
            /* Using a simple checkmark, you might use a library like FontAwesome for better icons */
        }

        .button-back {
            display: inline-block;
            padding: 12px 25px;
            background-color: #007bff; /* Primary blue */
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 1em;
            font-weight: bold;
            transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .button-back:hover {
            background-color: #0056b3;
            transform: translateY(-2px);
        }

        .button-back:active {
            transform: translateY(0);
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
            .container {
                padding: 30px;
                margin: 15px;
            }
            h2 {
                font-size: 1.8em;
            }
            p {
                font-size: 1em;
            }
            .success-icon {
                font-size: 3em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="success-icon">&#10004;</div> <h2>Pembayaran Berjaya!</h2>
        <p>Terima kasih atas permohonan anda. Pembayaran anda telah disahkan.</p>
        <p>Maklumat permohonan dan resit akan dihantar ke WhatsApp dan email anda.</p>
        <a href="/" class="button-back">Kembali ke Laman Utama</a>
    </div>
</body>
</html>