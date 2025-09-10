import nodemailer from 'nodemailer';

export type MailParams = {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
};

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error('Missing SMTP configuration (SMTP_HOST/SMTP_USER/SMTP_PASS)');
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmail({ to, subject, html, text }: MailParams) {
  const from = process.env.MAIL_FROM || process.env.SMTP_FROM || 'no-reply@example.com';
  const transport = getTransport();
  await transport.sendMail({ from, to, subject, text, html });
}
