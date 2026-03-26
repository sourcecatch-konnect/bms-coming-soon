"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";

import {
  CLEANER_CITY,
  initialCleanerOnboardingForm,
  sanitizeCleanerOnboardingForm,
  type CleanerOnboardingErrors,
  type CleanerOnboardingFormData,
  validateCleanerOnboardingForm,
} from "@/lib/cleaner-onboarding";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PhoneInput } from "@/components/PhoneInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SubmissionState =
  | { kind: "idle" }
  | { kind: "success"; message: string }
  | { kind: "error"; message: string };

export function CleanerOnboardingForm() {
  const [form, setForm] = useState<CleanerOnboardingFormData>(
    initialCleanerOnboardingForm,
  );
  const [errors, setErrors] = useState<CleanerOnboardingErrors>({});
  const [status, setStatus] = useState<SubmissionState>({ kind: "idle" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = <K extends keyof CleanerOnboardingFormData>(
    field: K,
    value: CleanerOnboardingFormData[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setStatus({ kind: "idle" });

    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sanitized = sanitizeCleanerOnboardingForm(form);
    const nextErrors = validateCleanerOnboardingForm(sanitized);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setForm(sanitized);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/cleaner-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitized),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(
          payload.message ??
            "We couldn't submit your details right now. Please try again shortly.",
        );
      }

      setStatus({
        kind: "success",
        message:
          payload.message ??
          "Thanks for sharing your details. We've sent a confirmation email to your inbox.",
      });
      setForm(initialCleanerOnboardingForm);
      setErrors({});
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "We couldn't submit your details right now. Please try again shortly.";

      setStatus({ kind: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      {status.kind === "success" ? (
        <Alert className="border-emerald-200 bg-emerald-50 text-emerald-900">
          <CheckCircle2 className="size-4" />
          <AlertTitle>Details received</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      ) : null}

      {status.kind === "error" ? (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertCircle className="size-4" />
          <AlertTitle>Submission failed</AlertTitle>
          <AlertDescription>{status.message}</AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="fullName">Cleaner Full Name</Label>
          <Input
            id="fullName"
            autoComplete="name"
            placeholder="Enter full name"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            aria-invalid={Boolean(errors.fullName)}
            aria-describedby={errors.fullName ? "fullName-error" : undefined}
            className="h-12 rounded-2xl border-black/10 bg-white px-4"
          />
          {errors.fullName ? (
            <p id="fullName-error" className="text-sm font-medium text-red-600">
              {errors.fullName}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className="h-12 rounded-2xl border-black/10 bg-white px-4"
          />
          {errors.email ? (
            <p id="email-error" className="text-sm font-medium text-red-600">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact Number</Label>
          <PhoneInput
            id="contactNumber"
            autoComplete="tel"
            value={form.contactNumber}
            onChange={(value) => updateField("contactNumber", value)}
            aria-invalid={Boolean(errors.contactNumber)}
            aria-describedby={
              errors.contactNumber ? "contactNumber-error" : undefined
            }
            className="px-4 py-3 text-base md:text-sm"
          />

          {errors.contactNumber ? (
            <p
              id="contactNumber-error"
              className="text-sm font-medium text-red-600"
            >
              {errors.contactNumber}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            value={CLEANER_CITY}
            disabled
            readOnly
            className="h-12 rounded-2xl border-black/10 bg-neutral-50 px-4 text-neutral-600 opacity-100"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="postcode">Postcode</Label>
          <Input
            id="postcode"
            autoComplete="postal-code"
            placeholder="Enter postcode"
            value={form.postcode}
            onChange={(event) => updateField("postcode", event.target.value)}
            aria-invalid={Boolean(errors.postcode)}
            aria-describedby={errors.postcode ? "postcode-error" : undefined}
            className="h-12 rounded-2xl border-black/10 bg-white px-4 uppercase"
          />
          {errors.postcode ? (
            <p id="postcode-error" className="text-sm font-medium text-red-600">
              {errors.postcode}
            </p>
          ) : null}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={isSubmitting}
        className="h-12 w-full rounded-full bg-[linear-gradient(135deg,#ec1d8d,#ff6db8)] text-white shadow-[0_18px_40px_rgba(236,29,141,0.28)] hover:opacity-95"
      >
        {isSubmitting ? "Submitting..." : "Submit details"}
      </Button>
    </form>
  );
}
