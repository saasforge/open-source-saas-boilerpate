import {UPDATE_USERNAME} from '../action-types';

export function updateUserName(newName) {
    return { type: UPDATE_USERNAME, newName }
};