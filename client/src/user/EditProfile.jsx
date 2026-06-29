import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import Icon from '@mui/material/Icon'
import { makeStyles } from 'tss-react/mui'
import auth from '../auth/auth-helper.js'
import { read, update } from './api-user.js'
import { Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const useStyles = makeStyles()((theme) => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
    },
    error: {
        verticalAlign: 'middle',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
    },
}))

export default function EditProfile() {
    const { classes } = useStyles()
    const { userId } = useParams()
    const [values, setValues] = useState({
        name: '',
        password: '',
        email: '',
        open: false,
        error: '',
        redirectToProfile: false,
    })
    const jwt = auth.isAuthenticated()
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        read(
            {
                userId: userId,
            },
            { t: jwt.token },
            signal,
        ).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, name: data.name, email: data.email })
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [userId])

    const clickSubmit = () => {
        const user = {
            name: values.name || undefined,
            email: values.email || undefined,
            password: values.password || undefined,
        }
        update(
            {
                userId: userId,
            },
            {
                t: jwt.token,
            },
            user,
        ).then((data) => {
            if (data && data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    userId: data._id,
                    redirectToProfile: true,
                })
            }
        })
    }
    const handleChange = (name) => (event) => {
        setValues({ ...values, [name]: event.target.value })
    }

    if (values.redirectToProfile) {
        return <Navigate to={'/user/' + values.userId} />
    }
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant='h6' className={classes.title}>
                    Edit Profile
                </Typography>
                <TextField
                    id='name'
                    label='Name'
                    className={classes.textField}
                    value={values.name}
                    onChange={handleChange('name')}
                    margin='normal'
                />
                <br />
                <TextField
                    id='email'
                    type='email'
                    label='Email'
                    className={classes.textField}
                    value={values.email}
                    onChange={handleChange('email')}
                    margin='normal'
                />
                <br />
                <TextField
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    label='Password'
                    className={classes.textField}
                    value={values.password}
                    onChange={handleChange('password')}
                    margin='normal'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end'>
                                <IconButton onClick={handleShowPassword}>
                                    {showPassword ? (
                                        <Visibility />
                                    ) : (
                                        <VisibilityOff />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <br />{' '}
                {values.error && (
                    <Typography component='p' color='error'>
                        <Icon color='error' className={classes.error}>
                            error
                        </Icon>
                        {values.error}
                    </Typography>
                )}
            </CardContent>
            <CardActions>
                <Button
                    color='primary'
                    variant='contained'
                    onClick={clickSubmit}
                    className={classes.submit}
                >
                    Submit
                </Button>
            </CardActions>
        </Card>
    )
}
