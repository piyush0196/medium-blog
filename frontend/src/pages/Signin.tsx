import React, { useState } from "react";
import Quote from "../component/Quote";
import { Link, useNavigate } from "react-router-dom";
import { SigninInput } from "@100xdevs/medium-common";
import { LabelledInput } from "../component/Input";
import { BACKEND_URL } from "../config";
import axios from "axios";

export const Signin = () => {
  const [signinInputs, setSigninInputs] = useState<SigninInput>({
    username: "",
    password: "",
  });
  const navigate = useNavigate()


  async function sendSignInRequest() {
    try {
      const resposne = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, signinInputs);
      const {token} = resposne.data
      if(token) {
        localStorage.setItem('token',  token)
        navigate('/blogs')
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div>
            <div className="px-10">
              <div className="text-3xl font-extrabold">Create an account</div>
              <div className="text-slate-400">
                Don't have an account?
                <Link className="pl-2 underline" to={"/signup"}>
                  Sign up
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <LabelledInput
                label="Username (Email)"
                placeholder="m@example.com"
                onChange={(e) => {
                  setSigninInputs({
                    ...signinInputs,
                    username: e.target.value,
                  });
                }}
              />
              <LabelledInput
                type="password"
                label="Password"
                placeholder=""
                onChange={(e) => {
                  setSigninInputs({
                    ...signinInputs,
                    password: e.target.value,
                  });
                }}
              />
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 mt-4 w-full"
                onClick={sendSignInRequest}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
};
