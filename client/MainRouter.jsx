import React, { Component } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './core/Home.jsx'
import Users from './user/Users.jsx'
import Signup from './user/Signup.jsx'
import Signin from './auth/Signin.jsx'
import EditProfile from './user/EditProfile.jsx'
import Profile from './user/Profile.jsx'
import PrivateRoute from './auth/PrivateRoute.jsx'
import Menu from './core/Menu.jsx'
import NewMedia from './media/NewMedia.jsx'
import PlayMedia from './media/PlayMedia.jsx'
import EditMedia from './media/EditMedia.jsx'

const MainRouter = ({ data }) => {
    return (
        <div>
            <Menu />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/users' element={<Users />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/signin' element={<Signin />} />
                <Route
                    path='/user/edit/:userId'
                    element={
                        <PrivateRoute>
                            <EditProfile />
                        </PrivateRoute>
                    }
                />
                <Route path='/user/:userId' element={<Profile />} />

                <Route
                    path='/media/new'
                    element={
                        <PrivateRoute>
                            <NewMedia />
                        </PrivateRoute>
                    }
                />
                <Route
                    path='/media/edit/:mediaId'
                    element={
                        <PrivateRoute>
                            <EditMedia />
                        </PrivateRoute>
                    }
                />
                <Route path='/media/:mediaId' element={<PlayMedia />} />
            </Routes>
        </div>
    )
}

export default MainRouter
