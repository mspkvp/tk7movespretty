import * as Utils from './utils.js';
import Cookies from 'cookies';

export const actions = {
    INITIALIZE_APP: 'initialize',

    FETCH_HITS_MAP: 'fetchHitsMap',
    FETCH_CONTROLS_MAP: 'fetchControlsMap',
    FETCH_MOVE_LIST: 'fetchMoveList',
    FETCH_CHARACTER_LIST: 'fetchCharacterList',

    SELECT_CHARACTER: 'selectCharacter',
    SELECT_CHARACTER_BY_SLUG: 'selectCharacterBySlug'
};

export const mutations = {
    TOGGLE_PREFERENCES_DIALOG: 'togglePreferencesDialog',
    TOGGLE_FILTERS_DIALOG: 'toggleFiltersDialog',
    TOGGLE_CHARACTER_LIST: 'toggleCharacterList',

    UPDATE_PREFERENCES: 'updatePreferences',
    UPDATE_FILTERS: 'updateFilters',

    SET_HITS_MAP: 'loadHitsMap',
    SET_CONTROLS_MAP: 'loadControlsMap',
    SET_MOVELIST: 'loadMoveList',
    SET_CHARACTER_LIST: 'loadCharacterList',
    SET_LOADING_MOVE_LIST: 'loadingMoveList',
    SELECT_CHARACTER: 'selectCharacter',
};

export const store = {
    state: {
        selectedCharacter: 32,
        characterList: [],
        language: 1,
        hitsMap: {},
        controlsMap: {},
        moveList: [],
        showCharacterList: true,
        loadingMoveList: false,
        preferences: {
            languages: {
                1:  'English',
    			6:  'Deutsch',
    			4:  'Français',
    			5:  'Italiano',
    			11: '한국어',
				7:  'Español',
				10: '繁體中文',
				8:  'русский',
				0:  '日本語',
				9:  'العر',
				3:  'Português-Brasil',
            },

            language: 1,

            buttonLayouts: [
                {
                    value: "STEAM",
                    text: "Arcade/Steam"
                },
                {
                    value: "PS4",
                    text: "Playstation"
                },
                {
                    value: "XBOX",
                    text: "Xbox"
                },
            ],

            buttonLayout: "PS4",

            showDialog: false,
        },
        filters: {
            moveName: '',

            moveString: '',

            specialProperties: {
                spin: false,
                armor: false,
                track: false,
            },

            frameProperties: {
                start: {
                    value: false,
                    comparison: null,
                },
                block: {
                    value: false,
                    comparison: null,
                },
                hit: {
                    value: false,
                    comparison: null,
                },
            },

            spin: false,

            showDialog: false,
        }
    },
    mutations: {
        [mutations.TOGGLE_PREFERENCES_DIALOG] (state) {
            state.preferences.showDialog = !state.preferences.showDialog;
        },

        [mutations.TOGGLE_CHARACTER_LIST] (state) {
            state.showCharacterList = !state.showCharacterList;
        },

        updatePreferences(state, { buttonLayout, language }) {
            Cookies.set('buttonLayout', buttonLayout);
            Cookies.set('language', language);
            state.preferences.buttonLayout = buttonLayout;
            state.preferences.language = language;
        },

        toggleFiltersDialog(state) {
            state.filters.showDialog = !state.filters.showDialog;
        },

        updateFilters(state, filters) {
            state.filters.moveString = filters.moveString;
            state.filters.moveName = filters.moveName;
            state.filters.frameProperties = filters.frameProperties;
            state.filters.specialProperties = filters.specialProperties;
        },

        loadHitsMap(state, { hitsMap }) {
            state.hitsMap = hitsMap;
        },

        loadControlsMap(state, { controlsMap }) {
            state.controlsMap = controlsMap;
        },

        loadMoveList(state, { moveList }) {
            state.moveList = moveList;
        },

        loadCharacterList(state, { characterList }) {
            state.characterList = characterList;
        },

        selectCharacter(state, { characterId }) {
            state.selectedCharacter = characterId;
        },

        [mutations.SET_LOADING_MOVE_LIST] (state, { loading }) {
            state.loadingMoveList = loading;
        }
    },

    actions: {
        initialize({ dispatch, commit }) {
            let language = Cookies.get('language');
            let buttonLayout = Cookies.get('buttonLayout');

            if (language && buttonLayout) {
                commit(mutations.UPDATE_PREFERENCES, {
                    language: language,
                    buttonLayout: buttonLayout,
                });
            }

            return dispatch('fetchCharacterList')
                .then(() => dispatch('fetchHitsMap'))
                .then(() => dispatch('fetchControlsMap'));
        },

        fetchHitsMap({ commit, state }) {
            return Utils.loadHitsMap()
                .then((hitsMap) => commit('loadHitsMap', { hitsMap }));
        },

        fetchControlsMap({ commit, state }) {
            return Utils.loadControlsMap()
                .then((controlsMap) => commit('loadControlsMap', { controlsMap }));
        },

        fetchMoveList({ commit, state }, { characterId }) {
            commit(mutations.SET_LOADING_MOVE_LIST, { loading: true });

            return Utils.loadMoveList(characterId, state.language, state.controlsMap, state.hitsMap)
                .then((moves) => commit(mutations.SET_MOVELIST, { moveList: moves }))
                .then(() => commit(mutations.SET_LOADING_MOVE_LIST, { loading: false }));
        },

        fetchCharacterList({ commit }) {
            return Utils.loadCharacterList()
                .then((characters) => commit('loadCharacterList', { characterList: characters }));
        },

        selectCharacter({ commit, dispatch }, { characterId }) {
            commit('selectCharacter', { characterId });
            dispatch('fetchMoveList', { characterId });
        },

        selectCharacterBySlug({ commit, dispatch, state }, { slug }) {
            let character = state.characterList.find((character) => {
                return character.getSlug().toLowerCase() == slug;
            });

            if (character) {
                dispatch('selectCharacter', { characterId: character.getId() });
            }
        }
    }
};