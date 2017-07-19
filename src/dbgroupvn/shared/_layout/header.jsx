import React, { Component } from 'react'

import { Container, Row, Col } from'reactstrap'

import Menu from './header/menu'
import LanguageSelect from './header/language-select'
import Search from './header/search'

import Logo from './header/logo'
import MobileHeader from './header/header-mobile'

class Header extends Component {
    render() {
        return (
            <header {...this.props}>
                <Container className="d-none d-md-block">
                    <Row>
                        <Col md="2">
                            <Logo />
                        </Col>
                        <Col md="10">
                            <Row>
                                <div className="w-100">
                                    <div className="float-right">
                                        <div className="float-left">
                                            <LanguageSelect/>
                                        </div>
                                        <div className="float-left">
                                            <Search />
                                        </div>
                                    </div>
                                </div>
                            </Row>
                            <Row className="menu-container">
                                <div className="align-items-end d-flex">
                                    <Menu />
                                </div>
                            </Row>
                        </Col>
                    </Row>
                </Container>
                <MobileHeader className="d-block d-md-none" />
            </header>
        );
    }
}

export default Header