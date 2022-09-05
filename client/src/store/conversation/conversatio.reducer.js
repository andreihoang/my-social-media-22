import { CONVERSATION_ACTION_TYPES } from "./conversation.type";

const INITIAL_STATE = {
    currentChat: null,
    isFetching: false,
    error: null,
}

export const conversationReducer = (state=INITIAL_STATE, action={}) => {
    const {type, payload} = action;
    switch(type) {
        case CONVERSATION_ACTION_TYPES.FETCH_CONVERSATION_START:
            return {
                ...state, isFetching: true,
            }
        case CONVERSATION_ACTION_TYPES.FETCH_CONVERSATION_SUCCESS:
            return {
                ...state, isFetching: false, currentChat: payload
            }
        case CONVERSATION_ACTION_TYPES.FETCH_CONVERSATION_FAILURE:
            return {
                ...state, error: payload
            }
        case CONVERSATION_ACTION_TYPES.SET_CURRENT_CHAT:
            return {
                ...state, currentChat: payload
            }
        default: 
            return state; 
    }
}
