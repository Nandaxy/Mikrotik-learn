---
title: Simple Queue
difficulty: Menengah
difficultyEn: Intermediate
duration: 50 menit
prerequisites:
  - Konfigurasi dasar RouterOS
  - Pemahaman dasar tentang bandwidth
relatedMaterials:
  - title: Queue Tree
    path: /id/materials/4/2
  - title: PCQ (Per Connection Queue)
    path: /id/materials/4/3
tableOfContents:
  - title: Pendahuluan
    id: pendahuluan
  - title: Konsep Manajemen Bandwidth
    id: konsep-bandwidth
  - title: Simple Queue
    id: simple-queue
  - title: Konfigurasi Simple Queue
    id: konfigurasi-simple-queue
  - title: Monitoring dan Troubleshooting
    id: monitoring
  - title: Kesimpulan
    id: kesimpulan
---

## Pendahuluan {#pendahuluan}

Manajemen bandwidth adalah aspek penting dalam pengelolaan jaringan untuk memastikan distribusi sumber daya yang adil dan optimal. Mikrotik menyediakan beberapa metode untuk manajemen bandwidth, dan salah satu yang paling mudah digunakan adalah Simple Queue. Pada materi ini, kita akan mempelajari cara mengkonfigurasi dan mengoptimalkan Simple Queue untuk manajemen bandwidth di jaringan Anda.

## Konsep Manajemen Bandwidth {#konsep-bandwidth}

Manajemen bandwidth adalah proses mengatur, mengontrol, dan memprioritaskan lalu lintas data dalam jaringan. Tujuannya adalah untuk:

1. Memastikan distribusi bandwidth yang adil antar pengguna
2. Mencegah satu pengguna atau aplikasi menghabiskan seluruh bandwidth
3. Memprioritaskan lalu lintas penting
4. Meningkatkan pengalaman pengguna secara keseluruhan

![Bandwidth Management Concept](/placeholder.svg?height=250&width=450)

### Terminologi Penting

- **Bandwidth**: Jumlah data yang dapat ditransfer dalam waktu tertentu, diukur dalam bits per second (bps)
- **Upload/Download**: Arah transfer data (dari client ke server atau sebaliknya)
- **Throughput**: Jumlah data yang berhasil ditransfer dalam waktu tertentu
- **Latency**: Waktu yang dibutuhkan data untuk berpindah dari sumber ke tujuan
- **QoS (Quality of Service)**: Kemampuan untuk memberikan prioritas berbeda untuk berbagai aplikasi, pengguna, atau aliran data

## Simple Queue {#simple-queue}

Simple Queue adalah metode manajemen bandwidth paling dasar di Mikrotik yang memungkinkan Anda membatasi bandwidth berdasarkan alamat IP, subnet, atau interface. Fitur utama Simple Queue:

1. **Mudah dikonfigurasi**: Cocok untuk pemula
2. **Target fleksibel**: Bisa berupa IP, range IP, subnet, atau interface
3. **Limit at dan Max limit**: Dua level pembatasan bandwidth
4. **Parent-child queue**: Hierarki untuk manajemen yang lebih kompleks
5. **Time scheduling**: Pembatasan berdasarkan waktu

<div style="position: relative; padding-bottom: 56.25%; height: 0;">
  <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe>
</div>

### Limit at vs Max limit

- **Limit at**: Bandwidth yang dijamin untuk target, bahkan saat jaringan sibuk
- **Max limit**: Bandwidth maksimum yang dapat digunakan target saat jaringan tidak sibuk

## Konfigurasi Simple Queue {#konfigurasi-simple-queue}

### Menggunakan Winbox

1. Buka Winbox dan hubungkan ke router
2. Buka menu Queues > Simple Queues
3. Klik tombol (+) untuk menambahkan queue baru
4. Isi form dengan:
   - Name: Nama untuk queue (contoh: Client-1)
   - Target: Alamat IP target (contoh: 192.168.1.100)
   - Max Limit: Batas maksimum (contoh: 5M/2M untuk 5 Mbps download, 2 Mbps upload)
   - Limit At: Bandwidth yang dijamin (contoh: 1M/512k)
