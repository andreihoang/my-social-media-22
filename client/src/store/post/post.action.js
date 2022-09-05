import { POST_ACTION_TYPES } from "./post.type"

export const fetchPostStart = () => {
    return {
        type: POST_ACTION_TYPES.FETCH_POST_START
    }
}

export const fetchPostSuccess = (post) => {
    return {
        type: POST_ACTION_TYPES.FETCH_POST_SUCCESS,
        payload: post
    }
}

export const fetchPostFailure = (error) => {
    return {
        type: POST_ACTION_TYPES.FETCH_POST_FAILURE,
        payload: error
    }
}

export const addNewPost = (post) => {
    return {
        type: POST_ACTION_TYPES.ADD_NEW_POST,
        payload: post
    }
}


export const deletePost = (posts ,postId) => {
    const newPosts = posts.filter(post => post._id !== postId);
    return {
        type: POST_ACTION_TYPES.REMOVE_POST,
        payload: newPosts
    }
}

export const setCurrentPost = (post) => {
    return {
        type: POST_ACTION_TYPES.SET_CURRENT_POST,
        payload: post
    }
}


