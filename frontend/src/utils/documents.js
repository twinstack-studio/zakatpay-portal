import { PdfDoc, textWidth } from './pdf.js';

const INK = [22, 22, 30];
const MUTED = [110, 112, 125];
const RULE = [222, 224, 232];
const PAGE_W = 595.28;
const M = 56; // page margin
const COL = PAGE_W - M * 2;

const money = (n) => `PKR ${n.toLocaleString('en-US')}`;

/* ------------------------------------------------------------------ shared */

function header(doc, accent, eyebrow, right) {
  doc.rect(0, 0, PAGE_W, 92, accent);
  doc.rect(0, 92, PAGE_W, 4, [255, 255, 255]);
  doc.text('ZakatPay', M, 44, { size: 22, bold: true, color: [255, 255, 255] });
  doc.text('DIGITAL PORTAL', M, 62, { size: 8, bold: true, color: [255, 255, 255] });
  doc.text(eyebrow, M, 78, { size: 8.5, color: [255, 255, 255] });
  if (right) doc.text(right, PAGE_W - M, 44, { size: 9.5, bold: true, color: [255, 255, 255], align: 'right' });
}

function footer(doc, accent, left, page, total) {
  const y = 800;
  doc.line(M, y, PAGE_W - M, y, RULE, 0.8);
  doc.text(left, M, y + 16, { size: 8, color: MUTED });
  doc.text(`Page ${page} of ${total}`, PAGE_W - M, y + 16, { size: 8, bold: true, color: accent, align: 'right' });
}

function sectionTitle(doc, label, y, accent) {
  doc.rect(M, y - 9, 3.5, 13, accent);
  doc.text(label, M + 12, y, { size: 13, bold: true, color: INK });
  return y + 22;
}

/* ------------------------------------------------------- audit report */

export function buildAuditReport(r) {
  const doc = new PdfDoc();
  const accent = r.accent;
  const total = 2;

  /* ---- page 1 ---- */
  doc.addPage();
  header(doc, accent, 'Independent Financial & Shariah Audit', r.ref);

  doc.text(r.year, M, 150, { size: 40, bold: true, color: accent });
  doc.text(r.title, M, 178, { size: 15, bold: true, color: INK });
  doc.text(`Published ${r.date}   |   Reference ${r.ref}   |   ${r.pages} pages`, M, 197, { size: 9, color: MUTED });
  doc.line(M, 212, PAGE_W - M, 212, RULE, 0.8);

  let y = sectionTitle(doc, 'Executive Summary', 240, accent);
  y = doc.paragraph(r.summary, M, y, COL, { size: 10.5 });

  /* key figures */
  y += 14;
  const boxW = (COL - 20) / 3;
  const figures = [
    ['Total Collected', money(r.collected)],
    ['Disbursed to NGOs', money(r.disbursed)],
    ['Platform Fee', '0%'],
  ];
  figures.forEach(([label, value], i) => {
    const x = M + i * (boxW + 10);
    doc.rect(x, y, boxW, 58, [246, 247, 250]);
    doc.rect(x, y, boxW, 2.5, accent);
    doc.text(label.toUpperCase(), x + 12, y + 22, { size: 7.5, bold: true, color: MUTED });
    doc.text(value, x + 12, y + 43, { size: 13, bold: true, color: INK });
  });
  y += 84;

  /* allocation table with bars */
  y = sectionTitle(doc, 'Fund Allocation', y, accent);
  doc.text('CATEGORY', M, y + 2, { size: 7.5, bold: true, color: MUTED });
  doc.text('SHARE', PAGE_W - M, y + 2, { size: 7.5, bold: true, color: MUTED, align: 'right' });
  y += 12;
  doc.line(M, y, PAGE_W - M, y, RULE, 0.8);
  y += 22;

  for (const row of r.allocations) {
    doc.text(row.label, M, y, { size: 10.5, color: INK });
    doc.text(`${row.pct}%`, PAGE_W - M, y, { size: 10.5, bold: true, color: accent, align: 'right' });
    const barY = y + 8;
    const barW = COL - 60;
    doc.rect(M, barY, barW, 6, [238, 239, 245]);
    doc.rect(M, barY, (barW * row.pct) / 100, 6, accent);
    doc.text(money(Math.round((r.disbursed * row.pct) / 100)), M + barW + 8, barY + 6, { size: 7.5, color: MUTED });
    y += 34;
  }

  footer(doc, accent, `ZakatPay ${r.year} Audit - ${r.ref}`, 1, total);

  /* ---- page 2 ---- */
  doc.addPage();
  header(doc, accent, 'Independent Financial & Shariah Audit', r.ref);

  y = sectionTitle(doc, 'Scope & Methodology', 150, accent);
  y = doc.paragraph(r.methodology, M, y, COL, { size: 10.5 });

  y += 16;
  y = sectionTitle(doc, 'Findings', y, accent);
  for (const finding of r.findings) {
    doc.rect(M, y - 7, 5, 5, accent);
    y = doc.paragraph(finding, M + 16, y, COL - 16, { size: 10.5 });
    y += 8;
  }

  y += 12;
  y = sectionTitle(doc, "Auditor's Opinion", y, accent);
  doc.rect(M, y - 12, COL, 74, [246, 247, 250]);
  doc.rect(M, y - 12, 3, 74, accent);
  doc.paragraph(r.opinion, M + 16, y + 8, COL - 32, { size: 10, color: INK });

  y += 96;
  doc.line(M, y, M + 190, y, RULE, 0.8);
  doc.line(PAGE_W - M - 190, y, PAGE_W - M, y, RULE, 0.8);
  doc.text(r.auditor, M, y + 16, { size: 9.5, bold: true, color: INK });
  doc.text('Independent External Auditor', M, y + 30, { size: 8, color: MUTED });
  doc.text('ZakatPay Shariah Board', PAGE_W - M, y + 16, { size: 9.5, bold: true, color: INK, align: 'right' });
  doc.text('Compliance Certification', PAGE_W - M, y + 30, { size: 8, color: MUTED, align: 'right' });

  footer(doc, accent, `ZakatPay ${r.year} Audit - ${r.ref}`, 2, total);
  return doc;
}

