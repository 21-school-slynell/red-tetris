export interface ActionProps<T = any> {
    type: string;
    payload?: T;
}

export enum AUTH {
    SET = 'AUTH/SET',
    CLEAR = 'AUTH/CLEAR',
}

export enum THEME {
    CHANGE_TYPE = 'THEME/CHANGE_TYPE',
}

export enum PROFILE {
    SET = 'PROFILE/SET',
    CLEAR = 'PROFILE/CLEAR',
}

export enum SNACKBAR {
    SHOW_SNACKBAR = 'SHOW_SNACKBAR',
    HIDE_SNACKBAR = 'HIDE_SNACKBAR',
}

export enum LEADERBOARD {
    SET = 'LEADERBOARD/SET',
    CLEAR = 'LEADERBOARD/CLEAR',
}

export enum OAUTH {
    SET_ID = 'OAUTH/SET_ID',
    SET_URL = 'OAUTH/SET_URL',
    SET_CODE = 'OAUTH/SET_CODE',
    CLEAR_CODE = 'OAUTH/CLEAR_CODE',
}

export enum NOTIFICATION {
    ALLOWED = 'NOTIFICATION/ALLOWED',
}

export enum FORUM {
    SET = 'FORUM/SET',
    // SET_TOPIC = 'FORUM/SET_TOPIC',
    // CLEAR_TOPIC = 'FORUM/CLEAR_TOPIC',
    CREATE_TOPIC = 'FORUM/CREATE_TOPIC',
    DELETE_TOPIC = 'FORUM/DELETE_TOPIC',
    // ADD_COMMENT = 'FORUM/ADD_COMMENT',
    // REMOVE_COMMENT = 'FORUM/REMOVE_COMMENT',
    CLEAR = 'FORUM/CLEAR',
}

export enum TOPIC {
    SET = 'TOPIC/SET',
    CLEAR = 'TOPIC/CLEAR',
    ADD_COMMENT = 'TOPIC/ADD_COMMENT',
    REMOVE_COMMENT = 'TOPIC/REMOVE_COMMENT',
}

const namespaceGame = 'GAME';

export const GAME = {
    SET_ROOMS: `${namespaceGame}/SET_ROOMS`,
    GET_ROOMS: `${namespaceGame}/GET_ROOMS`,
};
