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
export const getAccessTokenHeader = token => ({
  headers: {
    Authorization: 'Bearer ' + token
  }
})

//SIGN IN WITH EMAIL AND PASSWORD
export const SIGN_IN = '/auth/signInWithEmailAndPassword'
export const getSigninBody = (email, password) => ({
  email: email,
  password: password
})

//GET PRODUCT BY GENDER
export const GET_PRODUCT_BY_GENDER = (gender) => `/product/getProductByGender/${gender}`
export const getProductByGender = (gender) => ({
  params: {
    gender: gender
  }
})

//GET PRODUCT BY CATEGORY ID
export const GET_PRODUCT_BY_CATEGORY_ID = (id) => `/product/getProductByCategoryId/${id}`
export const getProductByCategoryId = (categoryId) => ({
  params: {
    categoryId: categoryId
  }
})

//GET TOP 4
export const GET_TOP4 = (gender) => `/product/getTop4/${gender}`
export const getTop4Body = (gender) => ({
  params: {
    gender: gender
  }
})

//GET CATEGORY BY GENDER
export const GET_CATEGORY_BY_GENDER = (gender) => `/category/getCategoryByGender/${gender}`
export const getCategoryByGender = (gender) => ({
  params: {
    gender: gender
  }
})

//GET PRODUCT DETAIL
export const GET_PRODUCT_DETAIL = (id) => `/product/getProductDetail/${id}`
export const getProductDetail = (id) => ({
  params: {
    id: id
  }
})

//GET 4 SIMILAR ITEMS 
export const GET_4SIMILAR_ITEMS = (id) => `/product/get4SimilarItems/${id}`
export const get4SimilarItems = (id) => ({
  params: {
    id: id
  }
})

//ADD ITEM TO CART
export const ADD_ITEM_TO_CART = '/cart/addItemToCart'
export const getAddCartBody = (productId, colorId, size, quantity) => ({
  productId: productId,
  colorId: colorId,
  size: size,
  quantity: quantity
})

//GET CART
export const GET_CART = '/cart/getCart'

//DELETE CART ITEM
export const DELETE_CART_ITEM = (id) => `/cart/deleteCartItem/${id}`
export const getDeleteCartBody = (id) => ({
  params: {
    id: id
  }
})

//UPDATE CART ITEM
export const UPDATE_CART_ITEM = '/cart/updateCartItem'
export const getUpdateCartBody = (id, number) => ({
  id: id,
  number: number
})