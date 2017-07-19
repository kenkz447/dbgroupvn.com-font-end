import React, { Component } from 'react'
import PropTypes from 'prop-types'
import map from 'lodash/map'
import { connect } from 'react-redux'
import { Input } from 'reactstrap'

const SWITCH_ACTION = '/localization/switch'

class LanguageSelect extends Component {
    static propTypes = {
        languages: PropTypes.array,
        currentLanguage: PropTypes.string,
    }
    
    render() {
        const { languages, currentLanguage } = this.props;

        return (
            <form className="language-select  pr-3 mr-3" method="POST" action={ `${global.APP_DOMAIN}${SWITCH_ACTION}` } ref={ (elment) => { this.form = elment } }>
                <Input name="culture" value={ currentLanguage } className="text-uppercase p-0 border-0" type="select" onChange={ () => { this.form.submit() } }>
                    {
                        map(languages, (language) => (<option key={ language.name } value={ language.name }>{ language.title }</option>))
                    }
                </Input>
            </form>
        );
    }
}

const stateToProps = (state) => ({
    currentLanguage: state.localization.currentLanguage,
    languages: state.localization.languages
});

export default connect(stateToProps)(LanguageSelect)