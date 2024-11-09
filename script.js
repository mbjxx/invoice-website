// Function to generate invoice
function generateInvoice() {
    const date = document.getElementById("date").value;
    const billTo = document.getElementById("billTo").value;
    const service = document.getElementById("service").value;
    const workHour = parseFloat(document.getElementById("workHour").value);
    const rate = parseFloat(document.getElementById("rate").value);
    const dp = parseFloat(document.getElementById("dp").value);

    const subtotal = workHour * rate;
    const remaining = subtotal - dp;

    // Fill invoice template with data
    document.getElementById("invoiceDate").innerText = date;
    document.getElementById("invoiceBillTo").innerText = billTo;
    document.getElementById("invoiceService").innerText = service;
    document.getElementById("invoiceWorkHour").innerText = workHour;
    document.getElementById("invoiceRate").innerText = rate.toLocaleString();
    document.getElementById("invoiceSubtotal").innerText = subtotal.toLocaleString();
    document.getElementById("dpAmount").innerText = dp.toLocaleString();
    document.getElementById("remainingAmount").innerText = remaining.toLocaleString();

    // Display invoice
    document.getElementById("invoice").style.display = "block";
}

// Function to download invoice as PDF
function downloadPDF() {
    const invoiceElement = document.getElementById("invoice");
    const billToName = document.getElementById("billTo").value || "Client";

    html2canvas(invoiceElement).then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");

        const imgWidth = 190;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const position = 10;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        pdf.save(`Invoice_${billToName}.pdf`);
    });
}
