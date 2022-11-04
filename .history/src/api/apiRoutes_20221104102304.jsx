// SIGN UP
export const SIGN_UP = '/auth/verifyEmailForSignUp'
export const getSignupBody = (email, name, password) => ({
  email: email,
  name: name,
  password: password
})

//GET PRODUCT BY GENDER
export const PRODUCT_BY_GENDER = '/product/getProductByGender/{gender}'
export const getProductByGender = id => ({
  params:
})