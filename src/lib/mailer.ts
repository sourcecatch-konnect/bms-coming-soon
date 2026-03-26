import "server-only";

import nodemailer from "nodemailer";

import type { CleanerOnboardingFormData } from "@/lib/cleaner-onboarding";
import { getCleanerThankYouEmail } from "@/lib/email-templates";

function getRequiredEnv(
  name:
    | "SMTP_HOST"
    | "SMTP_PORT"
    | "SMTP_USER"
    | "SMTP_PASS"
    | "MAIL_FROM",
) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function createTransporter() {
  const port = Number(getRequiredEnv("SMTP_PORT"));

  if (Number.isNaN(port)) {
    throw new Error("SMTP_PORT must be a valid number.");
  }

  return nodemailer.createTransport({
    host: getRequiredEnv("SMTP_HOST"),
    port,
    secure: port === 465,
    auth: {
      user: getRequiredEnv("SMTP_USER"),
      pass: getRequiredEnv("SMTP_PASS"),
    },
  });
}

export async function sendCleanerThankYouEmail(
  submission: CleanerOnboardingFormData,
) {
  const transporter = createTransporter();
  const template = getCleanerThankYouEmail(submission);

  await transporter.sendMail({
    from: getRequiredEnv("MAIL_FROM"),
    to: submission.email,
    subject: template.subject,
    html: template.html,
    text: template.text,
  });
}
