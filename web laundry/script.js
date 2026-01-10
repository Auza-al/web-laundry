const pricelist = {
    'Pakaian': { price: 7000, label: 'Pakaian (Per Kg)' },
    'Sepatu': { price: 35000, label: 'Deep Clean Sepatu (Per Pasang)' },
    'Tas': { price: 50000, label: 'Spa Tas (Per Item)' },
    'Selimut': { price: 30000, label: 'Selimut/Bedcover (Per Item)' }
};

let selectedCategoryPrice = 0;
let selectedCategoryName = "";

function selectCategory(category) {
    selectedCategoryName = category;
    const select = document.getElementById('layanan_select');
    const data = pricelist[category];
    
    document.querySelectorAll('.category-card').forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');

    select.innerHTML = `<option value="${data.price}" selected>${data.label}</option>`;
    selectedCategoryPrice = data.price;
    
    document.getElementById('order').scrollIntoView({ behavior: 'smooth' });
    updateHarga();
}

function updateHarga() {
    const jumlah = document.getElementById('jumlah').value;
    const display = document.getElementById('total_display');
    
    if (jumlah > 0 && selectedCategoryPrice > 0) {
        const total = jumlah * selectedCategoryPrice;
        display.innerText = "Rp " + total.toLocaleString('id-ID');
    } else {
        display.innerText = "Rp 0";
    }
}

function kirimWhatsApp(event) {
    event.preventDefault();
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const jumlah = document.getElementById('jumlah').value;
    const total = document.getElementById('total_display').innerText;
    const nomorWA = "628123456789"; // PASTIKAN NOMOR ANDA BENAR

    if (!selectedCategoryName) return alert("Pilih kategori dulu!");

    // Menambahkan deteksi promo (opsional jika user input kode promo)
    const pesan = `*ORDER LAUNDRY PREMIUM*%0A` +
                  `--------------------------%0A` +
                  `👤 *Nama:* ${nama}%0A` +
                  `📍 *Alamat:* ${alamat}%0A` +
                  `📦 *Kategori:* ${selectedCategoryName}%0A` +
                  `🔢 *Jumlah:* ${jumlah}%0A` +
                  `💰 *Total Estimasi:* ${total}%0A` +
                  `🎁 *Promo:* HEMATWEEKEND (20% OFF)%0A` + // Tambahan line promo
                  `--------------------------%0A` +
                  `Mohon segera konfirmasi penjemputan!`;
                  
    window.open(`https://wa.me/${nomorWA}?text=${pesan}`, '_blank');
}

function toggleFAQ(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('i');
    answer.classList.toggle('hidden');
    icon.classList.toggle('rotate');
}

/**
 * Fungsi Slider Before & After
 */
function moveSlider(e) {
    const container = e.parentElement;
    const overlay = container.querySelector('.comparison-overlay');
    const sliderValue = e.value;
    
    overlay.style.width = sliderValue + "%";
}

// ... fungsi updateHarga dan kirimWhatsApp yang sudah ada ...

function kirimWhatsApp(event) {
    event.preventDefault();
    const nama = document.getElementById('nama').value;
    const alamat = document.getElementById('alamat').value;
    const select = document.getElementById('layanan_select');
    const layananText = select.options[select.selectedIndex].text;
    const jumlah = document.getElementById('jumlah').value;
    const total = document.getElementById('total_display').innerText;

    // --- BAGIAN BARU: SIMPAN KE DATA ADMIN ---
    const pesananBaru = {
        nama: nama,
        layanan: layananText,
        jumlah: jumlah,
        total: total,
        status: "Baru",
        waktu: new Date().toLocaleString('id-ID')
    };

    // Ambil data lama atau buat array baru jika kosong
    let daftarPesanan = JSON.parse(localStorage.getItem('daftarPesanan')) || [];
    daftarPesanan.unshift(pesananBaru); // Tambah ke urutan paling atas
    localStorage.setItem('daftarPesanan', JSON.stringify(daftarPesanan));
    // -----------------------------------------

    const pesan = `*ORDER LAUNDRY*%0A👤 Nama: ${nama}%0A📍 Alamat: ${alamat}%0A📦 Layanan: ${layananText}%0A🔢 Jumlah: ${jumlah}%0A💰 Total: ${total}`;
    window.open(`https://wa.me/628123456789?text=${pesan}`, '_blank');
}