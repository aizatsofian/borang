document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('cidbApplicationForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah penyerahan borang lalai

        // Pengesahan Borang Asas (Anda boleh menambah lebih banyak peraturan)
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(function(field) {
            if (!field.value.trim()) {
                isValid = false;
                // Anda boleh menambah logik untuk menonjolkan medan yang tidak diisi
                console.error(`Medan ${field.name} diperlukan.`);
                alert(`Sila isi semua ruangan yang diperlukan.`);
            }
        });

        if (isValid) {
            // Meniru proses penyerahan (cth., menghantar data ke pelayan)
            // Dalam aplikasi sebenar, di sini anda akan membuat permintaan fetch/AJAX
            console.log('Borang sedang diserahkan...');

            const formData = new FormData(form);

            // Log data borang untuk tujuan penyahpepijatan
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }

            // Selepas "penyerahan" yang berjaya, arahkan ke halaman kejayaan
            // Dalam senario sebenar, ini akan berada dalam panggilan balik kejayaan permintaan pelayan anda
            alert('Permohonan berjaya dihantar! Mengarahkan ke halaman pembayaran.');
            window.location.href = 'success.html';
        }
    });
});