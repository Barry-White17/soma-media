import React, { useState } from 'react'
import auth from '../auth/auth-helper.js'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import FileUpload from '@mui/icons-material/AddToQueue'
import Icon from '@mui/material/Icon'
import { makeStyles } from 'tss-react/mui'
import { create } from './api-media.js'
import { Navigate } from 'react-router-dom'

const useStyles = makeStyles()((theme) => ({
    card: {
        maxWidth: 500,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
        fontSize: '1em',
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
    input: {
        display: 'none',
    },
    filename: {
        marginLeft: '10px',
    },
}))

export default function NewMedia() {
    const { classes } = useStyles()
    const [values, setValues] = useState({
        title: '',
        video: '',
        description: '',
        genre: '',
        redirect: false,
        error: '',
        mediaId: '',
    })
    const jwt = auth.isAuthenticated()

    const clickSubmit = () => {
        let mediaData = new FormData()
        values.title && mediaData.append('title', values.title)
        values.video && mediaData.append('video', values.video)
        values.description &&
            mediaData.append('description', values.description)
        values.genre && mediaData.append('genre', values.genre)
        create(
            {
                userId: jwt.user._id,
            },
            {
                t: jwt.token,
            },
            mediaData,
        ).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({
                    ...values,
                    error: '',
                    mediaId: data._id,
                    redirect: true,
                })
            }
        })
    }

    const handleChange = (name) => (event) => {
        const value =
            name === 'video' ? event.target.files[0] : event.target.value
        setValues({ ...values, [name]: value })
    }

    if (values.redirect) {
        return <Navigate to={'/media/' + values.mediaId} />
    }
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography
                    type='headline'
                    component='h1'
                    className={classes.title}
                >
                    New Video
                </Typography>
                <input
                    accept='video/*'
                    onChange={handleChange('video')}
                    className={classes.input}
                    id='icon-button-file'
                    type='file'
                />
                <label htmlFor='icon-button-file'>
                    <Button
                        color='secondary'
                        variant='contained'
                        component='span'
                    >
                        Upload
                        <FileUpload />
                    </Button>
                </label>{' '}
                <span className={classes.filename}>
                    {values.video ? values.video.name : ''}
                </span>
                <br />
                <TextField
                    id='title'
                    label='Title'
                    className={classes.textField}
                    value={values.title}
                    onChange={handleChange('title')}
                    margin='normal'
                />
                <br />
                <TextField
                    id='multiline-flexible'
                    label='Description'
                    multiline
                    rows='2'
                    value={values.description}
                    onChange={handleChange('description')}
                    className={classes.textField}
                    margin='normal'
                />
                <br />
                <TextField
                    id='genre'
                    label='Genre'
                    className={classes.textField}
                    value={values.genre}
                    onChange={handleChange('genre')}
                    margin='normal'
                />
                <br />
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
