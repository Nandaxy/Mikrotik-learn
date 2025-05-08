import fs from "fs"
import path from "path"

const contentDirectory = path.join(process.cwd(), "content")

export async function getTermsContent(lang: string): Promise<string> {
  const filePath = path.join(contentDirectory, lang, "terms.md")

  try {
    return fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.error(`Error reading terms content for language ${lang}:`, error)
    return getDefaultTermsContent(lang)
  }
}

export async function getPrivacyContent(lang: string): Promise<string> {
  const filePath = path.join(contentDirectory, lang, "privacy.md")

  try {
    return fs.readFileSync(filePath, "utf8")
  } catch (error) {
    console.error(`Error reading privacy content for language ${lang}:`, error)
    return getDefaultPrivacyContent(lang)
  }
}

function getDefaultTermsContent(lang: string): string {
  return lang === "id"
    ? `
# Ketentuan Layanan

## 1. Penerimaan Ketentuan

Dengan mengakses dan menggunakan platform Belajar Mikrotik, Anda menyetujui untuk terikat oleh ketentuan layanan ini. Jika Anda tidak setuju dengan ketentuan ini, harap tidak menggunakan platform kami.

## 2. Penggunaan Platform

### 2.1 Persyaratan Usia
Anda harus berusia minimal 13 tahun untuk menggunakan platform ini. Jika Anda berusia di bawah 18 tahun, Anda harus mendapatkan persetujuan dari orang tua atau wali Anda.

### 2.2 Akun Pengguna
Beberapa fitur platform mungkin mengharuskan Anda untuk membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan kredensial akun Anda dan semua aktivitas yang terjadi di bawah akun Anda.

### 2.3 Penggunaan yang Dilarang
Anda setuju untuk tidak:
- Menggunakan platform untuk tujuan ilegal
- Melanggar hak kekayaan intelektual pihak ketiga
- Mengunggah atau membagikan konten yang melanggar hukum, mengancam, atau tidak pantas
- Mencoba untuk mendapatkan akses tidak sah ke bagian mana pun dari platform
- Menggunakan platform dengan cara yang dapat merusak, menonaktifkan, atau membebani infrastruktur kami

## 3. Konten Platform

### 3.1 Hak Kekayaan Intelektual
Semua konten yang disediakan di platform, termasuk teks, grafik, logo, gambar, dan materi pembelajaran, dilindungi oleh hak cipta dan hak kekayaan intelektual lainnya.

### 3.2 Lisensi Penggunaan
Kami memberikan Anda lisensi terbatas, non-eksklusif, dan tidak dapat dialihkan untuk mengakses dan menggunakan konten platform untuk tujuan pembelajaran pribadi dan non-komersial.

### 3.3 Konten Pengguna
Jika Anda mengirimkan konten ke platform kami, Anda memberikan kami lisensi non-eksklusif untuk menggunakan, memodifikasi, dan menampilkan konten tersebut sehubungan dengan platform.

## 4. Penafian dan Batasan Tanggung Jawab

### 4.1 Penafian Jaminan
Platform disediakan "sebagaimana adanya" dan "sebagaimana tersedia" tanpa jaminan apa pun, baik tersurat maupun tersirat.

### 4.2 Batasan Tanggung Jawab
Kami tidak bertanggung jawab atas kerugian tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan platform.

## 5. Perubahan Ketentuan

Kami berhak untuk memodifikasi ketentuan layanan ini kapan saja. Perubahan akan efektif setelah diposting di platform. Penggunaan berkelanjutan Anda atas platform setelah perubahan tersebut merupakan penerimaan Anda terhadap ketentuan yang direvisi.

## 6. Hukum yang Berlaku

Ketentuan layanan ini diatur oleh hukum Indonesia. Setiap sengketa yang timbul dari atau terkait dengan ketentuan ini akan diselesaikan secara eksklusif di pengadilan yang memiliki yurisdiksi di Indonesia.

## 7. Kontak

Jika Anda memiliki pertanyaan tentang ketentuan layanan ini, silakan hubungi kami di info@belajarmikrotik.id.
`
    : `
# Terms of Service

## 1. Acceptance of Terms

By accessing and using the Learn Mikrotik platform, you agree to be bound by these terms of service. If you do not agree to these terms, please do not use our platform.

## 2. Use of the Platform

### 2.1 Age Requirements
You must be at least 13 years old to use this platform. If you are under 18 years old, you must have permission from your parent or guardian.

### 2.2 User Accounts
Some features of the platform may require you to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.

### 2.3 Prohibited Uses
You agree not to:
- Use the platform for any illegal purpose
- Infringe upon the intellectual property rights of third parties
- Upload or share content that is unlawful, threatening, or inappropriate
- Attempt to gain unauthorized access to any part of the platform
- Use the platform in a way that could damage, disable, or overburden our infrastructure

## 3. Platform Content

### 3.1 Intellectual Property Rights
All content provided on the platform, including text, graphics, logos, images, and learning materials, is protected by copyright and other intellectual property rights.

### 3.2 License to Use
We grant you a limited, non-exclusive, non-transferable license to access and use the platform content for personal, non-commercial learning purposes.

### 3.3 User Content
If you submit content to our platform, you grant us a non-exclusive license to use, modify, and display that content in connection with the platform.

## 4. Disclaimers and Limitations of Liability

### 4.1 Warranty Disclaimer
The platform is provided "as is" and "as available" without any warranties of any kind, either express or implied.

### 4.2 Limitation of Liability
We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform.

## 5. Changes to Terms

We reserve the right to modify these terms of service at any time. Changes will be effective when posted on the platform. Your continued use of the platform after such changes constitutes your acceptance of the revised terms.

## 6. Governing Law

These terms of service are governed by the laws of Indonesia. Any dispute arising from or relating to these terms will be resolved exclusively in the courts having jurisdiction in Indonesia.

## 7. Contact

If you have any questions about these terms of service, please contact us at info@learnmikrotik.com.
`
}

