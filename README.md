# Santri Admin Gratis

Aplikasi admin **gratis & open source** untuk pengurus **pesantren dan TPQ kecil**:
catat data santri, iuran/SPP, dan absensi tanpa buku manual lagi.

> **Visi: gratis selamanya.** Fitur inti tidak akan pernah dikunci di balik paywall.
> Donasi hanya untuk menutup biaya server — sukarela, bertarget, dan transparan.

[![Transparansi Dana](https://img.shields.io/badge/transparansi-TRANSPARANSI.md-green)](./TRANSPARANSI.md)
[![Lisensi](https://img.shields.io/badge/lisensi-Apache--2.0-blue)](./LICENSE)

## Untuk siapa

- Pengurus pesantren kecil & TPQ yang masih mencatat santri, SPP, dan absensi di buku tulis.
- Ringan dipakai di HP Android kentang dan laptop tua — target bisa jalan di koneksi lemot.
- Berhubungan dengan [Ponpes App](../) yang sudah ada (CRUD santri/SPP/absensi jadi fondasi MVP).

## Fitur MVP (rencana)

1. Data santri (tambah/ubah/cari).
2. Pencatatan SPP/iuran bulanan + status lunas/menunggak.
3. Absensi harian sederhana.

## Stack MVP — jalan di Rp0

| Lapisan | Pilihan | Kenapa |
|---|---|---|
| Hosting web | Cloudflare Pages | Gratis, cepat, tanpa batasan komersial ToS |
| API | Cloudflare Workers | Gratis 100rb request/hari, cukup untuk skala awal |
| Database | Neon Free (Postgres 0,5 GB) | Postgres asli, cocok dengan skill Drizzle ORM |
| File/arsip | Cloudflare R2 (10 GB) | Gratis, tanpa biaya keluar data |

Sengaja **bukan** Vercel Hobby + Supabase-full: ToS Vercel Hobby membatasi komersial,
API lambat kena timeout 10 detik, dan Supabase Free auto-pause setelah seminggu sepi.

## Batas biaya (komitmen)

| Skala | Biaya server |
|---|---|
| 0–100 pengguna | **Rp0/bln** |
| 1.000 pengguna | **Rp0 ketat, realistis maks Rp80–250rb/bln** (yang jebol duluan = storage Neon 0,5 GB, bukan bandwidth) |

**Aturan keras: JANGAN sewa VPS sebelum donasi rutin > Rp500rb/bln selama 3 bulan berturut-turut.**
Sewa server duluan = bakar uang sebelum ada yang pakai.

## Donasi

- **Fase 1 (sekarang): donasi BELUM dibuka.** Fokus bangun app sampai **20+ pengguna aktif**.
- **Fase 2:** donasi sukarela bertarget ("target server bulanan publik: butuh RpX, terkumpul RpY").
- Channel **utama: Trakteer + QRIS** (mudah untuk donatur Indonesia).
- Channel **sekunder: GitHub Sponsors** (perlu verifikasi dukungan region/payout Indonesia sebelum dijanjikan).
- Donasi **tidak mengunci fitur** — imbalan donatur hanya recognition (nama di README/halaman donatur) + vote prioritas fitur.

## Transparansi dana

Satu-satunya sumber kebenaran: [`TRANSPARANSI.md`](./TRANSPARANSI.md) — laporan **1x sebulan, maks tanggal 5**.
Pengeluaran > Rp100rb langsung dicatat. Bulan kosong tetap ditulis. Dana hanya untuk server/hosting/domain.

## Status

- [x] Repo + lisensi + template transparansi (fondasi — kamu di sini)
- [ ] Deploy hello-world Pages + Workers + Neon (bukti stack Rp0 jalan)
- [ ] MVP 2 minggu: CRUD santri + SPP + absensi
- [ ] 20+ pengguna aktif → buka donasi fase 2

## Lisensi

[Apache-2.0](./LICENSE) — bebas dipakai, dimodifikasi, bahkan dikomersialkan,
dengan tetap mencantumkan atribusi. Klausul paten eksplisit melindungi kontributor & pengguna.
