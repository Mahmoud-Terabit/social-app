
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
import { useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { FaEye } from "react-icons/fa";


export default function Register() {

  let navigate = useNavigate()
  const [isloading, setisLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showRePassword, setShowRePassword] = useState(false)

  let sechema = z.object({
    name: z.string().min(3, "name must be at least 3 characters").max(20, "name must be less than 20 characters"),
    email: z.email("invalid email address"),
    password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, "password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, one number and one special character"),
    rePassword: z.string(),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((date)=>{
      const userDate = new Date(date)
      const nowDate = new Date()
      nowDate.setHours(0,0,0,0)
      return userDate < nowDate 
    } , "date of birth must be in the past" ) ,
    gender: z.enum(["male","female"], "gender must be either male or female")
  }).refine((obj)=> obj.password === obj.rePassword , {
    error: "passwords don't match", path: ["rePassword"]} )


  const form = useForm(
    {
      mode: "onBlur",
      defaultValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        dateOfBirth: '',
        gender: ''
      },
      resolver: zodResolver(sechema)
    }
  )
  let { register, handleSubmit , formState } = form

  async function handleRegister(data) {
    console.log(data);
    try {
      setisLoading(true)
      let response = await axios.post("https://route-posts.routemisr.com/users/signup", data)
      console.log("API Response:", response);
      if(response.data.success == true) {
        Swal.fire({
          title: 'Success!',
          text: 'Registration completed successfully',
          icon: 'success',
          confirmButtonText: 'ok'
        }).then((result)=>{
          if(result.isConfirmed) {
            setTimeout(()=>{
              navigate("/login")
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
        <h1 className='text-3xl  font-bold text-center mt-10 text-blue-400'>Register Page</h1>
        <form className='my-[2.5%]' onSubmit={handleSubmit(handleRegister)} >
          {/* --------- name --------- */}
          <div className="relative flex w-[40%] mx-auto my-4">
            <input {...register("name")} type="text" id="name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
            <label htmlFor="name" className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              Enter your name</label>
          {formState.errors.name && <Alert color="danger" title={formState.errors.name.message} />}
          </div>
          {/* --------- email --------- */}
          <div className="relative flex w-[40%] mx-auto my-4">
            <input {...register("email")} type="email" id="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
            <label htmlFor="email" className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              Enter your email</label>
              {formState.errors.email && <Alert color="danger" title={formState.errors.email.message} />}
          </div>
          {/* --------- password --------- */}
          <div className="relative flex w-[40%] mx-auto my-4">
            <span className="absolute right-3 top-4 cursor-pointer" onClick={() => setShowPassword(!showPassword)}><FaEye /></span>
            <input {...register("password")} type={showPassword ? "text" : "password"} id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
            <label htmlFor="password" className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              Enter your password</label>
              {formState.errors.password && <Alert color="danger" title={formState.errors.password.message} />}
          </div>
          {/* --------- re-password --------- */}
          <div className="relative flex w-[40%] mx-auto my-4">
              <span className="absolute right-3 top-4 cursor-pointer" onClick={() => setShowRePassword(!showRePassword)}><FaEye /></span>
            <input {...register("rePassword")} type={showRePassword ? "text" : "password"} id="RePassword" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
            <label htmlFor="RePassword" className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              Re-enter your password</label>
              {formState.errors.rePassword && <Alert color="danger" title={formState.errors.rePassword.message} />}
          </div>
          {/* --------- date of birth --------- */}
          <div className="relative flex w-[40%] mx-auto my-4">
            <input {...register("dateOfBirth")} type="date" id="dateOfBirth" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border-1 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " />
            <label htmlFor="dateOfBirth" className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
              Enter your date of birth</label>
              {formState.errors.dateOfBirth && <Alert color="danger" title={formState.errors.dateOfBirth.message} />}
          </div>
          {/* --------- gender --------- */}
          <div className='flex items-center w-[40%] mx-auto my-4'>
            <div className="flex items-center me-10">
              <input {...register("gender")} defaultChecked id="male" type="radio" value="male" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" />
              <label htmlFor="male" className="select-none ms-2 text-sm font-medium text-heading">male</label>
            </div>
            <div className="flex items-center">
              <input {...register("gender")} id="female" type="radio" value="female" className="w-4 h-4 text-neutral-primary border-default-medium bg-neutral-secondary-medium rounded-full checked:border-brand focus:ring-2 focus:outline-none focus:ring-brand-subtle border border-default appearance-none" />
              <label htmlFor="female" className="select-none ms-2 text-sm font-medium text-heading">female</label>
              {formState.errors.gender && <Alert color="danger" title={formState.errors.gender.message} />}
            </div>
          </div>

          <div className='flex items-center w-[40%] mx-auto my-4'>
            <Button disabled={isloading==true} type='submit' color="primary" className={`${isloading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} >  {isloading ? <ImSpinner9 className="animate-spin text-xl" /> : "Register"}  </Button>
            <span className='mx-3'>have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link></span>
          </div>

        </form>
      </div>

    </>
  )
}
