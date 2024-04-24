import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import { FaGoogle } from "react-icons/fa";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../services/user/user.slice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  const auth = getAuth(app);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      const res = await fetch("api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: resultFromGoogle.user.displayName,
          email: resultFromGoogle.user.email,
          googlePhotoUrl: resultFromGoogle.user.photoURL,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Button
      type="button"
      gradientDuoTone="pinkToOrange"
      outline
      onClick={handleGoogleClick}
    >
      <div className="flex items-center gap-2">
        <FaGoogle className="w-4 aspect-square" />
        <span>Continue with Google</span>
      </div>
    </Button>
  );
};

export default OAuth;
