import * as fetch from 'fetch';
import Character from './character.js';
import Move from './move.js';

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

export function loadHitsMap() {
    return loadJson("./assets/data/map_hits.json")
    .then((data) => {
        let hitsMap = {};

        for (let h in data) {
            hitsMap[data[h].i] = data[h].h;
        }

        return hitsMap;
    });
}

export function loadControlsMap() {
    return loadJson("./assets/data/map_ctrls.json")
    .then((ctrlsMap) => {
        return ctrlsMap;
    });
}

export function loadCharacterList() {
    return loadJson("./assets/data/map_chars.json")
    .then((data) => data.map((character) => new Character(character)));
}

export function loadMoveList(characterIndex, lang, ctrlsMap, hitsMap) {
    return loadJson("./assets/data/movelists/MOVELIST_" + characterIndex + ".json")
        .then((data) => parseMoveList(data, lang, ctrlsMap, hitsMap));
}

function parseMoveList(data, lang, ctrlsMap, hitsMap) {
    return data.moves.map((move) => {
        return new Move(move, lang, ctrlsMap, hitsMap);
    });
}

