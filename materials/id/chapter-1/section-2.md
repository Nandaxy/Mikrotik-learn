---
title: Perangkat Mikrotik dan RouterOS
difficulty: Pemula
difficultyEn: Beginner
duration: 30 menit
prerequisites:
  - Telah memahami pengenalan Mikrotik
  - Pengetahuan dasar jaringan komputer
relatedMaterials:
  - title: Apa itu Mikrotik?
    path: /id/materials/1/1
  - title: Kelebihan dan Kekurangan Mikrotik
    path: /id/materials/1/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: Jenis Perangkat Mikrotik
    id: jenis-perangkat
  - title: RouterOS
    id: routeros
  - title: Perbandingan Hardware dan Software
    id: perbandingan
  - title: Kesimpulan
    id: kesimpulan
references:
  - title: ChatGPT
---

## Pendahuluan {#pendahuluan}

Setelah memahami pengertian dasar Mikrotik, langkah selanjutnya adalah mengenal berbagai **perangkat Mikrotik** dan sistem operasi utamanya yaitu **RouterOS**. Materi ini membahas jenis-jenis perangkat, fungsi RouterOS, serta kelebihan masing-masing bentuk implementasi Mikrotik baik dalam bentuk hardware maupun software.

## Jenis Perangkat Mikrotik {#jenis-perangkat}

Mikrotik menyediakan dua bentuk perangkat utama:

### 1. RouterBOARD

RouterBOARD adalah perangkat keras (hardware) buatan Mikrotik yang sudah dilengkapi dengan sistem operasi RouterOS. Contohnya seperti RB750, RB951, RB2011, hingga Cloud Core Router (CCR).

![RouterBOARD Mikrotik](/image/materi/bab1/perangkat-mikrotilk.png)

### 2. RouterOS pada PC

RouterOS dapat diinstal di komputer biasa (x86 atau virtual machine) dan menjadikannya berfungsi sebagai router. Ini cocok digunakan untuk jaringan skala besar atau eksperimental dengan hardware sendiri.

## RouterOS {#routeros}

**RouterOS** adalah sistem operasi berbasis Linux yang dikembangkan oleh Mikrotik. Sistem ini memungkinkan perangkat menjadi:

- Router (static, dynamic routing)
- Firewall
- Wireless Access Point
- DHCP Server
- Bandwidth Shaper
- VPN Server/Client

### Antarmuka Pengguna

RouterOS dapat dikonfigurasi melalui beberapa cara:

- **Winbox** – GUI ringan berbasis Windows (rekomendasi pemula)
- **WebFig** – Akses via web browser
- **Terminal CLI** – Untuk pengguna mahir menggunakan command line
- **SSH/Telnet** – Akses remote jaringan

Berikut tampilan Winbox:

![Winbox Mikrotik](/image/materi/bab1/perangkat-mikrotilk.png)
*Tampilan antarmuka Winbox RouterOS.*

Video penjelasan singkat RouterOS:
<iframe width="560" height="315" src="https://www.youtube.com/embed/BJqH4kG6-vo" frameborder="0" allowfullscreen></iframe>

## Perbandingan Hardware dan Software {#perbandingan}

| Aspek               | RouterBOARD (Hardware)                 | RouterOS (Software)                         |
|---------------------|----------------------------------------|---------------------------------------------|
| Instalasi           | Plug-and-play                          | Perlu instalasi manual                      |
| Harga               | Lebih terjangkau untuk SOHO            | Bisa fleksibel (tergantung hardware PC)     |
| Performa            | Disesuaikan dengan kebutuhan model     | Bisa tinggi tergantung spesifikasi PC       |
| Fleksibilitas       | Terbatas pada fitur hardware bawaan    | Fleksibel (upgradeable)                     |
| Cocok untuk         | Pengguna rumahan, UMKM, ISP kecil      | Jaringan besar, eksperimen, ISP             |

## Kesimpulan {#kesimpulan}

Mikrotik menyediakan dua pendekatan untuk membangun sistem jaringan: melalui perangkat RouterBOARD dan instalasi RouterOS di PC. Keduanya memiliki kelebihan masing-masing dan bisa digunakan sesuai kebutuhan. Pada materi selanjutnya, kita akan membahas **kelebihan dan kekurangan Mikrotik** secara lebih mendalam.
