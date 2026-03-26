export const CLEANER_CITY = "London" as const;

export type CleanerOnboardingFormData = {
  fullName: string;
  email: string;
  contactNumber: string;
  city: typeof CLEANER_CITY;
  postcode: string;
};

export type CleanerOnboardingErrors = Partial<
  Record<keyof CleanerOnboardingFormData, string>
>;

export const initialCleanerOnboardingForm: CleanerOnboardingFormData = {
  fullName: "",
  email: "",
  contactNumber: "",
  city: CLEANER_CITY,
  postcode: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function requireTrimmed(value: string, message: string) {
  return value.trim() ? undefined : message;
}

export function validateCleanerOnboardingForm(
  form: CleanerOnboardingFormData,
): CleanerOnboardingErrors {
  const errors: CleanerOnboardingErrors = {};

  const fullNameError = requireTrimmed(
    form.fullName,
    "Cleaner full name is required.",
  );
  if (fullNameError) {
    errors.fullName = fullNameError;
  }

  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!EMAIL_REGEX.test(form.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  const contactNumberError = requireTrimmed(
    form.contactNumber,
    "Contact number is required.",
  );
  if (contactNumberError) {
    errors.contactNumber = contactNumberError;
  }

  if (form.city !== CLEANER_CITY) {
    errors.city = "City must be London.";
  }

  const postcodeError = requireTrimmed(form.postcode, "Postcode is required.");
  if (postcodeError) {
    errors.postcode = postcodeError;
  }

  return errors;
}

export function sanitizeCleanerOnboardingForm(
  form: CleanerOnboardingFormData,
): CleanerOnboardingFormData {
  return {
    fullName: form.fullName.trim(),
    email: form.email.trim(),
    contactNumber: form.contactNumber.trim(),
    city: CLEANER_CITY,
    postcode: form.postcode.trim().toUpperCase(),
  };
}
