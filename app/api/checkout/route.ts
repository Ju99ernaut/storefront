import { NextRequest, NextResponse } from "next/server";
import {
  API_CONFIG,
  generateViaApi,
  sendRenderedEmailWithAttachments,
  OrderTemplateData,
} from "../../../utils/documentEmailService";

interface CheckoutRequestBody {
  customer?: {
    name?: string;
    email?: string;
    address?: string;
  };
  payment?: {
    cardholderName?: string;
    cardNumber?: string;
    expiry?: string;
  };
  items?: Array<{
    id: string;
    title: string;
    brand: string;
    category: string;
    subcategory: string;
    price: number;
    quantity: number;
  }>;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as CheckoutRequestBody;
    const { customer, items, payment } = body || {};

    if (!customer?.email || !customer?.name) {
      return NextResponse.json(
        { error: "Customer name and email address are required." },
        { status: 400 },
      );
    }

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cannot checkout with an empty cart." },
        { status: 400 },
      );
    }

    const timestamp = new Date().toISOString();
    const shortId = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${shortId}`;
    const invoiceNumber = `INV-${shortId}`;
    const receiptNumber = `RCP-${shortId}`;

    const lineItems = items.map((item) => {
      const unitPrice = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return {
        id: item.id,
        title: item.title,
        brand: item.brand,
        category: item.category,
        subcategory: item.subcategory,
        quantity,
        unitPrice,
        lineTotal: Number((unitPrice * quantity).toFixed(2)),
      };
    });

    const subTotal = Number(
      lineItems.reduce((acc, item) => acc + item.lineTotal, 0).toFixed(2),
    );
    const taxRate = 0.08;
    const tax = Number((subTotal * taxRate).toFixed(2));
    const shipping = 0;
    const grandTotal = Number((subTotal + tax + shipping).toFixed(2));

    const cardLast4 = payment?.cardNumber
      ? String(payment.cardNumber).replace(/\D/g, "").slice(-4) || "4242"
      : "4242";

    const sharedTemplateData: OrderTemplateData = {
      orderId,
      invoiceNumber,
      receiptNumber,
      issuedAt: timestamp,
      currency: "USD",
      customer: {
        name: customer.name,
        email: customer.email,
        address: customer.address || "",
      },
      paymentSummary: {
        method: "Credit Card",
        cardLast4,
        status: "PAID",
        paidAt: timestamp,
      },
      items: lineItems,
      totals: {
        subTotal,
        tax,
        shipping,
        grandTotal,
      },
    };

    const subject = `Your Storefront Order ${orderId} — Invoice & Receipt`;

    const [invoicePdf, receiptPdf, renderedEmail] = await Promise.all([
      generateViaApi({
        templateId: API_CONFIG.templates.invoicePdf,
        formats: ["pdf"],
        filename: `Invoice-${invoiceNumber}.pdf`,
        data: {
          documentType: "INVOICE",
          ...sharedTemplateData,
        },
      }),
      generateViaApi({
        templateId: API_CONFIG.templates.receiptPdf,
        formats: ["pdf"],
        filename: `Receipt-${receiptNumber}.pdf`,
        data: {
          documentType: "RECEIPT",
          ...sharedTemplateData,
        },
      }),
      generateViaApi({
        templateId: API_CONFIG.templates.receiptEmail,
        formats: ["html"],
        data: {
          documentType: "EMAIL",
          subject,
          ...sharedTemplateData,
        },
      }),
    ]);

    const emailResult = await sendRenderedEmailWithAttachments({
      to: customer.email,
      subject,
      renderedEmail,
      attachments: [invoicePdf, receiptPdf],
    });

    return NextResponse.json({
      success: true,
      order: {
        orderId,
        invoiceNumber,
        receiptNumber,
        issuedAt: timestamp,
        customer: sharedTemplateData.customer,
        paymentSummary: sharedTemplateData.paymentSummary,
        items: lineItems,
        totals: sharedTemplateData.totals,
      },
      documents: {
        invoice: {
          filename: invoicePdf.filename,
          templateId: invoicePdf.templateId,
          pdf: invoicePdf.pdf,
          payloadSent: invoicePdf.payloadSent,
        },
        receipt: {
          filename: receiptPdf.filename,
          templateId: receiptPdf.templateId,
          pdf: receiptPdf.pdf,
          payloadSent: receiptPdf.payloadSent,
        },
      },
      email: {
        status: emailResult.status,
        messageId: emailResult.messageId,
        to: emailResult.to,
        subject: emailResult.subject,
        previewUrl: emailResult.previewUrl,
        templateId: emailResult.templateId,
        attachmentsCount: emailResult.attachmentsCount,
        attachments: emailResult.attachments,
        renderedHtml: emailResult.renderedHtml,
        html: renderedEmail.html,
        payloadSent: emailResult.payloadSent,
      },
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred during checkout.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
