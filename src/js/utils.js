import * as fetch from 'fetch';

/**
 * Promise wrapper around fetch
 * @param {string} path
 * @return {Promise}
 */
export function loadJson(path) {
    return fetch(path)
        .then((response) => response.text())
        .then((text) => JSON.parse(text));
}