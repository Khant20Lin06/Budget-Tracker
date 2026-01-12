"use client";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function nextFrame() {
  return new Promise((r) => requestAnimationFrame(() => r()));
}

export async function exportElementToPDF(element, filename = "export") {
  // ✅ Guard
  if (!element) return;

  // ✅ Ensure attached to DOM
  if (!element.isConnected) {
    // wait one frame (React render finished)
    await nextFrame();
    if (!element.isConnected) return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff", // better for PDF
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft > 0) {
    position -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(`${filename}.pdf`);
}
