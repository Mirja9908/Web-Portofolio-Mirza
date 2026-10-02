/**
 * Script Portofolio Mirza
 * SMK Telkom
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('Website Portofolio Mirza berhasil dimuat!');

    // Interaktivitas tombol "Sapa Saya"
    const ctaBtn = document.getElementById('cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', () => {
            alert('Halo! Terima kasih sudah berkunjung ke portofolio saya.');
        });
    }

    // Indikator navigasi aktif saat diklik
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
