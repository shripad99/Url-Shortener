import PasswordInput from "../components/Input/PasswordInput"
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validateEmail } from "../utils/helper"
import axiosInstance from '../utils/axiosInstance';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) =>{
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid email address.");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("")

    try{
      const response = await axiosInstance.post("/auth/login", {
        email: email,
        password: password,
      });
      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken);
        navigate("/dashboard");
      }
    }catch(error){
      console.error("Login Error:", error.response?.data || error.message);
      if (error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      } else {
        setError("An unexpected error occured. Please try again.")
      }
    }
  }
  return (
    <div className='flex items-center justify-center mt-28'>
        <div className='w-96 border rounded bg-white px-7 py-10 drop-shadow-md'>
          <form onSubmit={handleLogin}>
            <h4 className='text-2xl mb-7'>Login</h4>
            <input type='text' placeholder='Email' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
            <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
            <button type='submit' className='w-full text-sm text-white p-2 rounded my-1 bg-blue-500'>
              Login
            </button>
            <p className='text-sm text-center mt-4'>
              Not registered yet?{" "}
              <Link to='/signup' className='font-medium text-primary underline'>
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
  )
}

export default Login