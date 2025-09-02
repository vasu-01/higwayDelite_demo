import React, { use, useState } from "react";
import { winImg, icon } from "../../assets/image";
import axios from "axios";

const SignupPage = () => {
  const [otp, setOtp] = useState("");
  const [otpFlag, setOtpFlag] = useState(false);
  const [verificationResponse, setVerificationResponse] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //sending otp to email
  const handlesendOtp = async (e) => {
    e.preventDefault();

    //api call

    try {
      let response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup`,
        formData
      );

      if (response.data.success) {
        setOtpFlag(true);
        alert(response.data.message || "Otp sent successfully!");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occured!");
      }
    }
  };

  //verifying the otp got on email
  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const data = {
      otpCode: otp,
      email: formData.email,
    };

    // api call
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/signup/verify-otp`,
        data
      );
      if (response.data.success) {
        setVerificationResponse(response.data);
        localStorage.setItem("token", response.data.token);

        alert(response.data.message || "Otp verified successfully!");
      } else {
        alert(`Error: ${response.data.message}`);
      }
    } catch (error) {
      if (error.response?.data?.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("An unexpected error occured!");
        console.log(error);
      }
    }
  };

  console.log("VerifiedResponse:", verificationResponse);

  //handling submit button of form
  const handleSubmit = () => {
    if (verificationResponse?.success) {
      //     navigate("/home")
      setFormData({
        fullName: "",
        dob: "",
        email: "",
      });
      setOtp("");
      setOtpFlag(false);
      console.log("navigating to homepage");
      alert("Signedup Successfully!");
    } else {
      alert("Please verify email before submitting!");
    }
  };

  return (
    <div className="min-h-screen w-full  flex justify-center items-center ">
      <div className=" flex flex-col w-[760px] h-[550px] m-[72px] p-[13px] md:flex-row border-white-2 ">
        {/* Left section */}

        <div className="flex  items-center justify-center p-3 w-[310px] bg-gray-100 rounded-lg">
          <div className="w-full max-w-sm">
            {/* Logo */}

            <div className="flex  mb-10 -mt-2">
              <img src={icon} alt="HD Logo" className="w-8 h-8 mr-2" />
              <h1 className="text-xl font-bold">HD</h1>
            </div>

            {/* Title */}

            <h2 className="text-2xl font-bold text-center mb-2">Sign up</h2>
            <p className="text-gray-500 text-center mb-6">
              Sign up to enjoy the feature of HD
            </p>

            {/* Form */}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative ">
                <input
                  type="text"
                  placeholder=" "
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className=" w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor=""
                  className="absolute -top-2 left-3 bg-gray-100  px-1 text-xs text-gray-500"
                >
                  Your full Name
                </label>
              </div>

              <div className="relative">
                <input
                  type="date"
                  placeholder=" "
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border text-gray-600  rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <label
                  htmlFor=""
                  className="absolute -top-2 left-3 px-1 text-xs bg-gray-100 text-gray-500"
                >
                  Date of Birth
                </label>
              </div>

              <div className="relative">
                <input
                  type="email"
                  placeholder=" "
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
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
                  placeholder=" "
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="border  h-[41px] w-[80%] rounded-md border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  placeholder="OTP"
                  onClick={handleOtpSubmit}
                  className="w-[20%] h-[41px] text-xs  bg-blue-500 cursor-pointer text-white py-2 rounded-md hover:bg-blue-600 transition"
                >
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
                type="submit"
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

export default SignupPage;
