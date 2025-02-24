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
    <div className="h-screen container mx-auto flex justify-center items-center">
      <div className="flex-col gap-4 w-1/3 border border-gray-300 rounded-md py-20 px-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={signup.email}
            required
            onChange={(e) => setSignup({ ...signup, email: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={signup.password}
            required
            onChange={(e) => setSignup({ ...signup, password: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Sign Up
          </button>
        </form>
        <div className='text-center mt-4'>
          <p className='text-sm text-gray-500'>
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