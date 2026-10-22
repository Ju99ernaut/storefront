import nodemailer from 'nodemailer';

/**
 * Configuration for external template-based PDF & Email HTML generation APIs,
 * plus SMTP configuration for sending the rendered HTML email with PDF attachments.
 */
export const API_CONFIG = {
  pdfApiUrl: process.env.PDF_API_URL || '',
  pdfApiKey: process.env.PDF_API_KEY || '',
  emailTemplateApiUrl:
    process.env.EMAIL_TEMPLATE_API_URL || process.env.EMAIL_API_URL || '',
  emailTemplateApiKey:
    process.env.EMAIL_TEMPLATE_API_KEY || process.env.EMAIL_API_KEY || '',
  templates: {
    invoicePdf: process.env.INVOICE_PDF_TEMPLATE_ID || 'tpl_invoice_pdf_v1',
    receiptPdf: process.env.RECEIPT_PDF_TEMPLATE_ID || 'tpl_receipt_pdf_v1',
    receiptEmail:
      process.env.RECEIPT_EMAIL_TEMPLATE_ID || 'tpl_order_receipt_email_v1',
  },
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || '"Storefront Orders" <orders@storefront.example.com>',
  },
};

export interface OrderLineItemData {
  id: string;
  title: string;
  brand: string;
  category: string;
  subcategory: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface OrderTemplateData {
  documentType?: 'INVOICE' | 'RECEIPT' | 'EMAIL';
  subject?: string;
  orderId: string;
  invoiceNumber: string;
  receiptNumber: string;
  issuedAt: string;
  currency: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  paymentSummary: {
    method: string;
    cardLast4: string;
    status: string;
    paidAt: string;
  };
  items: OrderLineItemData[];
  totals: {
    subTotal: number;
    tax: number;
    shipping: number;
    grandTotal: number;
  };
}

export interface TemplateRequestPayload<T = OrderTemplateData> {
  templateId: string;
  data: T;
  options?: {
    format?: string;
    filename?: string;
  };
}

export interface GeneratedPdfAttachment {
  filename: string;
  contentType: string;
  templateId: string;
  documentId: string;
  contentBuffer: Buffer;
  contentBase64: string;
  payloadSent: TemplateRequestPayload;
  mode: 'live' | 'dummy';
}

export interface RenderedEmailTemplateResult {
  templateId: string;
  html: string;
  payloadSent: TemplateRequestPayload;
  mode: 'live' | 'dummy';
}

export interface SentEmailResult {
  status: 'sent_smtp' | 'sent_ethereal' | 'queued_stream';
  messageId: string;
  to: string;
  subject: string;
  previewUrl: string | null;
  templateId: string;
  renderedHtml: string;
  attachmentsCount: number;
  attachmentFilenames: string[];
  payloadSent: TemplateRequestPayload;
  mode: 'live' | 'dummy';
}

/**
 * Helper to create a minimal valid PDF buffer in dummy/dev mode when PDF_API_URL is not yet configured.
 */
function createMinimalPdfBuffer(title: string, data: OrderTemplateData): Buffer {
  const safeText = `${title} | Order ${data.orderId} | Customer: ${data.customer.name} | Total: $${data.totals.grandTotal.toFixed(2)}`;
  const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length ${safeText.length + 35} >>
stream
BT
/F1 12 Tf
50 720 Td
(${safeText.replace(/[()\\]/g, '')}) Tj
ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000229 00000 n 
0000000297 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
385
%%EOF`;
  return Buffer.from(pdfContent, 'utf-8');
}

/**
 * Generates a PDF document (Invoice or Receipt) by POSTing { templateId, data }
 * to the configured PDF generation API endpoint.
 */
export async function generatePdfViaApi({
  templateId,
  filename,
  data,
}: {
  templateId: string;
  filename: string;
  data: OrderTemplateData;
}): Promise<GeneratedPdfAttachment> {
  const payload: TemplateRequestPayload = {
    templateId,
    data,
    options: {
      format: 'A4',
      filename,
    },
  };

  if (API_CONFIG.pdfApiUrl) {
    const response = await fetch(API_CONFIG.pdfApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(API_CONFIG.pdfApiKey
          ? { Authorization: `Bearer ${API_CONFIG.pdfApiKey}` }
          : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`PDF generation failed (${response.status}): ${errorText}`);
    }

    const contentTypeHeader = response.headers.get('content-type') || '';
    let contentBuffer: Buffer;
    let documentId = `doc_${Date.now()}`;

    if (contentTypeHeader.includes('application/pdf')) {
      const arrayBuf = await response.arrayBuffer();
      contentBuffer = Buffer.from(arrayBuf);
    } else {
      const result = await response.json();
      documentId = result.documentId || result.id || documentId;
      const base64Str = result.contentBase64 || result.content || result.pdf || '';
      contentBuffer = base64Str
        ? Buffer.from(base64Str, 'base64')
        : createMinimalPdfBuffer(filename, data);
    }

    return {
      filename,
      contentType: 'application/pdf',
      templateId,
      documentId,
      contentBuffer,
      contentBase64: contentBuffer.toString('base64'),
      payloadSent: payload,
      mode: 'live',
    };
  }

  // Dummy fallback when PDF_API_URL is not yet configured
  const contentBuffer = createMinimalPdfBuffer(filename, data);
  return {
    filename,
    contentType: 'application/pdf',
    templateId,
    documentId: `dummy_pdf_${templateId}_${Date.now()}`,
    contentBuffer,
    contentBase64: contentBuffer.toString('base64'),
    payloadSent: payload,
    mode: 'dummy',
  };
}

/**
 * Calls the Email Template API by POSTing { templateId, data }.
 * The API request simply responds with the rendered HTML string.
 */
export async function renderEmailHtmlViaApi({
  templateId,
  data,
}: {
  templateId: string;
  data: OrderTemplateData;
}): Promise<RenderedEmailTemplateResult> {
  const payload: TemplateRequestPayload = {
    templateId,
    data,
  };

  if (API_CONFIG.emailTemplateApiUrl) {
    const response = await fetch(API_CONFIG.emailTemplateApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/html, application/json',
        ...(API_CONFIG.emailTemplateApiKey
          ? { Authorization: `Bearer ${API_CONFIG.emailTemplateApiKey}` }
          : {}),
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Email template API failed (${response.status}): ${errorText}`
      );
    }

    // The API responds directly with the rendered HTML (or JSON { html } if wrapped)
    const rawBody = await response.text();
    let html = rawBody;
    if (rawBody.trim().startsWith('{')) {
      try {
        const parsed = JSON.parse(rawBody);
        if (typeof parsed.html === 'string') {
          html = parsed.html;
        }
      } catch {
        // Keep rawBody as HTML
      }
    }

    return {
      templateId,
      html,
      payloadSent: payload,
      mode: 'live',
    };
  }

  // Dummy fallback HTML when EMAIL_TEMPLATE_API_URL / EMAIL_API_URL is not yet configured
  const rowsHtml = data.items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px 0;border-bottom:1px solid #eee;">${item.title} (${item.brand})</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:center;">${item.quantity}</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;text-align:right;">$${item.lineTotal.toFixed(2)}</td>
      </tr>`
    )
    .join('');

  const fallbackHtml = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><title>Order Receipt ${data.orderId}</title></head>
<body style="font-family:Helvetica,Arial,sans-serif;color:#222;max-width:600px;margin:0 auto;padding:24px;">
  <h2 style="color:#5c5edc;margin-bottom:4px;">Thank you for your order, ${data.customer.name}!</h2>
  <p style="color:#555;margin-top:0;">Order <strong>${data.orderId}</strong> &bull; Paid via card ending in ${data.paymentSummary.cardLast4}</p>
  <p>Please find your official <strong>Invoice (${data.invoiceNumber})</strong> and <strong>Receipt (${data.receiptNumber})</strong> attached to this email as PDF files.</p>
  <table style="width:100%;border-collapse:collapse;margin:16px 0;">
    <thead>
      <tr>
        <th style="text-align:left;border-bottom:2px solid #5c5edc;padding-bottom:6px;">Item</th>
        <th style="text-align:center;border-bottom:2px solid #5c5edc;padding-bottom:6px;">Qty</th>
        <th style="text-align:right;border-bottom:2px solid #5c5edc;padding-bottom:6px;">Total</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>
  <p style="text-align:right;font-size:16px;">
    Subtotal: $${data.totals.subTotal.toFixed(2)}<br/>
    Tax: $${data.totals.tax.toFixed(2)}<br/>
    <strong>Total Paid: $${data.totals.grandTotal.toFixed(2)}</strong>
  </p>
</body>
</html>`;

  return {
    templateId,
    html: fallbackHtml,
    payloadSent: payload,
    mode: 'dummy',
  };
}

