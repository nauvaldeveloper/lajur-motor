# Lajur Motor — Website Dealer Motor Bekas (Portfolio Nauval Dev)

Contoh website **Dealer** untuk showroom motor bekas: merek fiktif, model motor nyata.
HTML/CSS/JS biasa, tanpa build tool. Buka `index.html` langsung di browser.

## Fitur
- Stok unit dengan filter tipe (Matic/Bebek/Sport/Trail), merek, harga maksimal, tahun, dan urutan
- Kartu unit: plat nomor, tahun, odometer, masa pajak, ringkasan catatan inspeksi, cicilan mulai per bulan
- Detail unit: spesifikasi & kelengkapan surat, **laporan inspeksi per bagian** (catatan ditampilkan apa adanya)
- **Simulasi kredit**: atur DP (min 15%) dan tenor 12–36 bulan, angsuran dihitung otomatis
- Jadwal lihat unit / test ride → pesan WhatsApp berisi unit, plat, jadwal, dan rencana bayar
- Form jual putus / tukar tambah
- Ilustrasi motor dibuat sebagai SVG per tipe dan mengikuti warna unit (pengganti foto di versi demo)

## Menyesuaikan
Unit, harga, hasil inspeksi, aturan kredit, dan FAQ ada di `assets/js/data.js`.
Untuk dealer sungguhan: tambahkan foto unit, isi `WA_NUMBER`, lalu set `DEMO: false`.
