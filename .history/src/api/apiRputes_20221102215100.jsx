// SIGN UP
export const SIGN_UP = '/auth/signInWithEmailAndPassword'
export const getSignupBody = (email, name, password) => ({
  email: email,
  name: name
})