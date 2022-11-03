// SIGN UP
export const SIGN_UP = '/auth/signInWithEmailAndPassword'
export const getSignupBody = (email, otp) => ({
  email: email,
  otp: otp
})