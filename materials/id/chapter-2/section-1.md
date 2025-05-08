---
title: Install RouterOS
difficulty: Pemula
difficultyEn: Beginner
duration: 45 menit
prerequisites:
  - Pengetahuan dasar tentang Mikrotik
  - Perangkat Mikrotik atau PC untuk instalasi
relatedMaterials:
  - title: Konfigurasi Awal
    path: /id/materials/2/2
  - title: Mengakses Router Mikrotik
    path: /id/materials/2/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: Metode Instalasi
    id: metode-instalasi
  - title: Instalasi pada RouterBoard
    id: instalasi-routerboard
  - title: Instalasi pada PC
    id: instalasi-pc
  - title: Troubleshooting
    id: troubleshooting
  - title: Kesimpulan
    id: kesimpulan
---

## Pendahuluan {#pendahuluan}

Pada materi ini, kita akan mempelajari cara menginstal RouterOS pada perangkat Mikrotik (RouterBoard) atau PC standar. RouterOS adalah sistem operasi yang akan mengubah perangkat Anda menjadi router yang powerful dengan berbagai fitur networking.

## Metode Instalasi {#metode-instalasi}

Ada beberapa metode untuk menginstal RouterOS:

1. **NetInstall**: Untuk RouterBoard atau PC, menggunakan aplikasi NetInstall dari Mikrotik
2. **CD/USB Installation**: Untuk PC, menggunakan CD atau USB bootable
3. **Upgrade dari versi sebelumnya**: Untuk perangkat yang sudah menjalankan RouterOS

![Metode Instalasi](/placeholder.svg?height=300&width=500)

## Instalasi pada RouterBoard {#instalasi-routerboard}

Perangkat RouterBoard biasanya sudah terinstal RouterOS dari pabrik. Namun, jika Anda perlu menginstal ulang atau upgrade, ikuti langkah-langkah berikut:

### Menggunakan NetInstall

1. Download aplikasi NetInstall dari website Mikrotik
2. Instal dan jalankan aplikasi NetInstall di PC Windows
3. Hubungkan RouterBoard ke PC menggunakan kabel Ethernet
4. Atur IP Address PC ke 192.168.88.x/24
5. Nyalakan RouterBoard sambil menekan tombol reset (atau sesuai petunjuk model)
6. RouterBoard akan muncul di aplikasi NetInstall
7. Pilih RouterBoard dan versi RouterOS yang ingin diinstal
8. Klik "Install" dan tunggu proses selesai

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

## Instalasi pada PC {#instalasi-pc}

Untuk menginstal RouterOS pada PC standar (x86), Anda memiliki dua opsi:

### Menggunakan CD/USB Bootable

1. Download ISO RouterOS dari website Mikrotik
2. Buat CD atau USB bootable dengan ISO tersebut
3. Boot PC dari CD/USB
4. Ikuti wizard instalasi:
   - Pilih paket yang ingin diinstal
   - Atur partisi disk
   - Konfirmasi instalasi
5. Setelah instalasi selesai, PC akan restart dan RouterOS akan berjalan

### Menggunakan NetInstall

Proses ini mirip dengan instalasi pada RouterBoard, namun PC target harus mendukung boot dari jaringan (PXE).

\`\`\`
# Contoh konfigurasi DHCP untuk PXE boot
/ip dhcp-server network add address=192.168.88.0/24 gateway=192.168.88.1 next-server=192.168.88.2 boot-file-name="pxelinux.0"
\`\`\`

## Troubleshooting {#troubleshooting}

Beberapa masalah umum saat instalasi dan solusinya:

### RouterBoard tidak terdeteksi di NetInstall

- Pastikan kabel Ethernet terhubung dengan benar
- Coba gunakan port Ethernet yang berbeda
- Pastikan Anda menekan tombol reset dengan benar saat boot
- Periksa apakah firewall Windows menghalangi NetInstall

### Instalasi pada PC gagal

- Pastikan PC memenuhi persyaratan minimum (RAM 64MB, disk 64MB)
- Coba gunakan media instalasi yang berbeda
- Periksa integritas file ISO yang didownload
- Pastikan BIOS/UEFI diatur untuk boot dari media yang benar

## Kesimpulan {#kesimpulan}

Instalasi RouterOS adalah langkah pertama untuk membangun jaringan dengan Mikrotik. Setelah instalasi selesai, Anda perlu melakukan konfigurasi awal untuk mengatur router sesuai kebutuhan. Pada materi selanjutnya, kita akan mempelajari langkah-langkah konfigurasi awal setelah instalasi RouterOS.
