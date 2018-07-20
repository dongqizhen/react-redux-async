import { combineReducers } from 'redux'
import {
    SELECT_SUBREDDIT,
    INVALIDATE_SUBREDDIT,
    REQUEST_POSTS,
    RECEIVE_POSTS
} from '../actions/actions'

function selectedSubreddit(state = 'reactjs', action) {
    switch (action.type) {
        case SELECT_SUBREDDIT:
            return action.subreddit
        default:
            return state
    }
}


/**
 *
 *
 * @param {boolean} [state={ isFetching: false , didInvalidate: false, items: [] }]
 * @param {*} action
 * @returns 修改后的state
 */
function posts(state = { isFetching: false, didInvalidate: false, items: [], lastUpdated: new Date().getTime() }, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
            /* return Object.assign({}, state, {
              didInvalidate: true
            }) */

            return {
                ...state,
                didInvalidate: true
            }

        case REQUEST_POSTS:
            /* return Object.assign({}, state, {
              isFetching: true,
              didInvalidate: false
            }) */

            return {
                ...state,
                isFetching: true,
                didInvalidate: false
            }

        case RECEIVE_POSTS:
            /* return Object.assign({}, state, {
              isFetching: false,
              didInvalidate: false,
              items: action.posts,
              lastUpdated: action.receivedAt
            }) */

            return {
                ...state,
                isFetching: false,
                didInvalidate: false,
                items: action.posts,
                lastUpdated: action.receiveAt
            }

        default:
            return state
    }
}

function postsBySubreddit(state = {}, action) {
    switch (action.type) {
        case INVALIDATE_SUBREDDIT:
        case RECEIVE_POSTS:
        case REQUEST_POSTS:
            /* return Object.assign({}, state, {
              [action.subreddit]: posts(state[action.subreddit], action)
            }) */
            return {
                ...state,
                [action.subreddit]: posts(state[action.subreddit], action)
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit
})

export default rootReducer