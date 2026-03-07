
import { Input } from "@heroui/input";
import { Button } from "@heroui/react";
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import z, { set } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {Alert} from "@heroui/alert";
import axios from "axios";
import Swal from "sweetalert2";
import { is } from "zod/locales";
import { useContext, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { FaEye } from "react-icons/fa";
import { UserContext } from "../context/UserContext";

export default function Login() {


  let contextToken = useContext(UserContext)
  console.log(contextToken);
  

  

  let navigate = useNavigate()
  const [isloading, setisLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  let sechema = z.object({
    email: z.email("invalid email address"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character"),
  })


  const form = useForm({
    mode: "onBlur", 
      defaultValues: {
        email: '',
        password: '',
      },
      resolver: zodResolver(sechema)
    }
  )
  let { register, handleSubmit , formState } = form

  async function handleLogin(dataValues) {
    // console.log(data);
    try {
      setisLoading(true)
      let response = await axios.post("https://route-posts.routemisr.com/users/signin", dataValues)
      console.log("API Response:", response);
      // console.log("heelo");
      localStorage.setItem("userToken", response.data.data.token)
      contextToken.setToken(response.data.data.token)
      if(response.data.success == true) {
        Swal.fire({
          title: 'Success!',
          text: 'Login completed successfully',
          icon: 'success',
          confirmButtonText: 'ok'
        }).then((result)=>{
          if(result.isConfirmed) {
            setTimeout(()=>{
              navigate("/")
            }, 1000);
          }
        })
        setisLoading(false)
      }
    } catch (error) {
      console.log(error.response);
      Swal.fire({
          title: 'Error!',
          text: error.response.data.message || "Registration failed",
          icon: 'error',
          confirmButtonText: 'ok'
        })
      }
      finally{
        setisLoading(false)
      }
    }

  return (
    <>
      <div>
        <h1 className='text-3xl  font-bold text-center mt-10 text-blue-400'>Login Page</h1>
        <form className='my-[2.5%]' onSubmit={handleSubmit((dataValues) => handleLogin(dataValues))} >

          {/* --------- email --------- */}
          <div className="relative flex w-[40%] mx-auto my-4">
            <input {...register("email")} type="email" id="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
            <label htmlFor="email" className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              Enter your email</label>
              {/* {formState.errors.email && <Alert color="danger" title={formState.errors.email.message} />} */}
          </div>
          <div className="relative flex w-[40%] mx-auto my-4">
              {formState.errors.email && <Alert color="danger" title={formState.errors.email.message} />}
          </div>  
          {/* --------- password --------- */}
          <div className="relative flex w-[40%] mx-auto my-4">
            <span className="absolute right-3 top-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}><FaEye /></span>
            <input {...register("password")} type={showPassword ? "text" : "password"} id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
            <label htmlFor="password" className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              Enter your password</label>
              {/* {formState.errors.password && <Alert color="danger" title={formState.errors.password.message} />} */}
          </div>
          <div className="relative flex w-[40%] mx-auto my-4">
              {formState.errors.email && <Alert color="danger" title={formState.errors.email.message} />}
          </div> 
          {/* --------- end of input fields --------- */}

          <div className='flex items-center w-[40%] mx-auto my-4'>
            <Button disabled={isloading==true} type='submit' color="primary" className={`${isloading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} >  {isloading ? <ImSpinner9 className="animate-spin text-xl" /> : "Login"}  </Button>
            <span className='mx-3'>have an account? <Link to="/register" className="text-blue-500 hover:underline">Register</Link></span>
          </div>

        </form>
      </div>
    </>
  )
}

