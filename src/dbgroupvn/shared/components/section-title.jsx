import React from 'react'

const sectionTitle = (props) => {
    return (
        <div className="section-title w-100 text-center">
            <h2 className="title">
                {props.children}
            </h2>
        </div>
    );
}

export default sectionTitle