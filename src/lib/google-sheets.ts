import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { google } from "googleapis";

import type { CleanerOnboardingFormData } from "@/lib/cleaner-onboarding";

type GoogleServiceAccount = {
  client_email: string;
  private_key: string;
};

function getRequiredEnv(name: "GOOGLE_SHEET_ID" | "GOOGLE_SHEET_NAME") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

async function loadGoogleServiceAccount() {
  const credentialsPath = path.join(
    process.cwd(),
    "book-my-services-1-1e06d1691a38.json",
  );
  const rawCredentials = await readFile(credentialsPath, "utf8");

  return JSON.parse(rawCredentials) as GoogleServiceAccount;
}

export async function appendCleanerOnboardingRow(
  submission: CleanerOnboardingFormData,
) {
  const credentials = await loadGoogleServiceAccount();
  const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const spreadsheetId = getRequiredEnv("GOOGLE_SHEET_ID");
  const sheetName = getRequiredEnv("GOOGLE_SHEET_NAME");

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:F`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toISOString(),
          submission.fullName,
          submission.email,
          submission.contactNumber,
          submission.city,
          submission.postcode,
        ],
      ],
    },
  });
}
