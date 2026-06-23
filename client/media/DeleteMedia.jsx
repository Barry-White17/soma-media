import React, { useState } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import DeleteIcon from '@mui/icons-material/Delete'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import auth from '../auth/auth-helper.js'
import { remove } from './api-media.js'
import { Navigate } from 'react-router-dom'

export default function DeleteMedia(props) {
    const [open, setOpen] = useState(false)
    const [redirect, setRedirect] = useState(false)

    const jwt = auth.isAuthenticated()
    const clickButton = () => {
        setOpen(true)
    }
    const deleteMedia = () => {
        const jwt = auth.isAuthenticated()
        remove(
            {
                mediaId: props.mediaId,
            },
            { t: jwt.token },
        ).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setRedirect(true)
            }
        })
    }
    const handleRequestClose = () => {
        setOpen(false)
    }
    if (redirect) {
        return <Navigate to='/' />
    }
    return (
        <span>
            <IconButton
                aria-label='Delete'
                onClick={clickButton}
                color='secondary'
                size='large'
            >
                <DeleteIcon />
            </IconButton>
            <Dialog open={open} onClose={handleRequestClose}>
                <DialogTitle>{'Delete ' + props.mediaTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Confirm to delete {props.mediaTitle} from your account.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleRequestClose} color='primary'>
                        Cancel
                    </Button>
                    <Button
                        onClick={deleteMedia}
                        variant='contained'
                        color='secondary'
                        autoFocus='autoFocus'
                    >
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </span>
    )
}

DeleteMedia.propTypes = {
    mediaId: PropTypes.string.isRequired,
    mediaTitle: PropTypes.string.isRequired,
}
