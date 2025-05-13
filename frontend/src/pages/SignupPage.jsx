import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Eye, EyeOff, Loader2, Lock, Mail, MessagesSquare, User } from 'lucide-react'
import { Link } from 'react-router-dom'
import { AuthImagePattern } from '../components/AuthImagePattern'
import {useForm} from 'react-hook-form'
import {toast} from 'react-hot-toast'

export const SignupPage = () => {

    const {signup, isSigningUp} = useAuthStore()
    const [showPassword, setShowPassword] = useState(false)

    //inicializacion del hook
    /*
    register -> metodo proporcionado por el hook para vincular (bind) un campo del formulario, lo que permite gestionar su valor y validacion
    handleSubmit -> fn que se ejecuta en el evento onSubmit del form, recoge todos los datos y ejecuta la fn pasada.
    formState -> objeto que contiene informacion sobre el estado actual del form
    */
    const {register, handleSubmit, reset, formState: {errors} } = useForm()

    //funcion que se ejecuta al enviar el formulario
    const onSubmit = async (data) => {
        try{
            await signup(data)
        }catch(err){    
            const msg = err.response?.data.message;
            toast.error(msg)
        }
    }

    return (
        <div className='min-h-screen grid lg:grid-cols-2'>
            {/* left side */}
            <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
                
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
                    
                    {/* Form */}
                    <form onSubmit={ handleSubmit(onSubmit) } className='space-y-6'>
                        <div className='form-control'>
                            <label className='label mb-2'>
                                <span className='label-text font-medium'>Full Name</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute top-1/2 -translate-y-1/2 pl-3 z-10 '>
                                    <User className='size-5 text-base-content/40' />
                                </div>
                                <input 
                                {...register("fullName", {required: "Full Name is required"} )}
                                type="text" className={`input input-bordered w-full pl-11`}
                                placeholder='John Doe' />
                            </div>
                            {errors.fullName && <span className='text-sm text-rose-500'>{errors.fullName.message}</span> }
                        </div>

                        <div className='form-control'>
                            <label className='label mb-2'>
                                <span className='label-text font-medium'>Email</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute top-1/2 -translate-y-1/2 pl-3 z-10 '>
                                    <Mail className='size-5 text-base-content/40' />
                                </div>
                                <input type="email" className={`input input-bordered w-full pl-11`}
                                placeholder='john@example.com'
                                {...register("email", {required: "Email is required"} )}
                                />
                            </div>
                            {errors.email && 
                            <span className='text-sm text-rose-500'>{errors.email.message}</span>}
                        </div>

                        <div className='form-control'>
                            <label className='label mb-2'>
                                <span className='label-text font-medium'>Password</span>
                            </label>
                            <div className='relative'>
                                <div className='absolute top-1/2 -translate-y-1/2 pl-3 z-10 '>
                                    <Lock className='size-5 text-base-content/40' />
                                </div>
                                <input type={ showPassword ? "text" : "password" } className={`input input-bordered w-full pl-11`}
                                placeholder='******'
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 4,
                                        message: "Password must be at least 4 characters"
                                    }
                                })}
                                />
                                <button type='button' 
                                onClick={ () => setShowPassword(!showPassword) }
                                className='absolute z-10 inset-y-0 right-0 pr-3 flex items-center cursor-pointer'>
                                { showPassword ? (
                                    <EyeOff className='size-5 text-base-content/40' />
                                ) : (
                                    <Eye className='size-5 text-base-content/40' />
                                ) }       
                                </button>
                            </div>
                            {errors.password && 
                            <span className='text-sm text-rose-500'>{errors.password.message}</span>}
                        </div>

                        <button
                        type='submit'
                        className='btn btn-primary w-full'
                        disabled={isSigningUp}
                        >
                            { isSigningUp ? (
                                <>
                                    <Loader2 className='size-5 animate-spin' />
                                    Loading...
                                </>
                            ) : (
                                "Create Account"
                            ) }
                        </button>
                    </form>
                    
                    <div className="text-center">
                        <div className="text-base-content/60">
                            Already have an account?{" "}
                            <Link to="/login" className='link link-primary' >
                                Sign in
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            {/* right side */}
            <AuthImagePattern
            title="Join our community"
            subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
            />

        </div>
    )

}
