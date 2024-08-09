import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/authContext.jsx";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { setAuthUser } = useAuthContext();

  const signup = async (username, password, confirmPassword) => {
    try {
      if (!username || !password || !confirmPassword) return;

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          confirmPassword,
        }),
      });

      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.setItem("todo-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, password, confirmPassword);
  };

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-5">
          <h1 className="text-3xl font-semibold text-center text-gray-300">
            Sign Up
          </h1>

          <form onSubmit={handleSubmit}>
            <div>
              <label className="label p-2">
                <span className="text-base label-text">User Name</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className="w-full input input-bordered h-10 bg-gray-400 bg-opacity-5"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label className="label p-2 ">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                className="w-full input input-bordered h-10 bg-gray-400 bg-opacity-5"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="label">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full input input-bordered h-10 bg-gray-400 bg-opacity-5"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Link
              className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
              to="/login"
            >
              Already have an account?
            </Link>

            <div>
              <button className="btn btn-block btn-sm mt-2">Sign up</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;
