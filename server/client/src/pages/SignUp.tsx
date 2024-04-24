import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { IoLibrary } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const SignUp = () => {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password)
      return setErrorMsg("Some fields are missing. Fill them up!");

    try {
      setIsLoading(true);
      setErrorMsg(null);
      const res = await fetch("api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) return setErrorMsg(data.message);
      setIsLoading(false);
      if (res.ok) navigate("/sign-in");
    } catch (error: any) {
      setErrorMsg(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-svh mt-20 ">
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <Label htmlFor="username" color={"white"}>
                Username
              </Label>
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>

          <div className="flex gap-2 mt-5 text-sm">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-blue-400">
              Sign In
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

export default SignUp;
