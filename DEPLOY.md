# DEPLOY.md — Hello-World Stack Rp0

Tujuan: buktikan stack gratis jalan (Pages + Functions + Neon + R2) sebelum bangun fitur.

## 1. Arsitektur

```text
Browser ──▶ Cloudflare Pages (public/index.html, statis)
     └─────▶ Pages Functions /api/health (functions/api/health.js)
                      │  env.DATABASE_URL (secret, tidak di-commit)
                      ▼
              Neon Postgres Free (query SELECT now())
```

Bucket R2 dibuat sekarang (gratis), dipakai nanti untuk bukti foto (fase MVP).

## 2. Prasyarat akun (semua tier gratis, Rp0)

| Layanan | Tier | Batas gratis relevan |
|---|---|----------------------|
| Cloudflare Pages | Free | 500 build/bln, bandwidth unlimited untuk statis |
| Cloudflare Workers / Functions | Free | 100.000 request/hari |
| Neon Postgres | Free | 1 project, 0,5 GB storage, compute auto-suspend |
| Cloudflare R2 | Free | 10 GB storage, 10 juta read/bln (egress gratis) |

Total biaya berjalan: **Rp0/bln** untuk skala hello-world s.d. ~100 user.

## 3. Langkah deploy

### A. Database Neon (5 menit)

1. Daftar https://neon.tech → New Project:
   - Name: `santri-admin-gratis`
   - Region: `aws-ap-southeast-1` (Singapura, terdekat)
   - Postgres version: 16 (default)
2. Setelah project jadi, buka dashboard → Connection Details:
   - Aktifkan **Pooled connection** (wajib untuk Functions/edge)
   - Copy **Pooled connection string** → simpan sementara, format:
     `postgresql://USER:PASSWORD@ep-xxxx-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require`
3. (Opsional) Jalankan sekali via SQL Editor untuk smoke test:
   `SELECT now();` → harus mengembalikan timestamp.

### B. Bucket R2 (3 menit, disiapkan untuk fase MVP)

1. Cloudflare dashboard → R2 → Create bucket: `santri-admin-gratis-bukti`
2. Biarkan private. Kredensial API R2 dibuat nanti saat fitur upload dibangun.
3. Belum ada kode yang memakai R2 di hello-world ini.

### C. Deploy ke Cloudflare Pages + Functions

#### Opsi 1 — via Git (disarankan, auto-deploy)

1. Push repo ini (sudah berisi `public/` + `functions/`).
2. Cloudflare dashboard → Pages → Create → Connect to Git → pilih repo
   `N0RRY-20/santri-admin-gratis` → branch `main`.
3. Build settings:
   - Framework preset: **None**
   - Build command: `npm install` (untuk `@neondatabase/serverless`)
   - Build output directory: `public`
   - Functions directory: `functions` (otomatis terdeteksi)
4. Environment variables (Production):
   - `DATABASE_URL` = pooled connection string Neon dari langkah A.
   - Jangan commit secret ini ke repo.
5. Deploy → dapat URL publik `https://<nama-project>.pages.dev`.

#### Opsi 2 — via Wrangler CLI

```bash
npm install
npx wrangler pages deploy public --project-name=santri-admin-gratis-hello
# lalu set secret via dashboard Pages → Settings → Environment variables:
# DATABASE_URL = <pooled neon string>
```

### D. Verifikasi

1. Buka `https://<nama-project>.pages.dev/` → halaman "Hello World" tampil.
2. Buka `https://<nama-project>.pages.dev/api/health` → harus 200:
   ```json
   { "status": "ok", "db_time": "2026-09-30T..." }
   ```
3. Jika `status: error` dan `reason: DATABASE_URL belum diset` → env var belum terpasang.
   Jika error koneksi → pastikan dipakai **pooled** string (`-pooler-` di hostname).

## 4. Troubleshooting

| Gejala | Penyebab umum | Perbaikan |
|---|---|---|
| `/api/health` 500, DATABASE_URL belum diset | Env var lupa/tidak di Production | Set ulang di Pages → Settings → Env vars → Redeploy |
| Timeout koneksi Neon | Pakai direct connection, bukan pooled | Ganti ke pooled string |
| Build gagal `cannot find module` | `npm install` tidak dijalankan | Set build command `npm install` |
| Neon compute suspended | Idle > 5 menit (normal di Free) | Request pertama membangunkan (~2–5 dtk), retry |

## 5. Status deploy saat ini

- [ ] Project Neon dibuat (+ pooled string di env Pages)
- [ ] Bucket R2 `santri-admin-gratis-bukti` dibuat
- [ ] Pages project live: URL: ______
- [ ] `/api/health` 200 + `db_time` valid: ______
- Kode hello-world + dokumen ini sudah di repo.

Catatan: konektor Cloudflare dan Neon di agen otomatis belum terhubung
(koneksi tersedia: GitHub saja), sehingga langkah A–D di atas dieksekusi
manual sekali oleh pemilik akun. Deploy ulang berikutnya otomatis via Git.
