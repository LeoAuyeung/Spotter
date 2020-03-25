import { combineReducers } from "redux";
import gitReducer from "./gitReducer";

const rootReducer = combineReducers({
	git: gitReducer
});

export default rootReducer;
