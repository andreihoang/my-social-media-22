import { POST_ACTION_TYPES } from "./post.type";

const INITIAL_STATE = {
    posts: [],
    currentPost: null,
    isFetching: false,
    error: null,
}

export const postsReducer = (state=INITIAL_STATE, action={}) => {
    const {type, payload} = action;
    switch(type) {
        case POST_ACTION_TYPES.ADD_NEW_POST:
            return {
                ...state, 
                posts: [...state.posts, payload]
            } 
        case POST_ACTION_TYPES.FETCH_POST_START:
            return {
                ...state,
                isFetching: true,
            }
        case POST_ACTION_TYPES.FETCH_POST_SUCCESS:
            return {
                ...state,
                posts: payload, 
                isFetching: false
            }
        case POST_ACTION_TYPES.FETCH_POST_FAILURE:
            return {...state, error: payload} 

        case POST_ACTION_TYPES.REMOVE_POST:
            return {
                ...state, 
                posts: payload
            }
        case POST_ACTION_TYPES.SET_CURRENT_POST:
            return {
                ...state, 
                currentPost: payload
            }
        default: 
            return state; 
    }
}
