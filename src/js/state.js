import Cookies from 'cookies';

export default class State {
    constructor() {
        this._properties = {
            characterData : [],
        	ctrlsMap : null,
        	hitsMap : [],
            selectedCharacter : "32",
        	currentMoveList : null,
        	lang : 1,
        	showPrefDialog : false,
        	showFilterDialog : false,
        	showCharMenuDialog : false,
        	buttonLayout: "XBOX",
        };
    }

    get(property) {
        return this._properties[property];
    }

    set(property, value) {
        this._properties[property] = value;
    }

    save() {
        Cookies.set('tk7moves', JSON.stringify({
    		selected_char: this.get('selectedCharacter'),
    		lang: this.get('lang'),
    		jap: this.get('jap'),
    		bl_choice: this.get('buttonLayoutChoice'),
    		button_layout: this.get('buttonLayout'),
    	}), { expires: 30, path: '' });
    }

    load() {
    	if (typeof Cookies.get('tk7moves') != 'undefined') {
    	    let vals = JSON.parse(Cookies.get('tk7moves'));
    	    let buttonLayoutChoice = vals.bl_choice;
    	    let lang = vals.lang;
    	    let jap = vals.jap;
            let selectedCharacter = vals.selected_char;
            let buttonLayout = vals.button_layout;

    		this.set('selectedCharacter', selectedCharacter);
    		this.set('lang', lang);
    		this.set('jap', jap);
    		this.set('buttonLayoutChoice', buttonLayoutChoice);
    		this.set('buttonLayout', buttonLayout);

    		document.querySelector('#platf-select option').setAttribute('selected', false);
    		document.querySelector('#lang-select option').setAttribute('selected', false);
    		document.querySelector(`#platf-select option[value="${buttonLayout}"]`).setAttribute('selected', true);
    		document.querySelector(`#lang-select option[value="${lang}"]`).setAttribute('selected', true);
    	} else {
    		this.save();
    	}
    }
}