import {
    CREATE,
    FETCH_ALL,
    DELETE,
    UPDATE,
    LIKE_POST
} from '../constants/actionTypes'
import * as api from '../api'

// Action Creators

export const getPosts = () => async(dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        dispatch({
            type: FETCH_ALL,
            payload: data
        })
    } catch (error) {
        console.log('ERROR [action/posts.js/getPosts] => ', error.message)
    }
}

export const createPost = (post) => async(dispatch) => {
    try {
        // console.log('post at action => ', post)
        const { data } = await api.createPost(post)
            // console.log('data => ', data)
        dispatch({
            type: CREATE,
            payload: data
        })
    } catch (error) {
        console.log('ERROR [action/posts.js/createPost] => ', error.message)
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({
            type: UPDATE,
            payload: data
        })
    } catch (error) {
        console.log('ERROR [action/posts.js/updatePost] => ', error.message)
    }
}

export const deletePost = (_id) => async(dispatch) => {
    try {
        // console.log(_id)
        await api.deletePost(_id)
        dispatch({
            type: DELETE,
            payload: { _id }
        })
    } catch (error) {
        console.log('ERROR [action/posts.js/deletePost] => ', error)
    }
}

export const likePost = (_id) => async(dispatch) => {
    try {
        const { data } = await api.likePost(_id)
        dispatch({
            type: LIKE_POST,
            payload: data
        })
    } catch (error) {
        console.log('ERROR [action/posts.js/likePost] => ', error)
    }
}