import React, { useState, useEffect } from 'react'
import { makeStyles } from 'tss-react/mui'
import Paper from '@mui/material/Paper'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Edit from '@mui/icons-material/Edit'
import Person from '@mui/icons-material/Person'
import Divider from '@mui/material/Divider'
import DeleteUser from './DeleteUser.jsx'
import auth from '../auth/auth-helper.js'
import { read } from './api-user.js'
import { Navigate, Link } from 'react-router-dom'
import { listByUser } from '../media/api-media.js'
import MediaList from '../media/MediaList.jsx'
import { useParams } from 'react-router-dom'

// TODO jss-to-tss-react codemod: Unable to handle style definition reliably. Unsupported arrow function syntax.
//Unexpected value type of CallExpression.
const useStyles = makeStyles()((theme) => ({
    root: {
        maxWidth: 600,
        margin: 'auto',
        padding: theme.spacing(3),
        marginTop: theme.spacing(5),
    },
    title: {
        marginTop: theme.spacing(3),
        color: theme.palette.protectedTitle,
    },
    avatar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
    },
}))

export default function Profile() {
    const { classes } = useStyles()
    const { userId } = useParams()
    const [user, setUser] = useState({})
    const [redirectToSignin, setRedirectToSignin] = useState(false)
    const jwt = auth.isAuthenticated()
    const [media, setMedia] = useState([])

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
                setRedirectToSignin(true)
            } else {
                setUser(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [userId])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listByUser(
            {
                userId: userId,
            },
            { t: jwt.token },
            signal,
        ).then((data) => {
            if (data && data.error) {
                setRedirectToSignin(true)
            } else {
                setMedia(data)
            }
        })

        return function cleanup() {
            abortController.abort()
        }
    }, [userId])

    if (redirectToSignin) {
        return <Navigate to='/signin' />
    }
    return (
        <Paper className={classes.root} elevation={4}>
            <Typography variant='h6' className={classes.title}>
                Profile
            </Typography>
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                            {user.name && user.name[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={user.name} secondary={user.email} />{' '}
                    {auth.isAuthenticated().user &&
                        auth.isAuthenticated().user._id == user._id && (
                            <ListItemSecondaryAction>
                                <Link to={'/user/edit/' + user._id}>
                                    <IconButton
                                        aria-label='Edit'
                                        color='primary'
                                        size='large'
                                    >
                                        <Edit />
                                    </IconButton>
                                </Link>
                                <DeleteUser userId={user._id} />
                            </ListItemSecondaryAction>
                        )}
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText
                        primary={
                            'Joined: ' + new Date(user.created).toDateString()
                        }
                    />
                </ListItem>
                <MediaList media={media} />
            </List>
        </Paper>
    )
}