/* ------------------------------------------------------------ e-book */

export function buildEbook(b) {
  const doc = new PdfDoc();
  const accent = b.accent;
  const total = b.chapters.length + 2;

  /* ---- cover ---- */
  doc.addPage();
  doc.rect(0, 0, PAGE_W, 470, accent);
  doc.rect(0, 470, PAGE_W, 6, [255, 255, 255]);
  doc.text('ZakatPay', M, 70, { size: 15, bold: true, color: [255, 255, 255] });
  doc.text('DIGITAL PORTAL', M, 86, { size: 7.5, bold: true, color: [255, 255, 255] });

  let ty = 240;
  for (const line of b.titleLines) {
    doc.text(line, M, ty, { size: 33, bold: true, color: [255, 255, 255] });
    ty += 40;
  }
  doc.rect(M, ty + 6, 70, 3, [255, 255, 255]);
  doc.text(b.subtitle, M, ty + 40, { size: 12, color: [255, 255, 255] });

  doc.text(b.author, M, 530, { size: 11, bold: true, color: INK });
  doc.text(b.edition, M, 548, { size: 9, color: MUTED });
  doc.paragraph(b.blurb, M, 590, COL, { size: 10.5, color: MUTED });
  doc.text('Free distribution. Not a substitute for a qualified scholar.', M, 780, { size: 8, color: MUTED });

  /* ---- contents ---- */
  doc.addPage();
  header(doc, accent, b.subtitle, 'CONTENTS');
  let y = sectionTitle(doc, 'Table of Contents', 150, accent);
  y += 8;
  b.chapters.forEach((ch, i) => {
    doc.text(String(i + 1).padStart(2, '0'), M, y, { size: 10, bold: true, color: accent });
    doc.text(ch.title, M + 28, y, { size: 11, color: INK });
    const dotsFrom = M + 34 + textWidth(ch.title, 11, false);
    doc.line(dotsFrom, y - 3, PAGE_W - M - 24, y - 3, RULE, 0.6);
    doc.text(String(i + 3), PAGE_W - M, y, { size: 10, bold: true, color: MUTED, align: 'right' });
    y += 26;
  });
  footer(doc, accent, b.title, 2, total);

  /* ---- chapters ---- */
  b.chapters.forEach((ch, i) => {
    doc.addPage();
    header(doc, accent, b.title, `CHAPTER ${i + 1}`);
    doc.text(`CHAPTER ${String(i + 1).padStart(2, '0')}`, M, 150, { size: 8.5, bold: true, color: accent });
    doc.text(ch.title, M, 178, { size: 22, bold: true, color: INK });
    doc.line(M, 196, M + 60, 196, accent, 2.5);

    let cy = 232;
    for (const para of ch.body) {
      cy = doc.paragraph(para, M, cy, COL, { size: 10.5, color: [55, 57, 68] });
      cy += 12;
    }

    if (ch.note) {
      doc.rect(M, cy + 4, COL, 62, [246, 247, 250]);
      doc.rect(M, cy + 4, 3, 62, accent);
      doc.text('NOTE', M + 16, cy + 26, { size: 7.5, bold: true, color: accent });
      doc.paragraph(ch.note, M + 16, cy + 44, COL - 32, { size: 9.5, color: INK });
    }

    footer(doc, accent, b.title, i + 3, total);
  });

  return doc;
}
