import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoLibrary } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../services/user/user.slice";
import { AppDispatch, RootState } from "../services/store";
import OAuth from "../components/OAuth";

const initialState = {
  email: "",
  password: "",
};

const SignIn = () => {
  const [formData, setFormData] = useState(initialState);
  const isLoading = useSelector<RootState>(
    (state) => state.user.isLoading
  ) as boolean;
  const errorMsg = useSelector<RootState>((state) => state.user.error) as
    | string
    | null;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email || !formData.password)
      dispatch(signInFailure("Some fields are missing. Fill them up!"));

    try {
      dispatch(signInStart());
      const res = await fetch("api/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) dispatch(signInFailure(data.message));
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error: any) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="mt-20 ">
      <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
        {/* Left */}
        <div className="flex-1 space-y-4 md:my-auto">
          <div className="flex items-center justify-center md:justify-start gap-2 text-5xl">
            <div className="px-3 py-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-pink-500 rounded-xl grid place-items-center ">
              <IoLibrary />
            </div>
            <span className="italic font-bold">MyBlog</span>
          </div>
          <p className="text-center md:text-left text-sm">
            Sign in your account here
          </p>
        </div>
        {/* Right */}
        <div className="flex-1 px-8 md:px-0">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="email" color={"white"}>
                Email
              </Label>
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="password" color={"white"}>
                Password
              </Label>
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone={"purpleToPink"}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" />
                  <span className="ml-2">Loading...</span>
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 mt-5 text-sm">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-400">
              Sign Up
            </Link>
          </div>

          {errorMsg && (
            <Alert className="mt-4" color="failure">
              {errorMsg}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
