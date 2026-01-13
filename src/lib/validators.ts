// Form validation utilities

export const validators = {
  required: (value: unknown) => {
    if (value === null || value === undefined || value === '') {
      return 'This field is required';
    }
    return undefined;
  },

  email: (value: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(value)) {
      return 'Invalid email address';
    }
    return undefined;
  },

  minLength: (min: number) => (value: string) => {
    if (value.length < min) {
      return 'Must be at least ' + min + ' characters';
    }
    return undefined;
  },

  maxLength: (max: number) => (value: string) => {
    if (value.length > max) {
      return 'Must be at most ' + max + ' characters';
    }
    return undefined;
  },

  pattern: (regex: RegExp, message: string) => (value: string) => {
    if (!regex.test(value)) {
      return message;
    }
    return undefined;
  },

  url: (value: string) => {
    try {
      new URL(value);
      return undefined;
    } catch {
      return 'Invalid URL';
    }
  },

  phone: (value: string) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(value.replace(/[\s-]/g, ''))) {
      return 'Invalid phone number';
    }
    return undefined;
  },
};

export function validate<T extends Record<string, unknown>>(
  values: T,
  rules: Partial<Record<keyof T, ((value: any) => string | undefined)[]>>
): Partial<Record<keyof T, string>> {
  const errors: Partial<Record<keyof T, string>> = {};

  for (const field in rules) {
    const fieldRules = rules[field];
    if (fieldRules) {
      for (const rule of fieldRules) {
        const error = rule(values[field]);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    }
  }

  return errors;
}