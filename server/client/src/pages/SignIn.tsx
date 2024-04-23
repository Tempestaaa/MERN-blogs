import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { IoLibrary } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../services/user/userSlice";

const initialState = {
  username: "",
  password: "",
};

const SignIn = () => {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     dispatch(signInStart());
  //     const res = await fetch("");
  //   };
  // });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <Button gradientDuoTone={"purpleToPink"} type="submit">
              Submit
            </Button>
          </form>

          <div className="flex gap-2 mt-5 text-sm">
            <span>Don't have an account?</span>
            <Link to="/sign-up" className="text-blue-400">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
