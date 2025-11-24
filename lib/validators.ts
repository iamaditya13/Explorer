// Form validation utilities
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[0-9+\s-()]{10,}$/
  return phoneRegex.test(phone)
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0
}
