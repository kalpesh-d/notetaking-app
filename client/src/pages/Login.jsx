import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(login);
  }

  return (
    <div className="h-screen container mx-auto flex justify-center items-center">
      <div className="flex-col gap-4 w-1/3 border border-gray-300 rounded-md py-20 px-10">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
        </div >
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={login.email}
            required
            onChange={(e) => setLogin({ ...login, email: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="password"
            placeholder="Password"
            value={login.password}
            required
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button className="bg-blue-500 text-white p-2 rounded-md">Login</button>
        </form>
        <div className='text-center mt-4'>
          <p className='text-sm text-gray-500'>
            Don't have an account?{" "}
            <Link to="/signup" className='text-blue-500 hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div >
  );
}

export default Login;
