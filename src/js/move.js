export default class Move {
    constructor(moveData, language, controlsMap, hitsMap) {
        this._moveData = moveData;
        this._language = language;
        this._isJapanese = language === 0;
        this._controlsMap = controlsMap;
        this._hits = this._moveData.at.map((hit) => new Hit(hit, hitsMap));
        this._commands = this._moveData
            .command[this._language]
            .split(" ")
            .map((cmd) => new Command(cmd, controlsMap));
    }

    getName() {
        return this._moveData.name[this._isJapanese ? 0 : 1];
    }

    getNumber() {
        return this._moveData.number;
    }

    getTotalHits() {
        return this._moveData.ds.length;
    }

    getHits() {
        return this._hits;
    }

    getTotalDamage() {
        return this._moveData.d;
    }

    getDamages() {
        return this._moveData.ds.map(damage => damage.d);
    }

    getCommands() {
        return this._commands;
    }

    getString() {
        return this.getCommands()
            .map((command) => {
                return command.getInputs()
                    .map((input) => input.getSymbol());
            }).join("");
    }

    hasThrow() {
        return this._moveData.br.length > 0;
    }

    getThrowBreak() {
        switch (this._moveData.br[0].b) {
            case 1:
                return "1";
            case 2:
                return "2";
            case 3:
                return "1/2";
            case 4:
                return "1+2";
            default:
                return "";
        }
    }

    getThrowBreakFrames() {
        return this._moveData.br[0].f;
    }

    getStartUpFrames() {
        return this._moveData.s;
    }

    hasSegmentedStartFrames() {
        return this._moveData.s > 0;
    }

    getSegmentedStartFrames() {
        return this._moveData.ss.slice(1).map(sfs => sfs.s);
    }

    getBlockFrames() {
        return this._moveData.blk;
    }

    getAdvantageFrames() {
        return this._moveData.adv;
    }

    hasSpin() {
        return this._moveData.b9;
    }

    hasArmor() {
        return this._moveData.b8;

    }

    hasTracking() {
        return this._moveData.bB;
    }
}

class Command {
    constructor(command, controlsMap) {
        this._command = command;
        this._controlsMap = controlsMap;
        this._inputs = command
            .split("")
            .map((char) => new Input(char, controlsMap[char]));
    }

    getSymbol() {
        return this._command;
    }

    hasLetter() {
        return /[a-z]/.test(this._command.toLowerCase());
    }

    isBracket() {
        return this._command === "(" || this.__command === ")";
    }

    getInputs() {
        return this._inputs;
    }
}

class Input {
    constructor(charData, inputData) {
        this._charData  = charData;
        this._inputData = inputData;
    }

    getSymbol() {
        return this._inputData || this._charData;
    }

    isLetter() {
        return (typeof this._inputData === 'string') &&
                this._inputData.toLowerCase() != this._inputData.toUpperCase();
    }

    isMovement() {
        return this._inputData && this.isLetter();
    }

    isNeutral() {
        return this._inputData === "N";
    }

    isHeld() {
        return this._inputData && this._inputData === this._inputData.toUpperCase();
    }

    isAttack() {
        return this._inputData && this._inputData && !isNaN(this._inputData.charAt(0));
    }
}

class Hit {
    constructor(hitData, hitsMap) {
        this._hitData = hitData;
        this._hitsMap = hitsMap;
    }

    getLevel() {
        return this._hitsMap[this._hitData.l];
    }

    isThrow() {
        return this._hitData.t > 0;
    }
}