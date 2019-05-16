import React from 'react'

const Third = (props) => {
    return (
        <div className="third-container">
            <div className="third-title">
                {props.title}
            </div>
            <div className="third-blurb">
                {props.blurb}
            </div>
        </div>
    )
}
export default Third;