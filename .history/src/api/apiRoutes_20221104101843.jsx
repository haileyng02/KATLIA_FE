// SIGN UP
export const SIGN_UP = '/auth/verifyEmailForSignUp'
export const getSignupBody = (email, name, password) => ({
  email: email,
  name: name,
  password: password
})

//G