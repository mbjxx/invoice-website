async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const invoiceElement = document.getElementById('invoice');

    // Mendapatkan ukuran halaman
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Menambahkan background gambar dari URL di GitHub
    const backgroundUrl = "https://mbjxx.github.io/invoice-website/bg.png";
    const img = new Image();
    img.src = backgroundUrl;

    img.onload = async () => {
        // Menggambar gambar di PDF sebagai background
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
