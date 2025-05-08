---
title: Perangkat Mikrotik dan RouterOS
difficulty: Pemula
difficultyEn: Beginner
duration: 35 menit
prerequisites:
  - Pengetahuan dasar tentang Mikrotik
  - Pemahaman dasar jaringan komputer
relatedMaterials:
  - title: Apa itu Mikrotik?
    path: /id/materials/1/1
  - title: Kelebihan dan Kekurangan Mikrotik
    path: /id/materials/1/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: RouterBoard
    id: routerboard
  - title: RouterOS
    id: routeros
  - title: Lisensi RouterOS
    id: lisensi
  - title: Cara Mengakses RouterOS
    id: cara-akses
  - title: Kesimpulan
    id: kesimpulan
---

## Pendahuluan {#pendahuluan}

Pada materi sebelumnya, kita telah mengenal apa itu Mikrotik secara umum. Kali ini, kita akan mempelajari lebih detail tentang perangkat keras Mikrotik (RouterBoard) dan sistem operasinya (RouterOS).

## RouterBoard {#routerboard}

RouterBoard adalah perangkat keras yang dikembangkan oleh Mikrotik. Perangkat ini dirancang khusus untuk menjalankan RouterOS dengan optimal. RouterBoard hadir dalam berbagai bentuk dan ukuran, mulai dari perangkat kecil untuk rumah hingga perangkat enterprise untuk ISP.

![RouterBoard](/placeholder.svg?height=300&width=500)

Beberapa seri RouterBoard yang populer:

1. **hAP Series**: Home Access Point, cocok untuk penggunaan rumahan
2. **RB Series**: RouterBoard standar dengan berbagai pilihan port dan fitur
3. **CCR Series**: CloudCore Router, untuk kebutuhan enterprise dengan performa tinggi
4. **CRS Series**: Cloud Router Switch, kombinasi router dan switch untuk jaringan yang lebih kompleks
5. **wAP Series**: Wireless Access Point untuk kebutuhan outdoor

## RouterOS {#routeros}

RouterOS adalah sistem operasi berbasis Linux yang dikembangkan oleh Mikrotik. Sistem operasi ini dapat diinstal pada RouterBoard atau PC standar (x86). RouterOS dirancang khusus untuk kebutuhan networking dengan antarmuka yang mudah digunakan.

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

RouterOS memiliki versi yang terus diperbarui. Setiap versi memiliki fitur dan perbaikan baru. Versi RouterOS ditandai dengan angka, misalnya RouterOS v6, v7, dll.

## Lisensi RouterOS {#lisensi}

RouterOS menggunakan sistem lisensi berbasis level. Setiap level memiliki batasan fitur yang berbeda:

| Level | Deskripsi | Penggunaan |
|-------|-----------|------------|
| 0 | Demo | Berfungsi selama 24 jam |
| 1 | Free | Fitur terbatas, untuk penggunaan dasar |
| 3 | WISP CPE | Untuk perangkat client ISP |
| 4 | WISP | Untuk ISP skala kecil |
| 5 | WISP | Untuk ISP skala menengah |
| 6 | Controller | Untuk penggunaan enterprise |

Perangkat RouterBoard biasanya sudah dilengkapi dengan lisensi RouterOS level 4 atau 5.

## Cara Mengakses RouterOS {#cara-akses}

Ada beberapa cara untuk mengakses dan mengkonfigurasi RouterOS:

1. **Winbox**: Aplikasi GUI berbasis Windows yang paling populer
   ![Winbox Interface](/placeholder.svg?height=300&width=500)

2. **WebFig**: Antarmuka web yang dapat diakses melalui browser

3. **CLI (Command Line Interface)**: Akses melalui terminal atau SSH

4. **Mobile App**: Aplikasi mobile untuk monitoring dan konfigurasi dasar

Contoh perintah dasar CLI untuk melihat interface:

\`\`\`
# Melihat daftar interface
/interface print

# Melihat status interface
/interface monitor-traffic ether1
\`\`\`

## Kesimpulan {#kesimpulan}

Perangkat Mikrotik (RouterBoard) dan RouterOS menawarkan solusi jaringan yang lengkap dan fleksibel. Dengan berbagai pilihan perangkat dan level lisensi, Mikrotik dapat memenuhi kebutuhan jaringan dari skala kecil hingga enterprise. Pada materi selanjutnya, kita akan membahas kelebihan dan kekurangan Mikrotik dibandingkan dengan solusi networking lainnya.
