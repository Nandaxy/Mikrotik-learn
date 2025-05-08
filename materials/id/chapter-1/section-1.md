---
title: Apa itu Mikrotik?
difficulty: Pemula
difficultyEn: Beginner
duration: 30 menit
prerequisites:
  - Pengetahuan dasar jaringan komputer
  - Pemahaman dasar IP Address
relatedMaterials:
  - title: Perangkat Mikrotik dan RouterOS
    path: /id/materials/1/2
  - title: Kelebihan dan Kekurangan Mikrotik
    path: /id/materials/1/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: Apa itu Mikrotik?
    id: apa-itu-mikrotik
  - title: Sejarah Mikrotik
    id: sejarah-mikrotik
  - title: Fitur Utama
    id: fitur-utama
  - title: Kesimpulan
references:
  - title: Dokumentasi Resmi Mikrotik
    url: https://wiki.mikrotik.com/
  - title: MikroTik RouterOS Documentation
    url: https://help.mikrotik.com/docs/
  - title: ChatGPT
---

## Pendahuluan {#pendahuluan}

Selamat datang di materi pembelajaran Mikrotik! Dalam bab ini, kita akan membahas dasar-dasar Mikrotik, sejarahnya, dan mengapa Mikrotik menjadi pilihan populer untuk solusi jaringan.

## Apa itu Mikrotik? {#apa-itu-mikrotik}

Mikrotik adalah nama perusahaan yang berlokasi di Latvia yang membuat perangkat keras dan perangkat lunak untuk konektivitas jaringan. Produk utama mereka adalah RouterOS, sistem operasi berbasis Linux yang mengubah komputer biasa menjadi router jaringan yang kuat.

![Mikrotik Logo](/placeholder.svg?height=200&width=400)

RouterOS dapat diinstal pada perangkat keras Mikrotik (seperti RouterBoard) atau pada PC standar, memberikan fleksibilitas dalam implementasi. Mikrotik menawarkan berbagai perangkat dengan spesifikasi yang berbeda untuk memenuhi kebutuhan jaringan dari skala kecil hingga enterprise.

## Sejarah Mikrotik {#sejarah-mikrotik}

Mikrotik didirikan pada tahun 1996 oleh John Tully dan Arnis Riekstins dengan tujuan mengembangkan router dan sistem wireless ISP. Pada tahun 1997, perusahaan ini menciptakan RouterOS, sistem yang kini menjadi tulang punggung dari semua produk Mikrotik.

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

Awalnya, Mikrotik fokus pada pasar ISP wireless di negara berkembang, menawarkan solusi jaringan yang terjangkau namun kuat. Seiring waktu, produk mereka mendapatkan popularitas di seluruh dunia karena kombinasi harga yang kompetitif dan fitur yang kaya.

## Fitur Utama {#fitur-utama}

RouterOS memiliki berbagai fitur untuk jaringan dan manajemen konektivitas, termasuk:

- **Firewall dan NAT**: Perlindungan jaringan dan kemampuan Network Address Translation
- **Hotspot**: Sistem otentikasi pengguna untuk akses internet publik
- **Manajemen Bandwidth**: Kontrol penggunaan bandwidth dengan Queue Tree dan Simple Queue
- **Routing**: Mendukung protokol routing statis dan dinamis (OSPF, BGP, RIP)
- **VPN**: Mendukung berbagai protokol VPN seperti PPTP, L2TP, SSTP, dan OpenVPN
- **Wireless**: Dukungan untuk standar 802.11a/b/g/n/ac

Berikut contoh konfigurasi dasar untuk mengatur IP Address pada interface:

```
# Menambahkan IP Address ke interface ether1
/ip address add address=192.168.1.1/24 interface=ether1

# Mengatur default gateway
/ip route add dst-address=0.0.0.0/0 gateway=192.168.1.254
```

## Kesimpulan {#kesimpulan}

Mikrotik menawarkan solusi jaringan yang kuat dan fleksibel dengan harga yang terjangkau. Dengan memahami dasar-dasar Mikrotik, Anda telah mengambil langkah pertama untuk menguasai platform ini. Pada materi selanjutnya, kita akan mempelajari lebih detail tentang perangkat Mikrotik dan RouterOS.
