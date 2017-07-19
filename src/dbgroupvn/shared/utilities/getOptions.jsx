import $ from 'jquery'

import map from 'lodash/map'
import split from 'lodash/split'
import trim from 'lodash/trim'
import filter from 'lodash/filter'

const OPPTION_CONTROLLER = '/optionGroup'
const GET_OPTION_ACTION = '/GetSingle'

const GET_OPTION_LINK = global.APP_DOMAIN + OPPTION_CONTROLLER + GET_OPTION_ACTION

function arrayNameValueString_To_ArrayNameValueObject(options) {
    return map(options, (item) => {
        const strs = split(String(item.value), '\n')
        const obj = { name: item.name };
        for (const i in strs) {
            const str = split(strs[ i ], ':');
            if (str.length == 2) {
                const kv = str;
                const k = trim(kv[ 0 ]);
                const v = trim(kv[ 1 ]);
                obj[ k ] = v;
            }
        }
        return obj;
    });
}

function arrayNameValueObject_To_Object(array) {
    const obj = {}
    for (const index in array) {
        const arrayObj = array[ index ];
        obj[ arrayObj.name ] = arrayObj
        delete obj[ arrayObj.name ].name
    }
    return obj
}

function getOptions(entityName) {
    return new Promise((resolve) => {
        $.ajax({
            url: GET_OPTION_LINK,
            data: { entityName },
            xhrFields: {
                withCredentials: true
            },
            success: (response) => {
                const array = arrayNameValueString_To_ArrayNameValueObject(response.details.options)
                const options = arrayNameValueObject_To_Object(array)
                resolve(options);
            }
        })
    })
}

function getOption(optionName, options) {
    return filter(options, { name: optionName })[ 0 ]
}

export { getOption, getOptions }
