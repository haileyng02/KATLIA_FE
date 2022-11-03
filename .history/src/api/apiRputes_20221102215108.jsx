// SIGN UP
export const SIGN_UP = '/auth/signInWithEmailAndPassword'
export const getSignupBody = (email, name, Password) => ({
  email: email,
  name: name,
  Password
})