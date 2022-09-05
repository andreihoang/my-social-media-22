import { CONVERSATION_ACTION_TYPES } from "./conversation.type";


export const fetchConversationStart = () => {
    return {
        type: CONVERSATION_ACTION_TYPES.FETCH_CONVERSATION_START
    }
}

export const fetchConversationSuccess = (conversation) => {
    return {
        type: CONVERSATION_ACTION_TYPES.FETCH_CONVERSATION_SUCCESS,
        payload: conversation
    }
}

export const fetchConversationFailure = (error) => {
    return {
        type: CONVERSATION_ACTION_TYPES.FETCH_CONVERSATION_FAILURE,
        payload: error
    }
}

export const setCurrentChat = (currentChat) => {
    return {
        type: CONVERSATION_ACTION_TYPES.SET_CURRENT_CHAT,
        payload: currentChat
    }
}