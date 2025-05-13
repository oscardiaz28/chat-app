import { useEffect, useState } from 'react'
import { Navbar } from './components/Navbar'
import {Routes, Route, Navigate} from 'react-router-dom'
import { HomePage } from './pages/HomePage'
import { SignupPage } from './pages/SignupPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { LoginPage } from './pages/LoginPage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import { ProtectedRoute } from './lib/ProtectedRoute'
import { PublicRoute } from './lib/PublicRoute'
import {Toaster} from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

function App() {

  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()
  const {theme} = useThemeStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if(isCheckingAuth && !authUser){
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div  data-theme={theme}>
      { authUser && 
        <Navbar />
      }
      
      <Routes>
        <Route path='/' element={ <ProtectedRoute> <HomePage /> </ProtectedRoute>  } />
        <Route path="/signup" element={ <PublicRoute> <SignupPage /> </PublicRoute> } />
        <Route path="/login" element={ <PublicRoute> <LoginPage /> </PublicRoute> } /> 
        <Route path="/settings" element={ <ProtectedRoute> <SettingsPage /> </ProtectedRoute> } />
        <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> } />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App
