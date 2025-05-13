import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate } from 'react-router-dom'

export const PublicRoute = ( {children} ) => {

  const { authUser } = useAuthStore()

  return !authUser ? children : <Navigate to="/" /> 

}
