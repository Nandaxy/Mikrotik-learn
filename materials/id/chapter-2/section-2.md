---
title: Konfigurasi Awal
difficulty: Pemula
difficultyEn: Beginner
duration: 40 menit
prerequisites:
  - RouterOS terinstal pada perangkat
  - Pemahaman dasar IP Address
relatedMaterials:
  - title: Install RouterOS
    path: /id/materials/2/1
  - title: Mengakses Router Mikrotik
    path: /id/materials/2/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: Akses Pertama Kali
    id: akses-pertama
  - title: Konfigurasi IP Address
    id: konfigurasi-ip
  - title: Konfigurasi Password
    id: konfigurasi-password
  - title: Konfigurasi Identitas Router
    id: konfigurasi-identitas
  - title: Konfigurasi Dasar Internet
    id: konfigurasi-internet
  - title: Kesimpulan
    id: kesimpulan
---

## Pendahuluan {#pendahuluan}

Setelah berhasil menginstal RouterOS, langkah selanjutnya adalah melakukan konfigurasi awal. Konfigurasi ini meliputi pengaturan IP address, password, identitas router, dan koneksi internet dasar. Konfigurasi awal yang baik akan memudahkan pengelolaan router di masa mendatang.

## Akses Pertama Kali {#akses-pertama}

Setelah instalasi, RouterOS memiliki konfigurasi default sebagai berikut:

- IP Address: 192.168.88.1/24
- Username: admin
- Password: (kosong)

Untuk mengakses router pertama kali, Anda dapat menggunakan:

1. **Winbox**: Aplikasi GUI untuk Windows
2. **WebFig**: Antarmuka web melalui browser
3. **CLI**: Command Line Interface melalui terminal

![Akses Pertama Kali](/placeholder.svg?height=300&width=500)

## Konfigurasi IP Address {#konfigurasi-ip}

Langkah pertama adalah mengatur IP address pada interface yang akan digunakan. Berikut contoh konfigurasinya:

### Menggunakan Winbox

1. Buka Winbox dan hubungkan ke router
2. Buka menu IP > Addresses
3. Klik tombol (+) untuk menambahkan IP baru
4. Isi form dengan:
   - Address: 192.168.1.1/24 (atau sesuai kebutuhan)
   - Interface: ether1 (atau interface yang diinginkan)
5. Klik OK untuk menyimpan

### Menggunakan CLI

\`\`\`
# Menambahkan IP Address ke interface ether1
/ip address add address=192.168.1.1/24 interface=ether1

# Melihat daftar IP Address
/ip address print
\`\`\`

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

## Konfigurasi Password {#konfigurasi-password}

Sangat penting untuk mengubah password default untuk keamanan:

### Menggunakan Winbox

1. Buka menu System > Users
2. Double-click pada user 'admin'
3. Klik tab Password
4. Masukkan password baru dan konfirmasi
5. Klik OK untuk menyimpan

### Menggunakan CLI

\`\`\`
# Mengubah password user admin
/user set admin password=password_baru

# Atau cara interaktif
/user password admin
\`\`\`

## Konfigurasi Identitas Router {#konfigurasi-identitas}

Mengatur identitas router akan memudahkan identifikasi jika Anda memiliki banyak router:

### Menggunakan Winbox

1. Buka menu System > Identity
2. Masukkan nama untuk router Anda
3. Klik OK untuk menyimpan

### Menggunakan CLI

\`\`\`
# Mengatur identitas router
/system identity set name=Router-Kantor

# Melihat identitas router
/system identity print
\`\`\`

## Konfigurasi Dasar Internet {#konfigurasi-internet}

Untuk mengatur koneksi internet dasar, Anda perlu mengkonfigurasi:

1. **Interface WAN**: Interface yang terhubung ke internet
2. **Default Gateway**: Alamat gateway dari ISP
3. **DNS Server**: Server DNS untuk resolusi nama domain

### Menggunakan Winbox

1. Atur IP Address pada interface WAN (misalnya ether2)
2. Buka menu IP > Routes
3. Klik tombol (+) untuk menambahkan route
4. Isi form dengan:
   - Dst. Address: 0.0.0.0/0 (default route)
   - Gateway: (alamat gateway dari ISP)
5. Buka menu IP > DNS
6. Isi Servers dengan alamat DNS (misalnya 8.8.8.8, 8.8.4.4)
7. Centang Allow Remote Requests jika diperlukan

### Menggunakan CLI

\`\`\`
# Menambahkan IP Address ke interface WAN
/ip address add address=203.0.113.2/24 interface=ether2

# Menambahkan default route
/ip route add dst-address=0.0.0.0/0 gateway=203.0.113.1

# Mengatur DNS Server
/ip dns set servers=8.8.8.8,8.8.4.4 allow-remote-requests=yes
\`\`\`

## Kesimpulan {#kesimpulan}

Konfigurasi awal adalah langkah penting untuk mempersiapkan router Mikrotik Anda. Dengan mengatur IP address, password, identitas, dan koneksi internet dasar, Anda telah memiliki fondasi yang solid untuk konfigurasi lebih lanjut. Pada materi selanjutnya, kita akan mempelajari berbagai cara untuk mengakses dan mengelola router Mikrotik.
