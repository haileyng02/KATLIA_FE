// SIGN UP
export const SIGN_UP = '/auth/verifyEmailForSignUp'
export const getSignupBody = (email, otp) => ({
  email: email,
  otp: otp
})