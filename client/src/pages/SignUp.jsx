import { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {
  const [signup, setSignup] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(signup);
  };

  return (
    <div className="h-screen container mx-auto flex justify-center items-center">
      <div className="flex-col gap-4 w-1/3 border border-gray-300 rounded-md py-20 px-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
        </div>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            value={signup.name}
            required
            onChange={(e) => setSignup({ ...signup, name: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
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