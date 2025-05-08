---
title: Konfigurasi IP Address
difficulty: Menengah
difficultyEn: Intermediate
duration: 40 menit
prerequisites:
  - Konfigurasi awal RouterOS
  - Pemahaman dasar tentang IP Address dan Subnet
relatedMaterials:
  - title: DHCP Server
    path: /id/materials/3/2
  - title: NAT dan Firewall Dasar
    path: /id/materials/3/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: Konsep IP Address
    id: konsep-ip
  - title: Jenis IP Address
    id: jenis-ip
  - title: Konfigurasi IP Address di Mikrotik
    id: konfigurasi-ip
  - title: IP Pool dan DHCP
    id: ip-pool
  - title: Troubleshooting
    id: troubleshooting
  - title: Kesimpulan
    id: kesimpulan
---

## Pendahuluan {#pendahuluan}

Konfigurasi IP Address adalah langkah fundamental dalam membangun jaringan dengan Mikrotik. Pada materi ini, kita akan mempelajari cara mengatur alamat IP pada interface Mikrotik, memahami konsep subnet, dan mengimplementasikan IP Pool untuk distribusi alamat.

## Konsep IP Address {#konsep-ip}

IP Address (Internet Protocol Address) adalah identifikasi numerik yang ditetapkan untuk setiap perangkat yang terhubung ke jaringan komputer. IP Address berfungsi sebagai alamat yang memungkinkan perangkat untuk berkomunikasi satu sama lain.

![IP Address Concept](/placeholder.svg?height=250&width=450)

### Format IP Address

IP Address versi 4 (IPv4) terdiri dari 32 bit yang ditulis dalam format desimal bertitik, misalnya 192.168.1.1. Format ini dibagi menjadi empat oktet, masing-masing bernilai 0-255.

### Subnet Mask

Subnet mask menentukan bagian mana dari IP address yang merupakan network ID dan host ID. Contoh subnet mask adalah 255.255.255.0 atau dalam notasi CIDR ditulis sebagai /24.

## Jenis IP Address {#jenis-ip}

### 1. IP Address Publik

IP Address publik adalah alamat yang dapat diakses langsung dari internet. IP ini diberikan oleh ISP (Internet Service Provider) dan harus unik secara global.

### 2. IP Address Privat

IP Address privat digunakan dalam jaringan lokal dan tidak dapat diakses langsung dari internet. Range IP privat:
- 10.0.0.0 - 10.255.255.255 (10.0.0.0/8)
- 172.16.0.0 - 172.31.255.255 (172.16.0.0/12)
- 192.168.0.0 - 192.168.255.255 (192.168.0.0/16)

### 3. IP Address Statis vs Dinamis

- **IP Statis**: Alamat IP yang tetap dan tidak berubah
- **IP Dinamis**: Alamat IP yang dapat berubah dan biasanya diberikan melalui DHCP

## Konfigurasi IP Address di Mikrotik {#konfigurasi-ip}

### Menggunakan Winbox

1. Buka Winbox dan hubungkan ke router
2. Buka menu IP > Addresses
3. Klik tombol (+) untuk menambahkan IP baru
4. Isi form dengan:
   - Address: [IP Address]/[Prefix] (contoh: 192.168.1.1/24)
   - Interface: Pilih interface yang akan dikonfigurasi
   - Network: Akan terisi otomatis
5. Klik OK untuk menyimpan

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

### Menggunakan CLI

\`\`\`
# Menambahkan IP Address ke interface
/ip address add address=192.168.1.1/24 interface=ether1

# Menambahkan IP Address kedua ke interface yang sama
/ip address add address=10.0.0.1/24 interface=ether1

# Melihat daftar IP Address
/ip address print

# Menghapus IP Address (menggunakan nomor dari print)
/ip address remove 0
\`\`\`

## IP Pool dan DHCP {#ip-pool}

IP Pool adalah kumpulan alamat IP yang dapat dialokasikan secara dinamis ke perangkat client melalui DHCP.

### Membuat IP Pool

#### Menggunakan Winbox

1. Buka menu IP > Pool
2. Klik tombol (+) untuk menambahkan pool baru
3. Isi form dengan:
   - Name: Nama untuk pool (contoh: dhcp-pool)
   - Addresses: Range IP (contoh: 192.168.1.100-192.168.1.200)
4. Klik OK untuk menyimpan

#### Menggunakan CLI

\`\`\`
# Membuat IP Pool
/ip pool add name=dhcp-pool ranges=192.168.1.100-192.168.1.200

# Melihat daftar IP Pool
/ip pool print
\`\`\`

## Troubleshooting {#troubleshooting}

Beberapa masalah umum terkait IP Address dan solusinya:

### 1. Konflik IP Address

Jika dua perangkat memiliki IP Address yang sama, akan terjadi konflik. Solusinya:
- Periksa semua perangkat di jaringan
- Gunakan perintah `/ip arp print` untuk melihat MAC address yang terkait dengan IP
- Ubah IP Address salah satu perangkat

### 2. Tidak Bisa Terhubung ke Internet

- Periksa konfigurasi default gateway (`/ip route print`)
- Periksa konfigurasi DNS (`/ip dns print`)
- Pastikan NAT sudah dikonfigurasi dengan benar

### 3. Subnet Tidak Sesuai

- Pastikan subnet mask pada semua perangkat dalam satu jaringan konsisten
- Gunakan perintah `/ip address print` untuk memeriksa subnet

## Kesimpulan {#kesimpulan}

Konfigurasi IP Address yang tepat adalah fondasi penting untuk jaringan yang berfungsi dengan baik. Dengan memahami konsep IP Address, subnet, dan cara mengkonfigurasinya di Mikrotik, Anda dapat membangun jaringan yang efisien dan mudah dikelola.

Pada materi selanjutnya, kita akan mempelajari cara mengatur DHCP Server untuk distribusi IP otomatis ke perangkat client.
