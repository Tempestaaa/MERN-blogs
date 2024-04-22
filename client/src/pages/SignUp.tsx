import { Button, Label, TextInput } from "flowbite-react";
import { IoLibrary } from "react-icons/io5";
import { Link } from "react-router-dom";

const SignUp = () => {
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
            Sign up your account here
          </p>
        </div>
        {/* Right */}
        <div className="flex-1 px-8 md:px-0">
          <form className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username" color={"white"}>
                Username
              </Label>
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label htmlFor="email" color={"white"}>
                Email
              </Label>
              <TextInput type="text" placeholder="Email" id="email" />
            </div>
            <div>
              <Label htmlFor="password" color={"white"}>
                Password
              </Label>
              <TextInput type="text" placeholder="Password" id="password" />
            </div>
            <Button gradientDuoTone={"purpleToPink"} type="submit">
              Submit
            </Button>
          </form>

          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to="http://localhost:5173/sign-in" className="text-blue-400">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
