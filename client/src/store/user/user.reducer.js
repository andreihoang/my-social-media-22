
import { USER_ACTION_TYPES } from "./user.type";

const INITIAL_STATE = {
    currentUser: null,
    isFetching: false,
    error: null,
}

export const userReducer = (state=INITIAL_STATE, action={}) => {
    const {type, payload} = action;
    switch(type) {
        case USER_ACTION_TYPES.FETCH_USER_START:
            return {
                ...state,
                isFetching: true,
            }
        case USER_ACTION_TYPES.FETCH_USER_SUCCESS:
            return {
                ...state,
                currentUser: payload, 
                isFetching: false
            }
        case USER_ACTION_TYPES.FETCH_USER_FAILURE:
            return {...state, error: payload, isFetching: false}
        case USER_ACTION_TYPES.FOLLOW_USER:
            return {...state, currentUser: {
                ...state.currentUser, 
                followings: [...state.currentUser.followings, payload]
            }}  
        case USER_ACTION_TYPES.UNFOLLOW_USER:
            return {...state, 
                currentUser: {
                    ...state.currentUser, 
                    followings: state.currentUser.followings.filter(following => following !== payload)
                }}
        case USER_ACTION_TYPES.LOG_OUT:
            return {
                ...state,
                currentUser: null
            }  
        default: 
            return state; 
    }
}


