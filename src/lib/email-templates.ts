import "server-only";

import type { CleanerOnboardingFormData } from "@/lib/cleaner-onboarding";

function buildLogoUrl() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return null;
  }

  try {
    return new URL("/logo2.png", siteUrl).toString();
  } catch {
    return null;
  }
}

export function getCleanerThankYouEmail(
  submission: CleanerOnboardingFormData,
) {
  const logoUrl = buildLogoUrl();
  const subject = "Thank you for joining Book My Services";
  const previewText =
    "We have received your cleaner onboarding details and will be in touch soon.";

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin:0;padding:0;background:#f7f7fb;color:#2b2b2b;font-family:Inter,Arial,sans-serif;">
        <div style="padding:32px 16px;">
          <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid rgba(236,29,141,0.12);border-radius:24px;overflow:hidden;box-shadow:0 18px 44px rgba(43,43,43,0.08);">
            <div style="padding:32px;background:linear-gradient(180deg,rgba(236,29,141,0.1),rgba(255,255,255,0));border-bottom:1px solid rgba(236,29,141,0.08);">
              ${
                logoUrl
                  ? `<img src="${logoUrl}" alt="Book My Services" width="220" style="display:block;max-width:100%;height:auto;margin-bottom:20px;" />`
                  : `<div style="font-size:24px;font-weight:800;color:#2b2b2b;margin-bottom:20px;">Book My Services</div>`
              }
              <div style="display:inline-block;padding:8px 14px;border-radius:999px;background:rgba(236,29,141,0.08);border:1px solid rgba(236,29,141,0.18);color:#ec1d8d;font-size:13px;font-weight:700;">
                Cleaner onboarding received
              </div>
              <h1 style="margin:20px 0 12px;font-size:30px;line-height:1.15;color:#2b2b2b;">
                Thank you, ${submission.fullName}.
              </h1>
              <p style="margin:0;font-size:16px;line-height:1.7;color:#5b6472;">
                We have received your cleaner onboarding details for <strong style="color:#2b2b2b;">${submission.city}</strong>. Our team will review your information and follow up with you soon.
              </p>
            </div>
            <div style="padding:28px 32px 12px;">
              <div style="border:1px solid rgba(43,43,43,0.08);border-radius:18px;padding:20px 22px;background:#fcfcfd;">
                <div style="font-size:14px;font-weight:700;color:#2b2b2b;margin-bottom:14px;">Submitted details</div>
                <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#5b6472;"><strong style="color:#2b2b2b;">Email:</strong> ${submission.email}</p>
                <p style="margin:0 0 10px;font-size:14px;line-height:1.6;color:#5b6472;"><strong style="color:#2b2b2b;">Contact number:</strong> ${submission.contactNumber}</p>
                <p style="margin:0;font-size:14px;line-height:1.6;color:#5b6472;"><strong style="color:#2b2b2b;">Postcode:</strong> ${submission.postcode}</p>
              </div>
              <p style="margin:22px 0 0;font-size:15px;line-height:1.75;color:#5b6472;">
                If you need to update any of these details, reply to this email or contact the Book My Services team.
              </p>
            </div>
            <div style="padding:20px 32px 32px;font-size:13px;line-height:1.7;color:#7b8190;">
              Book My Services Ltd.<br />
              London home services platform
            </div>
          </div>
          <div style="max-width:640px;margin:14px auto 0;padding:0 4px;font-size:12px;color:#9aa1ad;text-align:center;">
            ${previewText}
          </div>
        </div>
      </body>
    </html>
  `;

  const text = [
    "Book My Services",
    "",
    `Thank you, ${submission.fullName}.`,
    "",
    `We have received your cleaner onboarding details for ${submission.city}.`,
    "Our team will review your information and follow up with you soon.",
    "",
    `Email: ${submission.email}`,
    `Contact number: ${submission.contactNumber}`,
    `Postcode: ${submission.postcode}`,
  ].join("\n");

  return { subject, html, text };
}
