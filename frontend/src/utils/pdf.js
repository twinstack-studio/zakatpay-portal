/**
 * Minimal dependency-free PDF writer.
 *
 * Everything is kept in the Latin-1 range so that `string.length` equals the
 * byte length - the xref table stores byte offsets, and they would be wrong the
 * moment a multi-byte character crept in.
 *
 * Coordinates passed to the drawing helpers are TOP-LEFT based (like the DOM);
 * they are flipped to PDF's bottom-left origin internally.
 */

const A4 = { w: 595.28, h: 841.89 };

// Approximate Helvetica advance widths (fraction of font size). Good enough for
// line wrapping; PDF viewers do the real layout from the font metrics.
const WIDTHS = {
  ' ': 0.278, '.': 0.278, ',': 0.278, ':': 0.278, ';': 0.278, '!': 0.278, '|': 0.26,
  'i': 0.222, 'j': 0.222, 'l': 0.222, 'I': 0.278, "'": 0.191, '(': 0.333, ')': 0.333,
  'f': 0.278, 't': 0.278, 'r': 0.333, '-': 0.333, '/': 0.278, '"': 0.355,
  'm': 0.833, 'w': 0.722, 'W': 0.944, 'M': 0.833, '%': 0.889, '@': 1.015,
};
const DEFAULT_W = 0.556;

function charWidth(ch) {
  if (WIDTHS[ch] !== undefined) return WIDTHS[ch];
  if (ch >= 'A' && ch <= 'Z') return 0.667;
  if (ch >= '0' && ch <= '9') return 0.556;
  return DEFAULT_W;
}

export function textWidth(str, size, bold) {
  let w = 0;
  for (const ch of str) w += charWidth(ch);
  return w * size * (bold ? 1.06 : 1);
}

// Typographic characters authors actually type that Latin-1 cannot hold.
// Without this they would simply vanish ("organisations’ own" -> "organisations own").
const TRANSLITERATE = {
  '‘': "'", '’': "'", '‚': ',', '‛': "'",
  '“': '"', '”': '"', '„': '"',
  '–': '-', '—': '-', '−': '-', '‐': '-', '‑': '-',
  '…': '...', '•': '-', ' ': ' ', ' ': ' ', ' ': ' ',
  '‹': '<', '›': '>', '″': '"', '′': "'",
};

const TRANSLITERATE_RE = new RegExp(`[${Object.keys(TRANSLITERATE).join('')}]`, 'g');

/** Latin-1 only: transliterate what we can, drop what we cannot represent. */
function latin1(str) {
  return String(str)
    .replace(TRANSLITERATE_RE, (ch) => TRANSLITERATE[ch])
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, '');
}

/** Escape the three characters that are special inside a PDF string literal. */
function esc(str) {
  return latin1(str).replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

const hex = (c) => (Math.max(0, Math.min(255, c)) / 255).toFixed(3);
const rgb = ([r, g, b]) => `${hex(r)} ${hex(g)} ${hex(b)}`;

export class PdfDoc {
  constructor(opts = {}) {
    this.size = opts.size || A4;
    this.pages = [];
    this.page = null;
  }

  addPage() {
    this.page = { ops: [] };
    this.pages.push(this.page);
    return this;
  }

  /** Filled rectangle. x/y are top-left. */
  rect(x, y, w, h, color) {
    this.page.ops.push(`${rgb(color)} rg ${x.toFixed(2)} ${(this.size.h - y - h).toFixed(2)} ${w.toFixed(2)} ${h.toFixed(2)} re f`);
    return this;
  }

  line(x1, y1, x2, y2, color, width = 1) {
    this.page.ops.push(
      `${rgb(color)} RG ${width} w ${x1.toFixed(2)} ${(this.size.h - y1).toFixed(2)} m ${x2.toFixed(2)} ${(this.size.h - y2).toFixed(2)} l S`
    );
    return this;
  }

  /** Single line of text. y is the text baseline, measured from the top. */
  text(str, x, y, { size = 11, bold = false, color = [20, 20, 25], align = 'left', width = 0 } = {}) {
    let tx = x;
    if (align === 'right') tx = x - textWidth(str, size, bold);
    else if (align === 'center') tx = x + (width - textWidth(str, size, bold)) / 2;
    this.page.ops.push(
      `BT /${bold ? 'F2' : 'F1'} ${size} Tf ${rgb(color)} rg ${tx.toFixed(2)} ${(this.size.h - y).toFixed(2)} Td (${esc(str)}) Tj ET`
    );
    return this;
  }

  /** Word-wrapped paragraph. Returns the y position just below the last line. */
  paragraph(str, x, y, maxWidth, { size = 11, bold = false, color = [60, 60, 70], leading = 1.55 } = {}) {
    const words = latin1(str).split(/\s+/).filter(Boolean);
    const step = size * leading;
    let line = '';
    let cy = y;
    for (const word of words) {
      const probe = line ? `${line} ${word}` : word;
      if (textWidth(probe, size, bold) > maxWidth && line) {
        this.text(line, x, cy, { size, bold, color });
        cy += step;
        line = word;
      } else {
        line = probe;
      }
    }
    if (line) {
      this.text(line, x, cy, { size, bold, color });
      cy += step;
    }
    return cy;
  }

  build() {
    const objects = [];
    const add = (body) => { objects.push(body); return objects.length; }; // 1-based id

    const catalogId = add(null);      // placeholder, filled below
    const pagesId = add(null);
    const fontId = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>');
    const fontBoldId = add('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>');

    const pageIds = [];
    for (const page of this.pages) {
      const stream = page.ops.join('\n');
      const contentId = add(`<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`);
      const pageId = add(
        `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${this.size.w.toFixed(2)} ${this.size.h.toFixed(2)}] ` +
        `/Resources << /Font << /F1 ${fontId} 0 R /F2 ${fontBoldId} 0 R >> >> /Contents ${contentId} 0 R >>`
      );
      pageIds.push(pageId);
    }

    objects[catalogId - 1] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;
    objects[pagesId - 1] =
      `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${pageIds.length} >>`;

    let pdf = '%PDF-1.4\n';
    const offsets = [];
    objects.forEach((body, i) => {
      offsets.push(pdf.length);
      pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
    });

    const startxref = pdf.length;
    pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
    for (const off of offsets) pdf += `${String(off).padStart(10, '0')} 00000 n \n`;
    pdf += `trailer\n<< /Size ${objects.length + 1} /Root ${catalogId} 0 R >>\nstartxref\n${startxref}\n%%EOF`;

    const bytes = new Uint8Array(pdf.length);
    for (let i = 0; i < pdf.length; i++) bytes[i] = pdf.charCodeAt(i) & 0xff;
    return bytes;
  }
}

/** Trigger a browser download for the built document. */
export function downloadPdf(doc, fileName) {
  const blob = new Blob([doc.build()], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Revoke on the next tick so the download has definitely started.
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}
