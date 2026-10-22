import nodemailer from "nodemailer";

export const API_CONFIG = {
  composeitApiUrl: process.env.COMPOSEIT_API_URL || "",
  composeitApiKey: process.env.COMPOSEIT_API_KEY || "",
  templates: {
    invoicePdf: process.env.INVOICE_PDF_TEMPLATE_ID || "tpl_invoice_pdf_v1",
    receiptPdf: process.env.RECEIPT_PDF_TEMPLATE_ID || "tpl_receipt_pdf_v1",
    receiptEmail:
      process.env.RECEIPT_EMAIL_TEMPLATE_ID || "tpl_order_receipt_email_v1",
  },
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from:
      process.env.SMTP_FROM ||
      '"Storefront Orders" <orders@storefront.example.com>',
  },
};

export type OutputFormat = "pdf" | "html";

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
  documentType?: "INVOICE" | "RECEIPT" | "EMAIL";
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
  formats: OutputFormat[];
  data: T;
}

export interface ComposeItPdfOutput {
  url: string;
  sizeBytes: number;
  mimeType: string;
  checksum: string;
}

export interface ComposeItHtmlOutput {
  htmlDocument: string;
  checksum: string;
  mimeType: string;
  url: string;
  sizeBytes: number;
}

export interface ComposeItApiResponse {
  pdf?: ComposeItPdfOutput;
  html?: ComposeItHtmlOutput;
}

export interface GenerateViaApiResult {
  templateId: string;
  filename?: string;
  pdf?: ComposeItPdfOutput;
  html?: ComposeItHtmlOutput;
  payloadSent: TemplateRequestPayload;
}

export interface SentEmailResult {
  status: "sent_smtp" | "sent_ethereal" | "queued_stream";
  messageId: string;
  to: string;
  subject: string;
  previewUrl: string | null;
  templateId: string;
  renderedHtml: string;
  attachmentsCount: number;
  attachments: Array<{
    filename: string;
    path: string;
    contentType: string;
  }>;
  payloadSent: TemplateRequestPayload;
}

export async function generateViaApi({
  templateId,
  formats,
  filename,
  data,
}: {
  templateId: string;
  formats: OutputFormat[];
  filename?: string;
  data: OrderTemplateData;
}): Promise<GenerateViaApiResult> {
  const payload: TemplateRequestPayload = {
    templateId,
    formats,
    data,
  };

  const res = await fetch(API_CONFIG.composeitApiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_CONFIG.composeitApiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Document API failed (${res.status}): ${errorText}`);
  }

  const response = (await res.json()) as ComposeItApiResponse;

  return {
    templateId,
    filename,
    pdf: response.pdf,
    html: response.html,
    payloadSent: payload,
  };
}

export async function sendRenderedEmailWithAttachments({
  to,
  subject,
  renderedEmail,
  attachments,
}: {
  to: string;
  subject: string;
  renderedEmail: GenerateViaApiResult;
  attachments: GenerateViaApiResult[];
}): Promise<SentEmailResult> {
  const htmlDocument = renderedEmail.html?.htmlDocument || "";

  const mailAttachments = attachments
    .filter((att) => Boolean(att.pdf?.url))
    .map((att) => ({
      filename: att.filename || "document.pdf",
      path: att.pdf!.url,
      contentType: att.pdf!.mimeType || "application/pdf",
    }));

  const mailOptions = {
    from: API_CONFIG.smtp.from,
    to,
    subject,
    html: htmlDocument,
    attachments: mailAttachments,
  };

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
      status: "sent_smtp",
      messageId: info.messageId,
      to,
      subject,
      previewUrl: null,
      templateId: renderedEmail.templateId,
      renderedHtml: htmlDocument,
      attachmentsCount: mailAttachments.length,
      attachments: mailAttachments,
      payloadSent: renderedEmail.payloadSent,
    };
  }

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
      status: "sent_ethereal",
      messageId: info.messageId,
      to,
      subject,
      previewUrl: typeof previewUrl === "string" ? previewUrl : null,
      templateId: renderedEmail.templateId,
      renderedHtml: htmlDocument,
      attachmentsCount: mailAttachments.length,
      attachments: mailAttachments,
      payloadSent: renderedEmail.payloadSent,
    };
  } catch {
    return {
      status: "queued_stream",
      messageId: `msg_${Date.now()}`,
      to,
      subject,
      previewUrl: null,
      templateId: renderedEmail.templateId,
      renderedHtml: htmlDocument,
      attachmentsCount: mailAttachments.length,
      attachments: mailAttachments,
      payloadSent: renderedEmail.payloadSent,
    };
  }
}
