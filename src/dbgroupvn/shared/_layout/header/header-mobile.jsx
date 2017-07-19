//Core
import React, { Component } from 'react'

//Utilities
import classNames from 'classnames'

//Components
import { Container } from 'reactstrap'
import LanguageSelect from './language-select'
import Search from './search'

export default class HeaderMobile extends Component {

	componentDidMount() {
		if ('ontouchstart' in window)
			var click = 'touchstart';
		else
			var click = 'click';

		var $layout = $($('.layout')[ 0 ]);
		var $wrapper = $layout.find('.wrapper');
		var $burger = $layout.find('.burger');

		global.closeMenu = function closeMenu() {
			$layout.removeClass('animate').delay(500).queue(function () {
				$wrapper.unbind(click);
				$layout.removeClass('modalview').dequeue();
			});
			$burger.removeClass('open');
		}

		global.openMenu = function openMenu() {
			$burger.addClass('open');
			$layout.addClass('modalview');
			$layout.addClass('animate').delay(500).queue(function () {
				$wrapper.bind(click, function () {
					if ($layout.hasClass('modalview'))
						closeMenu();
				});
				$layout.addClass('modalview').dequeue();
			});
		}

		$burger.on(click, function () {
			openMenu();
		});

		var $nav = $layout.find('.outer-nav');
		$nav.find('a').bind(click, function () {
			closeMenu();
		});
	}
	render() {
		return (
			<Container>
				<div className={ classNames("header-mobile clearfix", this.props.className) }>
					<div className="float-left mt-1">
						<div className="burger">
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</div>

					<div className="float-right">
						<div className="float-left">
							<LanguageSelect />
						</div>
						<div className="float-left">
							<Search />
						</div>
					</div>
				</div>
			</Container>
		)
	}
}