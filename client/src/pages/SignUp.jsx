import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";

function SignUp() {
  const [signup, setSignup] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post('/auth/signup', signup);
      localStorage.setItem('user', JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      setError(error.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen container mx-auto flex justify-center items-center px-4 py-8">
      <div className="flex-col gap-4 w-full max-w-md border border-gray-300 rounded-md py-12 px-6 sm:px-10 sm:py-20">
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-4">Sign Up</h1>
          {error && <p className="text-red-500 text-sm sm:text-base">{error}</p>}
        </div>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={signup.email}
            required
            onChange={(e) => setSignup({ ...signup, email: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base"
          />
          <input
            type="password"
            placeholder="Password"
            value={signup.password}
            required
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full text-sm sm:text-base"
          />
          <button className="bg-blue-500 text-white p-2 rounded-md text-sm sm:text-base hover:bg-blue-600 transition-colors">
            Sign Up
          </button>
        </form>
        <div className='text-center mt-4'>
          <p className='text-xs sm:text-sm text-gray-500'>
            Already have an account?{" "}
            <Link to="/login" className='text-blue-500 hover:underline'>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;