function getDefaultPrivacyContent(lang: string): string {
  return lang === "id"
    ? `
# Kebijakan Privasi

## 1. Pendahuluan

Belajar Mikrotik ("kami", "kita", atau "platform kami") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda menggunakan platform kami.

## 2. Informasi yang Kami Kumpulkan

### 2.1 Informasi yang Anda Berikan
Kami dapat mengumpulkan informasi berikut yang Anda berikan secara langsung:
- Informasi akun (nama, alamat email, kata sandi)
- Informasi profil (foto profil, biografi)
- Konten yang Anda unggah atau bagikan
- Komunikasi dengan kami

### 2.2 Informasi yang Dikumpulkan Secara Otomatis
Saat Anda menggunakan platform kami, kami dapat mengumpulkan informasi berikut secara otomatis:
- Informasi perangkat (jenis perangkat, sistem operasi)
- Data log (alamat IP, waktu akses)
- Data penggunaan (halaman yang dikunjungi, fitur yang digunakan)
- Informasi lokasi (berdasarkan alamat IP)

### 2.3 Cookies dan Teknologi Serupa
Kami menggunakan cookies dan teknologi serupa untuk mengumpulkan informasi tentang bagaimana Anda berinteraksi dengan platform kami dan untuk meningkatkan pengalaman pengguna.

## 3. Bagaimana Kami Menggunakan Informasi Anda

Kami menggunakan informasi yang kami kumpulkan untuk:
- Menyediakan dan memelihara platform
- Meningkatkan dan mempersonalisasi pengalaman pengguna
- Menganalisis penggunaan platform
- Berkomunikasi dengan Anda
- Menegakkan ketentuan layanan kami
- Mencegah aktivitas penipuan dan ilegal

## 4. Berbagi Informasi

Kami tidak menjual informasi pribadi Anda kepada pihak ketiga. Namun, kami dapat membagikan informasi Anda dalam situasi berikut:

### 4.1 Penyedia Layanan
Kami dapat membagikan informasi dengan penyedia layanan pihak ketiga yang membantu kami mengoperasikan platform.

### 4.2 Kepatuhan Hukum
Kami dapat mengungkapkan informasi jika diwajibkan oleh hukum atau jika kami percaya bahwa tindakan tersebut diperlukan untuk:
- Mematuhi kewajiban hukum
- Melindungi hak atau keselamatan kami, pengguna kami, atau orang lain
- Mendeteksi, mencegah, atau mengatasi masalah keamanan atau teknis

## 5. Keamanan Data

Kami mengimplementasikan langkah-langkah keamanan yang dirancang untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.

## 6. Hak Privasi Anda

Tergantung pada lokasi Anda, Anda mungkin memiliki hak tertentu terkait dengan informasi pribadi Anda, termasuk:
- Hak untuk mengakses informasi yang kami miliki tentang Anda
- Hak untuk memperbaiki informasi yang tidak akurat
- Hak untuk menghapus informasi Anda
- Hak untuk membatasi pemrosesan informasi Anda
- Hak untuk meminta portabilitas data

## 7. Retensi Data

Kami menyimpan informasi pribadi Anda selama diperlukan untuk memenuhi tujuan yang diuraikan dalam Kebijakan Privasi ini, kecuali jika periode penyimpanan yang lebih lama diperlukan atau diizinkan oleh hukum.

## 8. Perubahan pada Kebijakan Privasi

Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan signifikan dengan memposting kebijakan yang diperbarui di platform kami.

## 9. Kontak

Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi kami atau praktik data kami, silakan hubungi kami di privacy@belajarmikrotik.id.
`
    : `
# Privacy Policy

## 1. Introduction

Learn Mikrotik ("we," "us," or "our platform") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you use our platform.

## 2. Information We Collect

### 2.1 Information You Provide
We may collect the following information that you provide directly:
- Account information (name, email address, password)
- Profile information (profile picture, biography)
- Content you upload or share
- Communications with us

### 2.2 Information Collected Automatically
When you use our platform, we may automatically collect the following information:
- Device information (device type, operating system)
- Log data (IP address, access times)
- Usage data (pages visited, features used)
- Location information (based on IP address)

### 2.3 Cookies and Similar Technologies
We use cookies and similar technologies to collect information about how you interact with our platform and to improve the user experience.

## 3. How We Use Your Information

We use the information we collect to:
- Provide and maintain the platform
- Improve and personalize the user experience
- Analyze platform usage
- Communicate with you
- Enforce our terms of service
- Prevent fraudulent and illegal activities

## 4. Sharing Information

We do not sell your personal information to third parties. However, we may share your information in the following situations:

### 4.1 Service Providers
We may share information with third-party service providers that help us operate our platform.

### 4.2 Legal Compliance
We may disclose information if required by law or if we believe that such action is necessary to:
- Comply with legal obligations
- Protect our rights or safety, our users, or others
- Detect, prevent, or address security or technical issues

## 5. Data Security

We implement security measures designed to protect your personal information from unauthorized access, use, or disclosure.

## 6. Your Privacy Rights

Depending on your location, you may have certain rights regarding your personal information, including:
- The right to access information we hold about you
- The right to rectify inaccurate information
- The right to delete your information
- The right to restrict processing of your information
- The right to request data portability

## 7. Data Retention

We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law.

## 8. Changes to the Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the updated policy on our platform.

## 9. Contact

If you have any questions or concerns about our Privacy Policy or data practices, please contact us at privacy@learnmikrotik.com.
`
}
