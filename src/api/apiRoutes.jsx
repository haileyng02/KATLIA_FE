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

//VERIFY EMAIL FORGOT PASSWORD
export const VERIFY_EMAIL_FORGOT_PASSWORD = '/auth/verifyEmailForgotPassword'
export const getVerifyForgotPasswordBody = (email) => ({
  email: email
})

//CHECK OTP FORGOT PASSWORD
export const CHECK_OTP_FORGOT_PASSWORD = '/auth/checkOTPForgotPassword'
export const getOTPForgotPassword = (email, otp) => ({
  email: email,
  otp: otp
})

//NEW PASSWORD AFTER VERIFY
export const NEW_PASSWORD_AFTER_VERIFY = '/auth/newPasswordAfterVerify'
export const getNewPasswordBody = (email, password) => ({
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

//GET ME USER
export const GET_ME_USER = '/user/me'

//GET PRODUCT BY CATEGORY ID
export const GET_PRODUCT_BY_CATEGORY_ID = (id) => `/product/getProductByCategoryId/${id}`
export const getProductByCategoryId = (categoryId) => ({
  params: {
    categoryId: categoryId
  }
})

//GET ALL CATEGORY
export const GET_ALL_CATEGORY = '/category/getAll'

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

//PURCHASE
export const PURCHASE = '/order/purchase'
export const getPurchaseBody = (receiverName, receiverPhone, address, payment, note, voucherId) => ({
  receiverName: receiverName,
  receiverPhone: receiverPhone,
  address: address,
  payment: payment,
  note: note,
  voucherId: voucherId
})

//GET ORDER HISTORY
export const GET_ORDER_HISTORY = '/order/history'

//GET ORDER DETAIL
export const GET_ORDER_DETAIL = (id) => `/order/detail/${id}`
export const getOrderDetailBody = (id) => ({
  params: {
    id: id
  }
})

//GET ALL COLORS 
export const GET_ALL_COLORS = '/filter/getAllColors'

//GET ALL SIZES
export const GET_ALL_SIZES = '/filter/getAllSizes'

//SEARCH PRODUCTS
export const SEARCH_PRODUCTS = '/filter/searchProducts'
export const getSearchProductsBody = (search) => ({
  params: {
    search: search
  }
})

//FILTER BY COLOR
export const FILTER_BY_COLOR = '/filter/filterByColor'
export const getFilterByColorBody = (colorId ) => ({
  params: {
    colorId: colorId
  }
})

//FILTER BY SIZE
export const FILTER_BY_SIZE = '/filter/filterBySize'
export const getFilterBySizeBody = (size) => ({
  params: {
    size: size
  }
})

//FILTER BY COLOR AND SIZE
export const FILTER_BY_COLOR_AND_SIZE = '/filter/filterByColorAndSize'
export const getFilterByColorAndSizeBody = (colorId, size) => ({
  params: {
    colorId: colorId,
    size: size
  }
})

//FILTER COLOR BY GENDER
export const FILTER_COLOR_BY_GENDER = '/filter/filterColorByGender' 
export const getFilterColorByGenderBody = (colorId, gender) => ({
  params: {
    colorId: colorId,
    gender: gender
  }
})

//FILTER COLOR BY CATEGORY ID
export const FILTER_COLOR_BY_CATEGORY_ID = '/filter/filterColorByCategoryId'
export const getFilterColorByCategoryId = (colorId, categoryId) => ({
  params: {
    colorId: colorId,
    categoryId: categoryId
  }
})

//FILTER SIZE BY GENDER
export const FILTER_SIZE_BY_GENDER = '/filter/filterSizeByGender'
export const getFilterSizeByGenderBody = (size, gender) => ({
  params: {
    size: size,
    gender: gender
  }
})

//FILTER SIZE BY CATEGORY ID
export const FILTER_SIZE_BY_CATEGORY_ID = '/filter/filterSizeByCategoryId'
export const getFilterSizeByCategoryIdBody = (size, categoryId) => ({
  params: {
    size: size,
    categoryId: categoryId
  }
})

//FILTER SIZE COLOR BY GENDER
export const FILTER_SIZE_COLOR_BY_GENDER = '/filter/filterSizeColorByGender'
export const getFilterSizeColorByGenderBody = (colorId, size, gender) => ({
  params: {
	  colorId: colorId,
    size: size,
    gender: gender
  }
})

//FILTER SIZE COLOR BY CATEGORY ID
export const FILTER_SIZE_COLOR_BY_CATEGORY_ID = '/filter/filterSizeColorByCategoryId'
export const getFilterSizeColorByCategoryIdBody = (colorId, size, categoryId) => ({
  params: {
	  colorId: colorId,
    size: size,
    categoryId: categoryId
  }
})

//GET ALL ADDRESS
export const GET_ALL_ADDRESS = '/address/getAllAddress' 

//UPDATE ADDRESS
export const UPDATE_ADDRESS = (id) => `/address/updateAddress/${id}`
export const getUpdateAddressIdParams = (id) => ({
  params: {
    id: id
  }
})

//DELETE ADDRESS
export const DELETE_ADDRESS = (id) => `/address/deleteAdress/${id}`
export const getDeleteAddressBody = (id) => ({
  params: {
    id: id
  }
})

//ADD ADDRESS
export const ADD_ADDRESS = '/address/addAddress'
export const getAddAddressBody = (fullname, phonenumber, address, province, district, ward, note, setAsDefault) => ({
  fullname: fullname,
  phonenumber: phonenumber,
  address: address,
  province: province,
  district: district,
  ward: ward,
  note: note,
  setAsDefault: setAsDefault
})

//UPDATE PROFILE
export const UPDATE_PROFILE = '/profile/updateProfile'
export const getUpdateProfileBody = (
  gender, 
  fullName, 
  phoneNumber, 
  birthday, 
  address, 
  province, 
  district, 
  ward, 
  note
) => ({ 
  gender: gender,
  fullName: fullName,
  phoneNumber: phoneNumber,
  birthday: birthday,
  address: address,
  province: province,
  district: district,
  ward: ward,
  note: note
})

//GET PROFILE
export const GET_PROFILE = '/profile/getProfile'

//UPDATE AVA
export const UPDATE_AVA = '/profile/updateAva'

//CHANGE PASSWORD
export const CHANGE_PASSWORD = '/profile/changePassword'
export const getChangePasswordBody = (
  gender, 
  fullName, 
  phoneNumber, 
  birthday, 
  address, 
  province, 
  district, 
  ward, 
  note, 
  oldPass, 
  newPass, 
  confirmPass
  ) => ({
  gender: gender,
  fullName: fullName,
  phoneNumber: phoneNumber,
  birthday: birthday,
  address: address,
  province: province,
  district: district,
  ward: ward,
  note: note,
  oldPass: oldPass,
  newPass, newPass,
  confirmPass: confirmPass  
})

//GET SALE PRODUCT BY GENDER
export const SALE_PRODUCT_BY_GENDER = (gender) => `/product/getSaleProductByGender/${gender}`
export const getSaleProductByGenderParams = (gender) => ({
  params: {
    gender: gender
  }
})

//GET SALE PRODUCT BY CATEGORY ID
export const SALE_PRODUCT_BY_CATEGORY_ID = (categoryId) => `/product/getSaleProductByCategoryId/${categoryId}`
export const getSaleProductByCategoryIdParams = (categoryId) => ({
  params: {
    categoryId: categoryId
  }
})

//GET FEEDBACKS FOR PRODUCT
export const FEEDBACKS_FOR_PRODUCT = (id) => `/product/getFeedbacksForProduct/${id}`
export const getFeedbacksForProductParamsId = (id) => ({
  params: {
    id: id
  }
})

//GET PRODUCTS FOR FEEDBACK 
export const PRODUCTS_FOR_FEEDBACK = (orderId) => `/feedback/getProductsForFeedback/${orderId}`
export const getProductsForFeedbackParamsId = (orderId) => ({
  params: {
    orderId: orderId
  }
})