5. Klik OK untuk menyimpan

### Menggunakan CLI

\`\`\`
# Menambahkan Simple Queue dasar
/queue simple add name=Client-1 target=192.168.1.100 max-limit=5M/2M limit-at=1M/512k

# Menambahkan Simple Queue untuk subnet
/queue simple add name=Office-Network target=192.168.2.0/24 max-limit=20M/10M limit-at=5M/3M

# Menambahkan Simple Queue dengan time schedule
/queue simple add name=Limited-Hours target=192.168.1.101 max-limit=2M/1M time=8h-17h

# Melihat daftar Simple Queue
/queue simple print
\`\`\`

### Hierarki Parent-Child

Untuk membuat hierarki queue, Anda perlu membuat parent queue terlebih dahulu, lalu child queue dengan mengacu pada parent:

\`\`\`
# Membuat parent queue
/queue simple add name=Department-A target=192.168.3.0/24 max-limit=50M/20M

# Membuat child queue
/queue simple add name=User-1 target=192.168.3.10 max-limit=10M/5M parent=Department-A
/queue simple add name=User-2 target=192.168.3.11 max-limit=10M/5M parent=Department-A
\`\`\`

### Burst Mode

Burst mode memungkinkan pengguna untuk mendapatkan bandwidth lebih tinggi untuk waktu singkat:

\`\`\`
# Mengaktifkan burst mode
/queue simple add name=Burst-Example target=192.168.1.102 max-limit=5M/2M \
  burst-limit=10M/5M burst-threshold=4M/1.5M burst-time=30s/30s
\`\`\`

Parameter burst:
- **burst-limit**: Batas maksimum selama burst
- **burst-threshold**: Ambang batas untuk mengaktifkan burst
- **burst-time**: Durasi burst diizinkan

## Monitoring dan Troubleshooting {#monitoring}

### Monitoring Simple Queue

#### Menggunakan Winbox

1. Buka menu Queues > Simple Queues
2. Double-click pada queue yang ingin dimonitor
3. Buka tab "Traffic"
4. Anda dapat melihat grafik penggunaan bandwidth real-time

#### Menggunakan CLI

\`\`\`
# Melihat statistik Simple Queue
/queue simple print stats

# Monitoring traffic pada queue tertentu
/queue simple monitor 0
\`\`\`

### Troubleshooting

Beberapa masalah umum terkait Simple Queue dan solusinya:

1. **Queue tidak berfungsi**
   - Pastikan target dikonfigurasi dengan benar
   - Periksa apakah ada rule firewall yang menginterferensi
   - Pastikan queue aktif (tidak disabled)

2. **Bandwidth tidak sesuai harapan**
   - Periksa konfigurasi max-limit dan limit-at
   - Pastikan total bandwidth yang dialokasikan tidak melebihi kapasitas link
   - Periksa apakah ada aplikasi yang menggunakan port non-standar

3. **Prioritas tidak berfungsi**
   - Periksa nilai priority pada queue (8 adalah terendah, 1 adalah tertinggi)
   - Pastikan queue dengan prioritas lebih tinggi memiliki target yang tepat

## Kesimpulan {#kesimpulan}

Simple Queue adalah metode manajemen bandwidth yang mudah digunakan dan efektif untuk jaringan kecil hingga menengah. Dengan memahami konsep dan cara mengkonfigurasi Simple Queue, Anda dapat memastikan distribusi bandwidth yang adil dan optimal di jaringan Anda.

Pada materi selanjutnya, kita akan mempelajari Queue Tree, metode manajemen bandwidth yang lebih canggih dan fleksibel untuk kontrol trafik yang lebih presisi.
