---
title: DHCP Server
difficulty: Menengah
difficultyEn: Intermediate
duration: 45 menit
prerequisites:
  - Konfigurasi IP Address
  - Pemahaman dasar tentang DHCP
relatedMaterials:
  - title: Konfigurasi IP Address
    path: /id/materials/3/1
  - title: NAT dan Firewall Dasar
    path: /id/materials/3/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: Konsep DHCP
    id: konsep-dhcp
  - title: Konfigurasi DHCP Server
    id: konfigurasi-dhcp
  - title: DHCP Options
    id: dhcp-options
  - title: DHCP Leases
    id: dhcp-leases
  - title: Troubleshooting
    id: troubleshooting
  - title: Kesimpulan
    id: kesimpulan
---

## Pendahuluan {#pendahuluan}

DHCP (Dynamic Host Configuration Protocol) adalah protokol yang memungkinkan server untuk secara otomatis memberikan alamat IP dan informasi konfigurasi jaringan lainnya kepada perangkat client. Pada materi ini, kita akan mempelajari cara mengkonfigurasi DHCP Server di Mikrotik untuk distribusi IP otomatis di jaringan Anda.

## Konsep DHCP {#konsep-dhcp}

DHCP bekerja dengan model client-server, di mana server DHCP memberikan parameter konfigurasi jaringan kepada client yang memintanya. Proses ini terdiri dari empat langkah utama:

1. **DHCP Discover**: Client mengirim broadcast untuk menemukan server DHCP
2. **DHCP Offer**: Server merespon dengan menawarkan alamat IP
3. **DHCP Request**: Client meminta alamat IP yang ditawarkan
4. **DHCP Acknowledge**: Server mengkonfirmasi dan mengirim parameter konfigurasi

![DHCP Process](/placeholder.svg?height=300&width=500)

Informasi yang diberikan oleh DHCP Server biasanya meliputi:
- Alamat IP
- Subnet mask
- Default gateway
- DNS server
- Lease time (waktu sewa)

## Konfigurasi DHCP Server {#konfigurasi-dhcp}

Sebelum mengkonfigurasi DHCP Server, pastikan Anda telah:
1. Mengatur alamat IP pada interface LAN
2. Membuat IP Pool untuk range alamat yang akan didistribusikan

### Menggunakan DHCP Setup Wizard

Mikrotik menyediakan wizard untuk mempermudah konfigurasi DHCP Server:

1. Buka Winbox dan hubungkan ke router
2. Buka menu IP > DHCP Server
3. Klik tombol "DHCP Setup" untuk memulai wizard
4. Pilih interface untuk DHCP Server (biasanya interface LAN)
5. Tentukan DHCP Address Space (biasanya sama dengan network address interface)
6. Tentukan Gateway untuk client (biasanya alamat IP router pada interface tersebut)
7. Tentukan range alamat untuk Pool
8. Tentukan DNS Server (bisa menggunakan DNS Google: 8.8.8.8, 8.8.4.4)
9. Tentukan Lease Time (default: 3 days)
10. Klik "Next" hingga selesai

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

### Menggunakan CLI

Berikut langkah-langkah konfigurasi DHCP Server menggunakan CLI:

\`\`\`
# Membuat IP Pool
/ip pool add name=dhcp-pool ranges=192.168.1.100-192.168.1.200

# Membuat DHCP Server
/ip dhcp-server add name=dhcp1 interface=ether2 address-pool=dhcp-pool disabled=no

# Membuat DHCP Network
/ip dhcp-server network add address=192.168.1.0/24 gateway=192.168.1.1 dns-server=8.8.8.8,8.8.4.4
\`\`\`

## DHCP Options {#dhcp-options}

DHCP Options memungkinkan Anda untuk memberikan informasi tambahan kepada client DHCP. Beberapa options yang umum digunakan:

| Option | Kode | Deskripsi |
|--------|------|-----------|
| Subnet Mask | 1 | Subnet mask untuk client |
| Router | 3 | Default gateway untuk client |
| DNS Server | 6 | Server DNS untuk client |
| Domain Name | 15 | Nama domain untuk client |
| NTP Server | 42 | Server waktu untuk client |
| WINS Server | 44 | Server WINS untuk client |

### Menambahkan DHCP Option

#### Menggunakan Winbox

1. Buka menu IP > DHCP Server > Options
2. Klik tombol (+) untuk menambahkan option baru
3. Isi form dengan:
   - Name: Nama untuk option
   - Code: Kode option (lihat tabel di atas)
   - Value: Nilai untuk option
4. Klik OK untuk menyimpan

#### Menggunakan CLI

\`\`\`
# Menambahkan DHCP Option
/ip dhcp-server option add name=ntp-server code=42 value="'192.168.1.5'"

# Menggunakan option pada DHCP Network
/ip dhcp-server network set 0 dhcp-option=ntp-server
\`\`\`

## DHCP Leases {#dhcp-leases}

DHCP Leases adalah daftar alamat IP yang telah diberikan kepada client. Anda dapat melihat dan mengelola leases ini:

### Menggunakan Winbox

1. Buka menu IP > DHCP Server > Leases
2. Di sini Anda dapat melihat semua leases aktif
3. Anda dapat mengubah lease menjadi statis dengan mengklik tombol "Make Static"

### Menggunakan CLI

\`\`\`
# Melihat daftar DHCP Leases
/ip dhcp-server lease print

# Membuat lease statis
/ip dhcp-server lease make-static 0

# Menghapus lease
/ip dhcp-server lease remove 0
\`\`\`

## Troubleshooting {#troubleshooting}

Beberapa masalah umum terkait DHCP Server dan solusinya:

### 1. Client Tidak Mendapatkan IP

- Pastikan DHCP Server aktif (`/ip dhcp-server print`)
- Periksa apakah ada konflik dengan DHCP Server lain di jaringan
- Periksa apakah IP Pool memiliki alamat yang tersedia
- Periksa koneksi fisik antara client dan router

### 2. Client Mendapatkan IP Tapi Tidak Bisa Akses Internet

- Pastikan gateway dikonfigurasi dengan benar di DHCP Network
- Periksa konfigurasi NAT dan Firewall
- Periksa apakah DNS Server dikonfigurasi dengan benar

### 3. Lease Time Terlalu Pendek/Panjang

- Sesuaikan lease time berdasarkan kebutuhan:
  - Jaringan dengan banyak perangkat mobile: lease time pendek (beberapa jam)
  - Jaringan stabil dengan perangkat tetap: lease time panjang (beberapa hari)

## Kesimpulan {#kesimpulan}

DHCP Server adalah komponen penting dalam jaringan modern yang memudahkan administrasi dengan mengotomatisasi distribusi alamat IP. Dengan mengkonfigurasi DHCP Server di Mikrotik, Anda dapat mengurangi beban administratif dan meminimalkan kesalahan konfigurasi manual.

Pada materi selanjutnya, kita akan mempelajari konfigurasi NAT (Network Address Translation) dan Firewall dasar untuk mengamankan jaringan Anda.
