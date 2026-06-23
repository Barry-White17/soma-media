import React from 'react'
import auth from './auth-helper.js'

const PrivateRoute = ({ children }) => {
    if (auth.isAuthenticated()) {
        return children
    }
    if (!auth.isAuthenticated) {
        return
    }
}

export default PrivateRoute
