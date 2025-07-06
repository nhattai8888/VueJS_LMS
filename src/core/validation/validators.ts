import type { IValidationResult } from "@/models/IValiadtor"

export const validateField = (
  value: any,
  rules: Array<(val: any) => true | string>
): IValidationResult => {
  const errors = rules
    .map(rule => rule(value))
    .filter(result => result !== true) as string[]

  return {
    valid: errors.length === 0,
    errors
  }
}

export const Validators = {
  required: (value: string) => !!value || 'This field is required',

  email: (value: string) =>
    /^\S+@\S+\.\S+$/.test(value) || 'Invalid email format',

  password: (value: string) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,18}$/.test(value) ||
    'Password must be 6-18 chars, include upper, lower, number, special char',

  minLength: (min: number) => (value: string) =>
    value.length >= min || `At least ${min} characters`,

  maxLength: (max: number) => (value: string) =>
    value.length <= max || `No more than ${max} characters`,

  fileType: (allowedTypes: string[]) => (file: File) =>
    allowedTypes.includes(file.type) || 'Invalid file type',

  fileSize: (maxSizeMB: number) => (file: File) =>
    file.size / 1024 / 1024 <= maxSizeMB || `Max file size is ${maxSizeMB}MB`,
}
