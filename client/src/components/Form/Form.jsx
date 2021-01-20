import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

import useStyle from './styles'

import { createPost, updatePost } from '../../actions/posts'

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyle()
    const dispatch = useDispatch()
    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)

    const [postData, setPostData] = useState({
        creator: '', title: '', message: '', tags: [],
        selectedFile: ' '
    })

    useEffect(() => {
        if (post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if (emptyFieldValidation()) {

            if (currentId) dispatch(updatePost(currentId, postData))
            else dispatch(createPost(postData))
            clear()

        } else alert('Please fill all the fields.')
    }

    const emptyFieldValidation = () => {
        // return TRUE if all field are filled.

        console.log(postData.creator.trim() !== '',
            postData.title.trim() !== '',
            postData.message.trim() !== '',
            postData.tags.length !== 0,
            postData.selectedFile)

        return (postData.creator.trim() !== '' &&
            postData.title.trim() !== '' &&
            postData.message.trim() !== '' &&
            postData.tags.length !== 0 &&
            postData.selectedFile.trim() !== '')

    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
            creator: '', title: '', message: '', tags: [],
            selectedFile: ''
        })
    }

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography
                    variant="h6">{currentId ? 'Editing' : 'Creating'} a Memory</Typography>
                <TextField
                    required={true}
                    id="standard-required"
                    name="creator"
                    variant="outlined"
                    label="Creator"
                    fullWidth value={postData.creator}
                    onChange={(e) => setPostData({ ...postData, creator: e.target.value })}
                />
                <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
                <TextField name="message" variant="outlined" label="Message" fullWidth multiline rows={4} value={postData.message} onChange={(e) => setPostData({ ...postData, message: e.target.value })} required />
                <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })} required />
                <div className={classes.fileInput}>
                    <FileBase
                        type="file"
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
                    />
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>{currentId ? 'Update' : 'Submit'}</Button>
                <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form