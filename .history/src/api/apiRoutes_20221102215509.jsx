// SIGN UP
export const SIGN_UP = '/auth/signInWithEmailAndPassword'
export const getSignupBody = (email, password) => ({
  email: email,
  password: password
})