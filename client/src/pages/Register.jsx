import PasswordInput from '../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../utils/helper';
import axiosInstance from '../utils/axiosInstance';
import { useState } from 'react'


const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) =>{
    e.preventDefault();
    if (!fullName || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter a password");
      return;
    }

    setError("");
    try{
      const response = await axiosInstance.post('/auth/create-account', {
        fullName,
        email,
        password
      });
      if(response.data && response.data.error){
        setError(response.data.message)
        return
      }

      if(response.data && response.data.accessToken){
        localStorage.setItem("token", response.data.accessToken)
        navigate('/');
      }
    }catch(error){
      if(error.response && error.response.data && error.response.data.message){
        setError(error.response.data.message);
      }else {
        setError("An unexpected error occured. Please try again.")
      }
    }

  }
  return (
    <div className='flex items-center justify-center mt-28'>
      <div className='w-96 border rounded bg-white px-7 py-10 drop-shadow-md'>
        <form onSubmit={handleRegister}>
          <h4 className='text-2xl mb-7'>SignUp</h4>
          <input type='text' placeholder='Full name' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type='text' placeholder='Email' className='w-full text-sm bg-transparent border-[1.5px] px-5 py-3 rounded mb-4 outline-none' value={email} onChange={(e) => setEmail(e.target.value)} />
          <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)}/>
            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}
          <button type='submit' className='w-full text-sm text-white p-2 rounded my-1 bg-blue-500'>
            Create Account
          </button>
          <p className='text-sm text-center mt-4'>
            Already have an account?{" "}
            <Link to='/' className='font-medium text-primary underline'>
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register