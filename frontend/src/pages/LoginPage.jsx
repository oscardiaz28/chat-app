import {useForm} from 'react-hook-form'
import { useAuthStore } from '../store/useAuthStore'
import {Loader2, MessagesSquare, User, Lock, EyeOff, Eye} from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthImagePattern } from '../components/AuthImagePattern'

export const LoginPage = () => {

  const { register, handleSubmit, formState: {errors} } = useForm()
  const {isLoggingIn, login} = useAuthStore()
  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = (data) => {
    login(data)
  }

  return (
    <div className='min-h-screen grid lg:grid-cols-2'>

      {/* left side */}
      <div className='flex items-center justify-center p-6 sm:p-12'>
        <div className="w-full max-w-md space-y-8">

          {/* LOGO */}
          <div className='text-center mb-8'>
              <div className='flex flex-col items-center gap-2 group'>
                  <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                      <MessagesSquare className='size-6 text-primary' />
                  </div>
                  <h1 className='text-2xl font-bold mt-2'>Create Account</h1>
                  <p className='text-base-content/60'>Get started with your free account</p>
              </div>
          </div>

          <form onSubmit={ handleSubmit(onSubmit) } className='space-y-4' >

              <div className='form-control'>
                <label className='label mb-2'>
                    <span className='label-text font-medium'>Email</span>
                </label>
                <div className='relative'>
                    <div className='absolute top-1/2 -translate-y-1/2 pl-3 z-10 '>
                        <User className='size-5 text-base-content/40' />
                    </div>
                    <input 
                    {...register("email", {required: "Email is required"} )}
                    type="email" className={`input input-bordered w-full pl-11`}
                    placeholder='john@example.com' />
                </div>
                {errors.email && 
                <span className='text-sm text-rose-500'>{errors.email.message}</span>}
              </div>

              <div className='form-control'>
                <label className='label mb-2'>
                  <span className='label-text font-medium'>Password</span>
                </label>
                <div className='relative'>
                  <div className='absolute top-1/2 -translate-y-1/2 pl-3 z-10'>
                    <Lock className='size-5 text-base-content/40' />
                  </div>
                  <input 
                  {...register("password", { required: "Password is required"} )}
                  type={ showPassword ? "text" : "password" } className={`input input-bordered w-full pl-11`} 
                  placeholder='*****'
                  />
                  <button 
                  onClick={ () => setShowPassword(!showPassword) }
                  type='button' className='absolute top-1/2 right-0 -translate-y-1/2 pr-3 z-10 cursor-pointer'>
                    {showPassword ? (
                      <EyeOff className='size-5 text-base-content/40' />
                    ) : (
                      <Eye className='size-5 text-base-content/40' />
                    )}
                  </button>
                </div>
                {errors.password && 
                <span className='text-sm text-rose-500'>{errors.password.message}</span>}
              </div>
              
              <button type='submit' className="btn btn-primary w-full" disabled={isLoggingIn}>
                { isLoggingIn ? (
                  <>
                    <Loader2 className='size-5 animate-spin' />
                    Loading...
                  </>
                ) : (
                  "Iniciar Sesión"
                ) }
              </button>

          </form>

          <div className='text-center'>
              <div className='text-base-content/60'>
                Don't you have an account yet?{" "}
                <Link to={"/signup"} className='link link-primary'>
                  Sign up
                </Link>
              </div>
          </div>

        </div>
      </div>

      {/* right side */}
      <AuthImagePattern title="Welcome back!" subtitle="Sign in to continue your conversations and catch up with your messages." />

    </div>
  )
}
