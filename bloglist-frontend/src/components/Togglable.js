import React from 'react';
import {useState, forwardRef, useImperativeHandle} from "react";

const Togglable = forwardRef((props,refs) => {
    const [visible, setVisible] = useState(false)

    const showWhenVisible = {display: visible ? 'none' : ''}
    const hideWhenVisible = {display: visible ? '' : 'none'}
    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(refs, () => {
        return {
            toggleVisibility
        }
    })

    return (
        <div>
            <div style={showWhenVisible}>
                <button onClick={toggleVisibility}
                        type="button">
                    {props.buttonLable}
                </button>
            </div>
            <div style={hideWhenVisible}>
                {props.children}
                <div>
                    <button
                        onClick={toggleVisibility}
                        type="button">
                        cancel
                    </button>
                </div>
            </div>
        </div>
    );
})

export default Togglable;