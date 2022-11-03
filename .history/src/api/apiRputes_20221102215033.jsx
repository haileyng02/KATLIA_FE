// SIGN UP
export const SIGN_UP = '/auth/signInWithEmailAndPassword'
export const getSignupBody = (email, name) => ({
  email: email,
  name: name
})