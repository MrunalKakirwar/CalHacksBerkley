import { useState, useRef } from "react";
// import Header from "../Header";
import { checkValidData } from "../validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch } from "react-redux";
import BACKDROP from "./image002.png";
import { useLocation, useNavigate } from "react-router-dom";
import { addUser } from "../userSlice";
import axios from "axios";

const Login = () => {
  const location = useLocation();
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(location);

  const name = useRef(null);
  const phone = useRef(null);
  const address = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = async () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;

    try {
      if (!isSignInForm) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        const user = userCredential.user;
        await updateProfile(user, {
          displayName: name.current.value,
        });

        const {
          uid,
          email: userEmail,
          displayName,
          photoURL,
        } = auth.currentUser;

        const userObj = {
          email: userEmail,
          displayName: displayName,
          phone: phone.current.value,
          address: address.current.value,
          role: selectedRole,
        };

        dispatch(addUser(userObj));

        await axios.post("http://localhost:5000/user/add-user", userObj);
      } else {
        await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );
      }

      localStorage.setItem("email", email.current.value)

      if (location.state.to === "/lender") navigate("/lender");
      if (location.state.to === "/consumer") navigate("/consumer");
    } catch (error) {
      console.log(`error`, error);
      const errorCode = error.code;
      const errorMessage = error.message;
      setErrorMessage(errorCode + "-" + errorMessage);
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="absolute inset-0">
        <img
          className="w-full h-screen object-cover"
          src={BACKDROP}
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <>
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700"
            />

            <input
              ref={phone}
              type="number"
              placeholder="Phone"
              className="p-4 my-4 w-full bg-gray-700"
            />

            <input
              ref={address}
              type="text"
              placeholder="Address"
              className="p-4 my-4 w-full bg-gray-700"
            />

            <fieldset className="p-2 my-4">
              <legend>Select your role</legend>

              <label htmlFor="lender">
                <input
                  type="radio"
                  id="lender"
                  name="role"
                  value="lender"
                  checked={selectedRole === "lender"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                Lender
              </label>
              <br />

              <label htmlFor="consumer">
                <input
                  type="radio"
                  id="consumer"
                  name="role"
                  value="consumer"
                  checked={selectedRole === "consumer"}
                  onChange={(e) => setSelectedRole(e.target.value)}
                />
                Consumer
              </label>
            </fieldset>
          </>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
        <button
          className="p-4 my-6 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Park Eazy? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};
export default Login;
