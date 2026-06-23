import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from 'tss-react/mui'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import Edit from '@mui/icons-material/Edit'
import Avatar from '@mui/material/Avatar'
import auth from '../auth/auth-helper'
import { Link } from 'react-router-dom'
import Divider from '@mui/material/Divider'
import DeleteMedia from './DeleteMedia.jsx'
import MediaPlayer from './MediaPlayer.jsx'
import config from './../../config.js'

const useStyles = makeStyles()((theme) => ({
    card: {
        padding: '20px',
    },
    header: {
        padding: '0px 16px 16px 12px',
    },
    action: {
        margin: '24px 20px 0px 0px',
        display: 'inline-block',
        fontSize: '1.15em',
        color: theme.palette.secondary.dark,
    },
    avatar: {
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light,
    },
}))

export default function Media(props) {
    const { classes } = useStyles()
    const mediaUrl = props.media._id
        ? `${config.BACKEND_URL}/api/media/video/${props.media._id}`
        : null
    const nextUrl = props.nextUrl
    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.header}
                title={props.media.title}
                action={
                    <span className={classes.action}>
                        {props.media.views + ' views'}
                    </span>
                }
                subheader={props.media.genre}
            />
            <MediaPlayer
                srcUrl={mediaUrl}
                nextUrl={nextUrl}
                handleAutoplay={props.handleAutoplay}
            />
            <List dense>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar className={classes.avatar}>
                            {props.media.postedBy.name &&
                                props.media.postedBy.name[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={props.media.postedBy.name}
                        secondary={
                            'Published on ' +
                            new Date(props.media.created).toDateString()
                        }
                    />
                    {auth.isAuthenticated().user &&
                        auth.isAuthenticated().user._id ==
                            props.media.postedBy._id && (
                            <ListItemSecondaryAction>
                                <Link to={'/media/edit/' + props.media._id}>
                                    <IconButton
                                        aria-label='Edit'
                                        color='secondary'
                                        size='large'
                                    >
                                        <Edit />
                                    </IconButton>
                                </Link>
                                <DeleteMedia
                                    mediaId={props.media._id}
                                    mediaTitle={props.media.title}
                                />
                            </ListItemSecondaryAction>
                        )}
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemText primary={props.media.description} />
                </ListItem>
            </List>
        </Card>
    )
}

Media.propTypes = {
    media: PropTypes.object,
    nextUrl: PropTypes.string,
    handleAutoplay: PropTypes.func.isRequired,
}
