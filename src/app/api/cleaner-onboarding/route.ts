import { NextResponse } from "next/server";

import {
  sanitizeCleanerOnboardingForm,
  type CleanerOnboardingFormData,
  validateCleanerOnboardingForm,
} from "@/lib/cleaner-onboarding";
import { appendCleanerOnboardingRow } from "@/lib/google-sheets";
import { sendCleanerThankYouEmail } from "@/lib/mailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body." },
      { status: 400 },
    );
  }

  const candidate = body as Partial<CleanerOnboardingFormData> & {
    description?: string;
    services?: string[];
  } | null;

  const sanitized = sanitizeCleanerOnboardingForm({
    fullName: candidate?.fullName ?? "",
    email: candidate?.email ?? "",
    contactNumber: candidate?.contactNumber ?? "",
    city: candidate?.city ?? "London",
    postcode: candidate?.postcode ?? "",
  });
  const description = typeof candidate?.description === "string"
    ? candidate.description.trim()
    : "";

  const services = Array.isArray(candidate?.services)
    ? candidate.services.filter((s) => typeof s === "string")
    : [];

  const errors = validateCleanerOnboardingForm(sanitized);

  if (Object.keys(errors).length > 0) {
    return NextResponse.json(
      {
        message: "Please correct the highlighted fields and try again.",
        errors,
      },
      { status: 400 },
    );
  }

  try {
    await appendCleanerOnboardingRow(sanitized, description, services);
    await sendCleanerThankYouEmail(sanitized);

    return NextResponse.json({
      message:
        "Thank you. Your details have been submitted and a confirmation email is on the way.",
    });
  } catch (error) {
    console.error("Cleaner onboarding submission failed", error);

    return NextResponse.json(
      {
        message:
          "We couldn't process your submission right now. Please try again shortly.",
      },
      { status: 500 },
    );
  }
}
