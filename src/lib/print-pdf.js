"use client";

export function printElementToPDF(element, title = "report") {
  if (!element) return;

  const w = window.open("", "_blank", "width=1200,height=800");
  if (!w) {
    alert("Popup blocked. Please allow popups for this site.");
    return;
  }

  const origin = window.location.origin;

  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
    .map((l) => {
      const href = l.getAttribute("href") || "";
      const abs = href.startsWith("http") ? href : origin + href;
      return `<link rel="stylesheet" href="${abs}" />`;
    })
    .join("\n");

  const inlineStyles = Array.from(document.querySelectorAll("style"))
    .map((s) => s.outerHTML)
    .join("\n");

  // clone DOM
  const cloned = element.cloneNode(true);
  cloned.querySelectorAll(".no-print").forEach((el) => el.remove());

  // chart height guard
  cloned.querySelectorAll(".recharts-responsive-container").forEach((el) => {
    el.style.width = "100%";
    el.style.height = "340px";
    el.style.minHeight = "340px";
  });

  // ❌ NO <script> tag inside HTML (Trusted Types issue)
  w.document.open();
  w.document.write(`<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <base href="${origin}/" />
    <title>${title}</title>
    ${links}
    ${inlineStyles}
    <style>
      @page { size: A4; margin: 14mm; }
      html, body { background: white !important; }
      body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
      .recharts-responsive-container { width: 100% !important; height: 340px !important; min-height: 340px !important; }
    </style>
  </head>
  <body>
    <div style="padding:12px;background:white;">
      ${cloned.outerHTML}
    </div>
  </body>
</html>`);
  w.document.close();

  // ✅ attach print AFTER load (no inline script)
  w.onload = () => {
    setTimeout(() => {
      w.focus();
      w.print();
      // optional close
      // setTimeout(() => w.close(), 300);
    }, 900);
  };
}
