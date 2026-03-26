import "server-only";

import { google } from "googleapis";

import type { CleanerOnboardingFormData } from "@/lib/cleaner-onboarding";

type GoogleServiceAccount = {
  project_id?: string;
  client_email: string;
  private_key: string;
};

function getRequiredEnv(
  name:
    | "GOOGLE_SHEET_ID"
    | "GOOGLE_SHEET_NAME"
    | "GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL"
    | "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY"
    | "GOOGLE_SERVICE_ACCOUNT_PROJECT_ID",
) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured.`);
  }

  return value;
}

function loadGoogleServiceAccount(): GoogleServiceAccount {
  return {
    project_id: getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_PROJECT_ID"),
    client_email: getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_CLIENT_EMAIL"),
    private_key: getRequiredEnv("GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY").replace(
      /\\n/g,
      "\n",
    ),
  };
}

export async function appendCleanerOnboardingRow(
  submission: CleanerOnboardingFormData,
) {
  const credentials = loadGoogleServiceAccount();
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
