import $ from 'jquery'
import React, { Component } from 'react'

import map from 'lodash/map'

import { Container } from 'reactstrap'
import { Title, Image } from '../../shared/components'

export default class Quytrinh extends Component {
    componentDidMount() {
        $('.cd-timeline-block').each((e) => {
            const $this = $($('.cd-timeline-block')[ e ]);
            const objPrev = $this.prev('.cd-timeline-block');
            if (objPrev.hasClass('odd')) {
                $this.find('.cd-timeline-content p').attr('data-aos', 'zoom-in');
                $this.find('.cd-timeline-content h2').attr('data-aos', 'zoom-in');

                $this.addClass('even');
            } else {
                $this.find('.cd-timeline-content p').attr('data-aos', 'zoom-in');
                $this.find('.cd-timeline-content h2').attr('data-aos', 'zoom-in');
                $this.addClass('odd');
            }
        });
    }

    render() {
        const { items, title } = this.props;
        return (
            <Container>
                <Title>{ global.localizationString.getString('Quy trình') }</Title>
                <section id="cd-timeline">
                    {
                        map(items, (item, key) => {
                            if (!item.content) {
                                return (
                                    <p className="cd-timeline-title">
                                        <span className="text">
                                            { item.label }
                                        </span>
                                    </p>
                                );
                            }
                            return (
                                <div className="cd-timeline-block clearfix">
                                    <div className="cd-timeline-dot" />
                                    <div className="cd-timeline-content clearfix">
                                        <h2>{ item.label }</h2>
                                        <p>{ item.content }</p>
                                        <div className="cd-icon">
                                            <Image url={ item.icon } desrciption={ key } />
                                        </div>
                                    </div>
                                </div>
                            );

                        })
                    }
                </section>
            </Container>
        );
    }
}
