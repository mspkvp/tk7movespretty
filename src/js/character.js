export default class Character {
    constructor(characterData) {
        this._characterData = characterData;
    }

    getSlug() {
        return this._characterData.c.split(" ")[0];
    }

    getId() {
        return this._characterData.i;
    }

    getIndex() {
        return this._characterData.c_index;
    }

    getThumbnailName() {
        let nameArray;

        if (this._characterData.i == "11") {
            nameArray = this.getIndex().split("-");
        } else {
            nameArray = this.getIndex().split(" ");
        }

        return nameArray.join("").toLowerCase();
    }

    getFullName() {
        return this._characterData.n;
    }

    getName() {
        return this._characterData.c;
    }
}