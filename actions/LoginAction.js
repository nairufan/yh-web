/**
 * Created by nairu on 2016/10/25.
 */
import {fetch} from '../utils/fetch';

const fetchPosts = reddit => dispatch => {
    dispatch(requestPosts(reddit))
    return fetch(`https://www.reddit.com/r/${reddit}.json`)
        .then(response => response.json())
        .then(json => dispatch(receivePosts(reddit, json)))
}

const shouldFetchPosts = (state, reddit) => {
    const posts = state.postsByReddit[reddit]
    if (!posts) {
        return true
    }
    if (posts.isFetching) {
        return false
    }
    return posts.didInvalidate
}

export const fetchPostsIfNeeded = reddit => (dispatch, getState) => {
    if (shouldFetchPosts(getState(), reddit)) {
        return dispatch(fetchPosts(reddit))
    }
}