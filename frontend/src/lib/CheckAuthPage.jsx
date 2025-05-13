import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import { Navigate, useLocation } from 'react-router-dom'

export const CheckAuthPage = ( {children} ) => {

  const location = useLocation()
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  if( !authUser && (location.pathname == "/") ){
    return <Navigate to="login" />
  }

  return {children}

}
