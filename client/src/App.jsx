import "./App.css";
import SigninPage from "./pages/Signin/SigninPage";
import SignupPage from "./pages/Signup/SignupPage";
import HomePage from "./pages/HomePage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedComponent from "./component/ProtectedComponent.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SigninPage />}></Route>
          <Route path="/signup" element={<SignupPage />}></Route>
          <Route
            path="/dashboard"
            element={
              <ProtectedComponent>
                <HomePage />
              </ProtectedComponent>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
      {/* <HomePage /> */}
    </>
  );
}

export default App;
