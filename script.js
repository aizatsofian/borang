document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cidbApplicationForm');
    const submitButton = form.querySelector('button[type="submit"]');

    // TAMPAL URL WEB APP ANDA DI SINI
    const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbz7ABAlZ3BeFQUG6L_aCtwC2VQ3Zxl5v62ZMMFrJFk2SGXRsAdeBsdhTlP6e-FPy0Ii/exec';

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Hentikan penyerahan lalai

        // Tunjukkan status memuat naik pada butang
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Menghantar... Sila tunggu...';
        
        const formData = new FormData(form);

        fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
            credentials: 'omit'
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                // Penyerahan berjaya, alihkan ke URL pembayaran
                alert('Maklumat berjaya dihantar. Anda akan dialihkan ke halaman pembayaran.');
                window.location.href = data.redirectUrl;
            } else {
                // Jika terdapat ralat dari Apps Script
                throw new Error(data.message || 'Berlaku ralat yang tidak diketahui.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Gagal menghantar permohonan. Sila cuba lagi.\n\nRalat: ' + error.message);
            // Kembalikan butang kepada keadaan asal
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
});