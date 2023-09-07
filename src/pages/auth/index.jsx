import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import "./styles.css";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";

import { FcGoogle } from "react-icons/fc";

export const Auth = () => {
  const navigate = useNavigate();
  const { isAuth } = useGetUserInfo();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    const authInfo = {
      userID: result.user.uid,
      name: result.user.displayName,
      profilePhoto: result.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  if (isAuth) return <Navigate to="/expense-tracker" />;

  return (
    <div className="login-page">
      <h1 className="text-6xl">Expense Tracker</h1>
      <div className="space-y-5">
        <p>Sign In With Google to Continue</p>
        <button className="flex gap-3 items-center" onClick={signInWithGoogle}>
          <FcGoogle size={24} /> Sign In With Google
        </button>
      </div>
    </div>
  );
};
