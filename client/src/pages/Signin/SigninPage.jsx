import React, { use, useState } from "react";
import { winImg, icon } from "../../assets/image";

const SigninPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [sentOtp, setSentOtp] = useState("");
  const [otpFlag, setOtpFlag] = useState(false);
  const [verifyFlag, setVerifyFlag] = useState(false);

  //submitting form with detail
  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log("Form data:", email);
    if (email) {
      setEmail("");
      setVerifyFlag(false);
      setOtpFlag(false);
    }
  };

  //sending otp to email
  const handlesendOtp = (e) => {
    e.preventDefault();

    //api call

    console.log("Otp sent:", 233);
    let t = true;
    if (t) {
      setOtpFlag(true);
    }
  };

  //verifying the otp got on email
  const handleOtpSubmit = (e) => {
    e.preventDefault();

    //api call

    console.log("email:", email, "otpValue:", otp);
  };

  //handling submit button - checking if verified and redirecting
  const handleSubmit = () => {
    // if(Response.success){
    //     navigate("/home")
    setEmail("");
    setOtp("");
    setOtpFlag(false);
    // }

    console.log("navigating to homepage");
  };

  return (
    <div className="min-h-screen w-full  flex justify-center items-center ">
      <div className=" flex flex-col w-[760px] h-[550px] m-[72px] p-[13px] md:flex-row border-white-2 ">
        {/* Left section */}

        <div className="flex  items-center justify-center p-3 w-[310px] bg-gray-100 rounded-lg">
          <div className="w-full max-w-sm">
            {/* Logo */}

            <div className="flex  mb-20 -mt-10">
              <img src={icon} alt="HD Logo" className="w-8 h-8 mr-2" />
              <h1 className="text-xl font-bold">HD</h1>
            </div>

            {/* Title */}

            <h2 className="text-2xl font-bold text-center mb-2">Sign in</h2>
            <p className="text-gray-500 text-center mb-6">
              Please login to continue to your account
            </p>

            {/* Form */}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor=""
                  className="absolute -top-2 p x-1 left-3 text-xs bg-gray-100 text-gray-500"
                >
                  Email
                </label>
              </div>

              <div className="flex -top-1.5  ">
                <input
                  type="text"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border  h-[41px] w-[80%] rounded-md border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  onClick={handleOtpSubmit}
                  className="w-[20%] h-[41px] text-xs  bg-blue-500 cursor-pointer text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
                  {/* {verifyFlag ? "Verified" : "Verify"} */}
                  Verify
                </button>
              </div>

              <div className="-mt-3 ">
                <button
                  type="button"
                  onClick={handlesendOtp}
                  className="underline cursor-pointer text-blue-800 text-xs"
                >
                  {otpFlag ? "Resend OTP" : "Send OTP"}
                </button>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full cursor-pointer bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Submit
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-sm text-gray-500 mt-4">
              Already have an account?
              <a
                href="#"
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>

        {/* Right section (desktop only) */}

        <div className="w-[450px]  hidden md:flex flex-1 rounded-lg  items-center bg-gray-100">
          <img
            src={winImg}
            alt="Banner"
            className=" object-cover w-full h-full "
          />
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
