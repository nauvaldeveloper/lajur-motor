/**
 * DATA — Lajur Motor (showroom fiktif, untuk portfolio Nauval Dev).
 * Model motor nyata; unit, harga, plat, dan hasil inspeksi hanya contoh.
 */
window.DEALER = {
  name: 'Lajur Motor',
  tagline: 'Showroom motor bekas Bandung',
  address: 'Jl. Soekarno-Hatta No. 210, Bandung (alamat contoh)',
  hours: 'Setiap hari, 09.00–20.00',
  DEMO: true,
  WA_NUMBER: '',
  DEV_CONTACT_URL: 'https://ig.me/m/nauval_dev',

  CREDIT: { minDpPct: 15, flatRatePerMonth: 1.6, tenors: [12, 18, 24, 36] },
  WARRANTY: 'Garansi mesin 1 bulan',
  INSPECTION_POINTS: 40,

  TYPES: ['Matic', 'Bebek', 'Sport', 'Trail'],
  CHECKS: ['Mesin', 'Rangka', 'Kelistrikan', 'Kaki-kaki', 'Body', 'Surat'],

  UNITS: [
    { id: 'vario125-21', brand: 'Honda', model: 'Vario 125', type: 'Matic', year: 2021, km: 18400, price: 17500000, color: '#1d1f23', colorName: 'Hitam doff', cc: 125, plate: 'D 4127 ABK', tax: '2027-03', owner: 1,
      checks: { Body: 'Baret halus di cover body kanan' } },
    { id: 'nmax-20', brand: 'Yamaha', model: 'NMAX 155', type: 'Matic', year: 2020, km: 26900, price: 23000000, color: '#2a4a8a', colorName: 'Biru', cc: 155, plate: 'D 3381 VEX', tax: '2026-12', owner: 1,
      checks: { 'Kaki-kaki': 'Ban belakang sudah diganti baru' } },
    { id: 'beat-22', brand: 'Honda', model: 'Beat Street', type: 'Matic', year: 2022, km: 9600, price: 14200000, color: '#4b5320', colorName: 'Hijau army', cc: 110, plate: 'D 2906 ZFT', tax: '2027-06', owner: 1, checks: {} },
    { id: 'aerox-21', brand: 'Yamaha', model: 'Aerox 155', type: 'Matic', year: 2021, km: 21500, price: 22000000, color: '#c0392b', colorName: 'Merah', cc: 155, plate: 'D 5574 UBQ', tax: '2027-01', owner: 2,
      checks: { Body: 'Lecet di ujung spakbor depan' } },
    { id: 'pcx-22', brand: 'Honda', model: 'PCX 160', type: 'Matic', year: 2022, km: 12100, price: 29500000, color: '#e8e6e1', colorName: 'Putih', cc: 160, plate: 'D 6612 RAS', tax: '2027-08', owner: 1, checks: {} },
    { id: 'scoopy-21', brand: 'Honda', model: 'Scoopy', type: 'Matic', year: 2021, km: 15800, price: 16500000, color: '#d9a7a0', colorName: 'Pink pastel', cc: 110, plate: 'D 3159 KTY', tax: '2026-11', owner: 1,
      checks: { Surat: 'Pajak habis bulan ini, biaya perpanjang ditanggung dealer' } },
    { id: 'klx-19', brand: 'Kawasaki', model: 'KLX 150', type: 'Trail', year: 2019, km: 31200, price: 21000000, color: '#3e8e41', colorName: 'Hijau', cc: 150, plate: 'D 2290 OPL', tax: '2027-02', owner: 2,
      checks: { 'Kaki-kaki': 'Shock depan sudah servis ulang', Body: 'Baret pemakaian wajar' } },
    { id: 'cbr-20', brand: 'Honda', model: 'CBR150R', type: 'Sport', year: 2020, km: 24300, price: 24000000, color: '#b71c1c', colorName: 'Merah', cc: 150, plate: 'D 6043 MNC', tax: '2027-04', owner: 1, checks: {} },
    { id: 'r15-19', brand: 'Yamaha', model: 'R15 V3', type: 'Sport', year: 2019, km: 33800, price: 25000000, color: '#1f3a93', colorName: 'Biru racing', cc: 155, plate: 'D 4716 YRV', tax: '2026-12', owner: 2,
      checks: { Mesin: 'Rantai & gir baru diganti' } },
    { id: 'satria-18', brand: 'Suzuki', model: 'Satria F150', type: 'Bebek', year: 2018, km: 41000, price: 15000000, color: '#202124', colorName: 'Hitam', cc: 150, plate: 'D 3827 FUI', tax: '2027-05', owner: 2,
      checks: { Body: 'Striping sudah pudar' } },
    { id: 'supra-18', brand: 'Honda', model: 'Supra X 125', type: 'Bebek', year: 2018, km: 38500, price: 11000000, color: '#7b1f1f', colorName: 'Merah marun', cc: 125, plate: 'D 5188 GHT', tax: '2027-01', owner: 1, checks: {} },
    { id: 'mio-19', brand: 'Yamaha', model: 'Mio M3', type: 'Matic', year: 2019, km: 27300, price: 9500000, color: '#f2f2f2', colorName: 'Putih', cc: 125, plate: 'D 2471 LSW', tax: '2026-10', owner: 2,
      checks: { Surat: 'Pajak telat 1 bulan, dibayar dealer sebelum serah terima', Body: 'Baret di dek kaki' } },
  ],

  FAQ: [
    ['Apa saja yang dicek sebelum unit dijual?', '40 titik pemeriksaan: kompresi & suara mesin, rangka (tidak bekas tabrakan), kelistrikan, rem, ban, suspensi, serta keaslian STNK & BPKB yang dicek ke Samsat.'],
    ['Bisa kredit?', 'Bisa, lewat leasing rekanan dengan DP mulai 15%. Angka di simulasi hanya perkiraan; angsuran final mengikuti persetujuan leasing.'],
    ['Apakah ada garansi?', 'Garansi mesin 1 bulan setelah serah terima, tidak termasuk ban, oli, dan kampas rem.'],
    ['Bisa tukar tambah motor lama?', 'Bisa. Isi form jual/tukar tambah, lalu bawa motornya untuk dicek. Penawaran harga diberikan setelah inspeksi.'],
  ],
};
