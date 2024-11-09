// Fungsi untuk menghitung dan menampilkan invoice berdasarkan input form
function generateInvoice() {
    // Mengambil nilai dari form input
    const date = document.getElementById("date").value;
    const billTo = document.getElementById("billTo").value;
    const service = document.getElementById("service").value;
    const workHour = parseInt(document.getElementById("workHour").value);
    const rate = parseInt(document.getElementById("rate").value);
    const dp = parseInt(document.getElementById("dp").value);

    // Menghitung subtotal dan sisa pembayaran
    const subtotal = workHour * rate;
    const remaining = subtotal - dp;

    // Menampilkan data pada template invoice
    document.getElementById("invoiceDate").innerText = date;
    document.getElementById("invoiceBillTo").innerText = billTo;
    document.getElementById("invoiceService").innerText = service;
    document.getElementById("invoiceWorkHour").innerText = workHour;
    document.getElementById("invoiceRate").innerText = `Rp ${rate.toLocaleString()}`;
    document.getElementById("subtotal").innerText = subtotal.toLocaleString();
    document.getElementById("dpAmount").innerText = dp.toLocaleString();
    document.getElementById("remaining").innerText = remaining.toLocaleString();

    // Menampilkan div invoice yang tadinya disembunyikan
    document.getElementById("invoice").style.display = "block";
}

// Fungsi untuk mengunduh invoice sebagai PDF
async function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const invoiceElement = document.getElementById("invoice");

    // Menambahkan background gambar dari URL di GitHub
    const backgroundUrl = "https://mbjxx.github.io/invoice-website/bg.png";
    const img = new Image();
    img.src = backgroundUrl;

    img.onload = async () => {
        // Menggambar gambar di PDF sebagai background
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        doc.addImage(img, 'JPEG', 0, 0, pageWidth, pageHeight, '', 'FAST');

        // Mengambil elemen HTML sebagai canvas untuk PDF
        await doc.html(invoiceElement, {
            callback: function (doc) {
                doc.save("invoice.pdf");
            },
            x: 10,
            y: 10,
            width: pageWidth - 20,
            windowWidth: pageWidth,
        });
    };
}
