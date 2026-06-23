import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from 'tss-react/mui'
import ImageList from '@mui/material/ImageList'
import ImageListItemBar from '@mui/material/ImageListItemBar'
import ImageListItem from '@mui/material/ImageListItem'
import { Link } from 'react-router-dom'
import ReactPlayer from 'react-player'
import config from './../../config.js'

const useStyles = makeStyles()((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        background: theme.palette.background.paper,
        textAlign: 'left',
        padding: '8px 16px',
    },
    gridList: {
        width: '100%',
        minHeight: 180,
        padding: '0px 0 10px',
    },
    title: {
        padding: `${theme.spacing(3)} ${theme.spacing(2.5)} ${theme.spacing(
            2,
        )}`,
        color: theme.palette.openTitle,
        width: '100%',
    },
    tile: {
        textAlign: 'center',
        maxHeight: '100%',
    },
    tileBar: {
        backgroundColor: 'rgba(0, 0, 0, 0.72)',
        textAlign: 'left',
        height: '55px',
    },
    tileTitle: {
        fontSize: '1.1em',
        marginBottom: '5px',
        color: 'rgb(193, 173, 144)',
        display: 'block',
    },
    tileGenre: {
        float: 'right',
        color: 'rgb(193, 182, 164)',
        marginRight: '8px',
    },
}))

export default function MediaList(props) {
    const { classes } = useStyles()
    return (
        <div className={classes.root}>
            <ImageList className={classes.gridList} cols={3}>
                {props.media.map((tile, i) => (
                    <ImageListItem key={i} className={classes.tile}>
                        <Link to={'/media/' + tile._id}>
                            <ReactPlayer
                                url={
                                    `${config.BACKEND_URL}/api/media/video/` +
                                    tile._id
                                }
                                width='100%'
                                height='inherit'
                                style={{ maxHeight: '100%' }}
                            />
                        </Link>
                        <ImageListItemBar
                            className={classes.tileBar}
                            title={
                                <Link
                                    to={'/media/' + tile._id}
                                    className={classes.tileTitle}
                                >
                                    {' '}
                                    {tile.title}{' '}
                                </Link>
                            }
                            subtitle={
                                <span>
                                    <span>{tile.views} views</span>
                                    <span className={classes.tileGenre}>
                                        <em>{tile.genre}</em>
                                    </span>
                                </span>
                            }
                        />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    )
}

MediaList.propTypes = {
    media: PropTypes.array.isRequired,
}
