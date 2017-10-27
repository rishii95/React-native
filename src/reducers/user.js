import {LOGIN_SUCCESS} from '../actions';
import {LOGOUT} from '../actions';


// let cloneObject =function(obj){
//     return JSON.parse(JSON.stringify(obj))
// }

// let newState={user:{loggedIn:false}};
const initialState={
    userLoggedIn:false
};
export default function(state=initialState,action){
    switch(action.type){
     case LOGIN_SUCCESS:
        // state.userLoggedIn=true;
        return Object.assign({}, state, {
            userLoggedIn: true
        });
    case LOGOUT:
        // state.userLoggedIn=true;
        return Object.assign({}, state, {
            userLoggedIn: false
        });
    default:
     return state;
        
    }
};