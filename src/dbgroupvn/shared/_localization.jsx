import { default as enUS } from './_localization/en-us'
import toLower from 'lodash/toLower'
import trim from 'lodash/trim'

const DEFAULT_LANGUAGE = 'vi-VN'

const strings = {
    [ DEFAULT_LANGUAGE ]: {
    },
    'en-US': enUS
};

export default class {
    constructor() {
        this.strings = strings;
        this.defaultLanguage = DEFAULT_LANGUAGE
    }

    setLanguage(language) {
        this.language = language;
    }

    getLanguage() {
        return this.language
    }

    getDefaultLanguage() {
        return this.defaultLanguage
    }

    getString(string) {
        return this.strings[ this.language ][ trim(toLower(string)) ] || string;
    }
}