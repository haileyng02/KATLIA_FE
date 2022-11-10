// VERIFY EMAIL FOR SIGN UP
export const SIGN_UP = '/auth/verifyEmailForSignUp'
export const getSignupBody = (email, name, password) => ({
  email: email,
  name: name,
  password: password
})

//SIGN UP BY EMAIL AND OTP
export const SIGN_UP_OTP = '/auth/signUpByEmailAndOTP'
export const getSignupOTPBody = (email, otp) => ({
  email: email,
  otp: otp
})

//SIGN IN WITH EMAIL AND PASSWORD
export const SIGN_IN = '/auth/signInWithEmailAndPassword'
export const getSigninBody = (email, password) => ({
  email: email,
  password: password
})

//GET PRODUCT BY GENDER
export const GET_PRODUCT_BY_GENDER_MEN = '/product/getProductByGender/men'
export const GET_PRODUCT_BY_GENDER_WOMEN = '/product/getProductByGender/women'
export const getProductByGender = (gender) => ({
  params: {
    gender: gender
  }
})

//GET PRODUCT BY CATEGORY ID
export const GET_PRODUCT_BY_CATEGORY_ID = '/product/getProductByCategoryId/1'
export const getProductByCategoryId = (categoryId) => ({
  params: {
    categoryId: categoryId
  }
})

//GET TOP 4
export const GET_TOP4_MEN = '/product/getTop4/men'
export const GET_TOP4_WOMEN = '/product/getTop4/women'
export const getTop4Body = (gender) => ({
  params: {
    gender: gender
  }
})

//GET CATEGORY BY GENDER
export const GET_CATEGORY_BY_GENDER_MEN = '/category/getCategoryByGender/men'
export const GET_CATEGORY_BY_GENDER_WOMEN = '/category/getCategoryByGender/women'
export const getCategoryByGender = (gender) => ({
  params: {
    gender: gender
  }
})

//GET PRODUCT DETAIL
export const GET_PRODUCT_DETAIL = '/product/getProductDetail/579857'
export const getProductDetail = (id) => ({
  params: {
    id: id
  }
})
