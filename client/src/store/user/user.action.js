import { USER_ACTION_TYPES } from "./user.type";

export const fetchUserStart = () => {
    return {
        type: USER_ACTION_TYPES.FETCH_USER_START
    }
}

export const fetchUserSuccess = (user) => {
    return {
        type: USER_ACTION_TYPES.FETCH_USER_SUCCESS,
        payload: user
    }
}

export const fetchUserFailure = (error) => {
    return {
        type: USER_ACTION_TYPES.FETCH_USER_FAILURE,
        payload: error
    }
}

export const followUser = (userId) => {
    return {
        type: USER_ACTION_TYPES.FOLLOW_USER,
        payload: userId
    }
}

export const unFollowUser = (userId) => {
    return {
        type: USER_ACTION_TYPES.UNFOLLOW_USER,
        payload: userId
    }
}

export const logout = () => {
    return {
        type: USER_ACTION_TYPES.LOG_OUT,
    }
}



