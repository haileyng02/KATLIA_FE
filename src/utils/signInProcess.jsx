import { signIn } from "../actions/auth";

const signInProcess = ({ token, newUser, isChecked, dispatch, navigate }) => {
  //App state
  dispatch(signIn(token));

  //Local storage for user remembering
  const date = new Date();
  if (isChecked) date.setDate(date.getDate() + 30);
  else date.setDate(date.getDate() + 1);
  const item = {
    token: token,
    expiry: date,
  }
  localStorage.setItem("user", JSON.stringify(item));

  //Navigate to home
  if (newUser)
    navigate("/", {
      state: {
        notification: {
          type: "success",
          message: "Success",
          description:
            "Congratulations, your account has been successfully created.",
        },
      },
    });
  else navigate("/");
};

export default signInProcess;
