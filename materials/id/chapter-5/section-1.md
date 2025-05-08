---
title: Konfigurasi Wireless
difficulty: Menengah
difficultyEn: Intermediate
duration: 55 menit
prerequisites:
  - Konfigurasi dasar RouterOS
  - Pemahaman dasar tentang wireless networking
relatedMaterials:
  - title: Setup Hotspot
    path: /id/materials/5/2
  - title: User Manager
    path: /id/materials/5/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: Konsep Wireless Networking
    id: konsep-wireless
  - title: Mode Operasi Wireless
    id: mode-operasi
  - title: Konfigurasi Access Point
    id: konfigurasi-ap
  - title: Keamanan Wireless
    id: keamanan-wireless
  - title: Optimasi Performa
    id: optimasi
  - title: Troubleshooting
    id: troubleshooting
  - title: Kesimpulan
    id: kesimpulan
---

## Pendahuluan {#pendahuluan}

Wireless networking adalah komponen penting dalam infrastruktur jaringan modern. Mikrotik menyediakan fitur wireless yang kuat dan fleksibel melalui RouterOS. Pada materi ini, kita akan mempelajari cara mengkonfigurasi dan mengoptimalkan wireless access point pada perangkat Mikrotik.

## Konsep Wireless Networking {#konsep-wireless}

Wireless networking memungkinkan perangkat untuk terhubung ke jaringan tanpa kabel fisik, menggunakan gelombang radio. Beberapa konsep penting dalam wireless networking:

### Frekuensi dan Channel

Wireless networking beroperasi pada dua band frekuensi utama:
- **2.4 GHz**: Jangkauan lebih jauh, tetapi lebih rentan terhadap interferensi
- **5 GHz**: Jangkauan lebih pendek, tetapi kecepatan lebih tinggi dan interferensi lebih sedikit

Setiap band dibagi menjadi channel. Di Indonesia:
- 2.4 GHz: Channel 1-13
- 5 GHz: Channel 36-64, 100-140, 149-165 (tergantung regulasi)

![Wireless Channels](/placeholder.svg?height=250&width=450)

### Standar Wireless

Standar IEEE 802.11 mendefinisikan protokol untuk wireless networking:

| Standar | Frekuensi | Kecepatan Maksimum | Jangkauan Indoor |
|---------|-----------|-------------------|-----------------|
| 802.11b | 2.4 GHz | 11 Mbps | ~35 meter |
| 802.11g | 2.4 GHz | 54 Mbps | ~38 meter |
| 802.11n | 2.4/5 GHz | 600 Mbps | ~70 meter |
| 802.11ac | 5 GHz | 6.9 Gbps | ~35 meter |
| 802.11ax (Wi-Fi 6) | 2.4/5/6 GHz | 9.6 Gbps | ~35 meter |

## Mode Operasi Wireless {#mode-operasi}

Mikrotik RouterOS mendukung beberapa mode operasi wireless:

1. **Access Point**: Mode standar untuk menyediakan akses wireless kepada client
2. **Station**: Berfungsi sebagai client yang terhubung ke access point lain
3. **Bridge**: Menghubungkan dua jaringan wireless
4. **Station WDS**: Kombinasi station dan bridge
5. **AP WDS**: Access point dengan dukungan WDS (Wireless Distribution System)

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

## Konfigurasi Access Point {#konfigurasi-ap}

### Menggunakan Winbox

1. Buka Winbox dan hubungkan ke router
2. Buka menu Wireless
3. Double-click pada interface wireless (contoh: wlan1)
4. Pada tab "Wireless", atur:
   - Mode: ap bridge
   - Band: 2.4ghz-b/g/n atau 5ghz-a/n/ac (tergantung hardware)
   - Channel Width: 20/40/80 MHz (tergantung band)
   - Frequency: Pilih channel yang paling sedikit interferensi
   - SSID: Nama jaringan wireless Anda
5. Pada tab "Security Profiles", buat profil keamanan baru:
   - Klik tombol "..."
   - Klik tombol "+" untuk menambahkan profil baru
   - Name: Nama profil (contoh: secure-profile)
   - Authentication Types: WPA2 PSK
   - Unicast Ciphers: aes ccm
   - Group Ciphers: aes ccm
   - WPA2 Pre-Shared Key: Password untuk jaringan
   - Klik OK
6. Kembali ke tab "Wireless", pilih profil keamanan yang baru dibuat
7. Klik OK untuk menyimpan

### Menggunakan CLI

