import React from 'react'

const Details = props => {
    return (
        <div>{props.person.name}: {props.person.number}</div>
    )
}

export default Details