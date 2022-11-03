// SIGN UP
export const SIGN_UP = '/auth/signUpByEmailAndOTP'
export const getSignupBody = (email, name) => ({
  email: email,
  name: name
})