\`\`\`
# Membuat security profile
/interface wireless security-profiles
add name=secure-profile authentication-types=wpa2-psk unicast-ciphers=aes-ccm \
  group-ciphers=aes-ccm wpa2-pre-shared-key=StrongPassword

# Mengkonfigurasi interface wireless
/interface wireless
set wlan1 mode=ap-bridge band=2.4ghz-b/g/n channel-width=20/40mhz-XX \
  frequency=auto ssid=MikrotikAP security-profile=secure-profile disabled=no

# Melihat konfigurasi wireless
/interface wireless print
\`\`\`

## Keamanan Wireless {#keamanan-wireless}

Keamanan adalah aspek penting dalam wireless networking. Beberapa praktik terbaik:

### 1. Gunakan Enkripsi yang Kuat

Selalu gunakan WPA2 atau WPA3 (jika didukung) dengan enkripsi AES. Hindari menggunakan WEP atau WPA1 yang sudah tidak aman.

### 2. Password yang Kuat

Gunakan password yang kompleks dengan minimal 12 karakter, kombinasi huruf besar, huruf kecil, angka, dan simbol.

### 3. Sembunyikan SSID

Meskipun bukan metode keamanan yang kuat, menyembunyikan SSID dapat mengurangi visibilitas jaringan Anda:

\`\`\`
/interface wireless set wlan1 hide-ssid=yes
\`\`\`

### 4. Filtering MAC Address

Batasi akses berdasarkan MAC address perangkat:

\`\`\`
/interface wireless access-list
add interface=wlan1 mac-address=XX:XX:XX:XX:XX:XX action=accept
add interface=wlan1 mac-address=YY:YY:YY:YY:YY:YY action=accept
add interface=wlan1 action=reject
\`\`\`

### 5. Isolasi Wireless

Mencegah komunikasi antar client wireless:

\`\`\`
/interface wireless set wlan1 default-authentication=no
/interface wireless set wlan1 default-forwarding=no
\`\`\`

## Optimasi Performa {#optimasi}

Beberapa tips untuk mengoptimalkan performa wireless:

### 1. Pemilihan Channel

Gunakan aplikasi seperti WiFi Analyzer untuk menemukan channel dengan interferensi paling sedikit.

### 2. Atur Transmit Power

Sesuaikan daya transmisi dengan kebutuhan coverage:

\`\`\`
/interface wireless set wlan1 tx-power=17
\`\`\`

### 3. Gunakan Band 5 GHz

Jika perangkat mendukung, gunakan band 5 GHz untuk kecepatan lebih tinggi dan interferensi lebih sedikit.

### 4. Atur Channel Width

Untuk 2.4 GHz, gunakan channel width 20 MHz untuk mengurangi interferensi. Untuk 5 GHz, channel width yang lebih lebar (40/80 MHz) dapat memberikan throughput lebih tinggi.

### 5. Aktifkan Wireless-N dan AC

Pastikan mode b/g/n atau a/n/ac diaktifkan untuk mendukung perangkat modern.

## Troubleshooting {#troubleshooting}

Beberapa masalah umum terkait wireless dan solusinya:

### 1. Sinyal Lemah

- Periksa posisi antena
- Sesuaikan daya transmisi
- Periksa apakah ada interferensi fisik (dinding, logam, dll)
- Gunakan perangkat tambahan seperti repeater atau access point tambahan

### 2. Koneksi Putus-putus

- Periksa interferensi dari perangkat lain
- Ganti channel
- Periksa apakah ada masalah dengan power supply
- Update firmware RouterOS

### 3. Kecepatan Lambat

- Periksa signal strength dan CCQ (Client Connection Quality)
- Ganti ke band 5 GHz jika memungkinkan
- Periksa apakah ada pembatasan bandwidth
- Periksa apakah ada client yang menggunakan bandwidth berlebihan

### 4. Monitoring Wireless

\`\`\`
# Melihat registrasi client wireless
/interface wireless registration-table print

# Melihat statistik interface wireless
/interface wireless monitor wlan1
\`\`\`

## Kesimpulan {#kesimpulan}

Konfigurasi wireless yang tepat pada Mikrotik dapat memberikan konektivitas yang handal dan aman untuk jaringan Anda. Dengan memahami konsep dasar, mode operasi, dan praktik keamanan, Anda dapat mengoptimalkan performa wireless dan mengatasi masalah yang mungkin muncul.

Pada materi selanjutnya, kita akan mempelajari cara mengkonfigurasi Hotspot, fitur yang memungkinkan Anda menyediakan akses internet dengan otentikasi pengguna.
