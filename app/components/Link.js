import React from 'react';
import PropTypes from 'prop-types'

const Link = ({ active , children , onClick}) => {
    if (active) return <span style={{background:"#03ccbb"}}> { children } </span>;

    return (
        <a href="" onClick={e => {
            e.preventDefault();
            onClick()
        }}> { children } </a>
    )
}

Link.propTypes = {
    active:PropTypes.bool,
    children:PropTypes.node.isRequired,
    onClick:PropTypes.func
}

export default Link;