"use client";

function stripUnsupportedGuarantee(root) {
  // remove any inline style containing oklch/lab
  const all = root.querySelectorAll("*");
  for (const el of all) {
    // 1) inline style attr
    const styleAttr = el.getAttribute("style");
    if (styleAttr && /(oklch|lab)\(/i.test(styleAttr)) {
      // remove only the bad parts by dropping the entire inline style (safest)
      el.removeAttribute("style");
    }

    // 2) SVG attributes like fill/stroke can contain oklch
    const fill = el.getAttribute("fill");
    if (fill && /(oklch|lab)\(/i.test(fill)) el.removeAttribute("fill");

    const stroke = el.getAttribute("stroke");
    if (stroke && /(oklch|lab)\(/i.test(stroke)) el.removeAttribute("stroke");
  }
}

export async function exportElementToPDF(element, filename = "export.pdf") {
  if (!element) return;

  // ✅ force export mode
  document.documentElement.setAttribute("data-exporting", "1");
  await new Promise((r) => requestAnimationFrame(r));

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
    logging: false,

    // ✅ MOST IMPORTANT: strip unsupported color funcs before parsing
    onclone: (clonedDoc) => {
      // apply export-mode on clone too
      clonedDoc.documentElement.setAttribute("data-exporting", "1");

      // strip oklch/lab from inline/SVG attrs (prevents parser crash)
      stripUnsupportedGuarantee(clonedDoc);

      // EXTRA safety: disable filters/gradients by force
      const style = clonedDoc.createElement("style");
      style.textContent = `
        html[data-exporting="1"] * {
          filter: none !important;
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          box-shadow: none !important;
          background-image: none !important;
          transition: none !important;
          animation: none !important;
        }
        html[data-exporting="1"] body { background: #fff !important; }
      `;
      clonedDoc.head.appendChild(style);
    },
  });

  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF("p", "mm", "a4");

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  const imgWidth = pageWidth;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  let y = 0;
  let left = imgHeight;

  pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
  left -= pageHeight;

  while (left > 0) {
    y -= pageHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, y, imgWidth, imgHeight);
    left -= pageHeight;
  }

  pdf.save(filename);

  document.documentElement.removeAttribute("data-exporting");
}
