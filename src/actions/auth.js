export const signIn = (token) => {
    return {
        type: "SIGN_IN",
        payload: token,
    };
};