/**
 * Sends the rendered HTML email along with the generated Invoice & Receipt PDF attachments
 * via Nodemailer (using configured SMTP, Ethereal test account, or local stream fallback).
 */
export async function sendRenderedEmailWithAttachments({
  to,
  subject,
  renderedEmail,
  attachments,
}: {
  to: string;
  subject: string;
  renderedEmail: RenderedEmailTemplateResult;
  attachments: GeneratedPdfAttachment[];
}): Promise<SentEmailResult> {
  const mailAttachments = attachments.map((att) => ({
    filename: att.filename,
    content: att.contentBuffer,
    contentType: att.contentType,
  }));

  const mailOptions = {
    from: API_CONFIG.smtp.from,
    to,
    subject,
    html: renderedEmail.html,
    attachments: mailAttachments,
  };

  // 1. If explicit SMTP host is configured, dispatch via SMTP
  if (API_CONFIG.smtp.host) {
    const transporter = nodemailer.createTransport({
      host: API_CONFIG.smtp.host,
      port: API_CONFIG.smtp.port,
      secure: API_CONFIG.smtp.secure,
      auth:
        API_CONFIG.smtp.user && API_CONFIG.smtp.pass
          ? {
              user: API_CONFIG.smtp.user,
              pass: API_CONFIG.smtp.pass,
            }
          : undefined,
    });

    const info = await transporter.sendMail(mailOptions);
    return {
      status: 'sent_smtp',
      messageId: info.messageId,
      to,
      subject,
      previewUrl: null,
      templateId: renderedEmail.templateId,
      renderedHtml: renderedEmail.html,
      attachmentsCount: attachments.length,
      attachmentFilenames: attachments.map((a) => a.filename),
      payloadSent: renderedEmail.payloadSent,
      mode: renderedEmail.mode,
    };
  }

  // 2. Otherwise try Ethereal test SMTP account, falling back to streamTransport if offline
  try {
    const testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
      host: testAccount.smtp.host,
      port: testAccount.smtp.port,
      secure: testAccount.smtp.secure,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    const info = await transporter.sendMail(mailOptions);
    const previewUrl = nodemailer.getTestMessageUrl(info) || null;

    return {
      status: 'sent_ethereal',
      messageId: info.messageId,
      to,
      subject,
      previewUrl: typeof previewUrl === 'string' ? previewUrl : null,
      templateId: renderedEmail.templateId,
      renderedHtml: renderedEmail.html,
      attachmentsCount: attachments.length,
      attachmentFilenames: attachments.map((a) => a.filename),
      payloadSent: renderedEmail.payloadSent,
      mode: renderedEmail.mode,
    };
  } catch {
    // Stream transport fallback when running in an offline/sandboxed environment
    const fallbackTransporter = nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true,
    });
    const info = await fallbackTransporter.sendMail(mailOptions);

    return {
      status: 'queued_stream',
      messageId: info.messageId || `msg_${Date.now()}`,
      to,
      subject,
      previewUrl: null,
      templateId: renderedEmail.templateId,
      renderedHtml: renderedEmail.html,
      attachmentsCount: attachments.length,
      attachmentFilenames: attachments.map((a) => a.filename),
      payloadSent: renderedEmail.payloadSent,
      mode: renderedEmail.mode,
    };
  }
}
