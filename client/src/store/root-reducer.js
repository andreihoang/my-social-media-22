import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";
import { postsReducer } from "./post/post.reducer";
import { conversationReducer } from "./conversation/conversatio.reducer";


export const rootReducer = combineReducers({
    user: userReducer,
    posts: postsReducer,
    conversation: conversationReducer,
});