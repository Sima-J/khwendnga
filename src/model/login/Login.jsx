import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../controller";
import { updateDoc, doc } from "firebase/firestore";
import { useHistory } from "react-router-dom";
import girlStudent from "../../assets/girlStudent.svg";

const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: null,
    loading: false,
  });

  const history = useHistory();

  const { email, password, error, loading } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setData({ ...data, error: null, loading: true });
    if (!email || !password) {
      setData({ ...data, error: "All fields are required" });
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      await updateDoc(doc(db, "users", result.user.uid), {
        isOnline: true,
      });
      setData({
        email: "",
        password: "",
        error: null,
        loading: false,
      });
      history.replace("/");
    } catch (err) {
      setData({ ...data, error: err.message, loading: false });
    }
  };
  return (
    <div class="h-screen w-full  flex ">
      <div class="hidden md:block md:w-1/2 lg:w-1/2 xl:w-1/2 bg-heroLogin bg-darkPurple bg-contain bg-no-repeat justify-around items-center">
        <div class="md:absolute  md:top-20 xl:left-[20%] mx-4 ">
          <h1 class=" font-extrabold  text-5xl text-center leading-loose drop-shadow  bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-violet-600 ">
            Khwendnga
          </h1>
          <p class="text-tGray font-bold text-lg mt-2 text-center ">
            LEARNING HAS NEVER BEEN EASIER!
          </p>
        </div>
      </div>
      <div class="flex md:w-1/2 w-full justify-center items-center bg-white">
        <div class="bg-white w-3/4">
          <h1 class="text-normalPurple font-bold text-5xl mb-2">
            Hello Again!
          </h1>
          <p class="text-3xl font-normal text-gray-600 mt-2 mb-7">
            Welcome Back
          </p>
          <form onSubmit={handleSubmit}>
            <div class="flex items-center border-2 py-3 px-6 rounded-2xl mb-4">
              <img src={girlStudent} alt="user" class="w-8 h-8 " />
              <input
                class="pl-2 outline-none border-none"
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div class="flex items-center border-2 py-3 px-6 rounded-2xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <input
                class="pl-2 outline-none border-none"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="*************"
              />
            </div>

            {error ? <p className="error">{error}</p> : null}
            <div className="btn_container">
              <button
                class="block w-full bg-indigo-600 mt-4 py-3 rounded-2xl text-white font-semibold mb-2"
                disabled={loading}
              >
                {loading ? "Logging in ..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
