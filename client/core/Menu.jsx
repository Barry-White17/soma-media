import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import HomeIcon from '@mui/icons-material/Home'
import AddBoxIcon from '@mui/icons-material/AddBox'
import Button from '@mui/material/Button'
import auth from '../auth/auth-helper'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const isActive = (history, path) => {
    if (history.pathname == path) return { color: '#f99085' }
    else return { color: '#efdcd5' }
}
const Menu = () => {
    const history = useLocation()
    const navigate = useNavigate()
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography type='title' color='inherit'>
                    Soma Media
                </Typography>
                <div>
                    <Link to='/'>
                        <IconButton
                            aria-label='Home'
                            style={isActive(history, '/')}
                            size='large'
                        >
                            <HomeIcon />
                        </IconButton>
                    </Link>
                </div>
                <div style={{ position: 'absolute', right: '10px' }}>
                    <span style={{ float: 'right' }}>
                        {!auth.isAuthenticated() && (
                            <span>
                                <Link to='/signup'>
                                    <Button
                                        style={isActive(history, '/signup')}
                                    >
                                        Sign up
                                    </Button>
                                </Link>
                                <Link to='/signin'>
                                    <Button
                                        style={isActive(history, '/signin')}
                                    >
                                        Sign In
                                    </Button>
                                </Link>
                            </span>
                        )}
                        {auth.isAuthenticated() && (
                            <span>
                                <Link to='/media/new'>
                                    <Button
                                        style={isActive(history, '/media/new')}
                                    >
                                        <AddBoxIcon
                                            style={{ marginRight: '8px' }}
                                        />{' '}
                                        Add Media
                                    </Button>
                                </Link>
                                <Link
                                    to={
                                        '/user/' +
                                        auth.isAuthenticated().user._id
                                    }
                                >
                                    <Button
                                        style={isActive(
                                            history,
                                            '/user/' +
                                                auth.isAuthenticated().user._id,
                                        )}
                                    >
                                        My Profile
                                    </Button>
                                </Link>
                                <Button
                                    color='inherit'
                                    onClick={() => {
                                        auth.signout(() => navigate('/'))
                                    }}
                                >
                                    Sign out
                                </Button>
                            </span>
                        )}
                    </span>
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default Menu
