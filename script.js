// Fungsi untuk menghitung subtotal dan sisa pembayaran, lalu menampilkan invoice
function generateInvoice() {
    const date = document.getElementById("date").value;
    const billTo = document.getElementById("billTo").value;
    const service = document.getElementById("service").value;
    const workHour = parseFloat(document.getElementById("workHour").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const dp = parseFloat(document.getElementById("dp").value);

    const subtotal = workHour * rate;
    const remaining = subtotal - dp;

    // Menampilkan data pada template invoice
    document.getElementById("invoiceDate").innerText = date;
    document.getElementById("invoiceBillTo").innerText = billTo;
    document.getElementById("invoiceService").innerText = service;
    document.getElementById("invoiceWorkHour").innerText = workHour;
    document.getElementById("invoiceRate").innerText = rate.toLocaleString();
    document.getElementById("invoiceSubtotal").innerText = subtotal.toLocaleString();
    document.getElementById("dpAmount").innerText = dp.toLocaleString();
    document.getElementById("remainingAmount").innerText = remaining.toLocaleString();

    // Menampilkan invoice
    document.getElementById("invoice").style.display = "block";
}

// Fungsi untuk mengunduh invoice sebagai PDF
function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const invoiceElement = document.getElementById("invoice");

    doc.html(invoiceElement, {
        callback: function (doc) {
            doc.save("invoice.pdf");
        },
        x: 10,
        y: 10,
        width: 190, // Lebar area dalam mm
        windowWidth: invoiceElement.scrollWidth,
    });
}
