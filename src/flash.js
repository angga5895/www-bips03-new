import React, { useEffect, useState } from 'react';
import Bus from '../src/bus';

// import './index.css';

export const Flash = () => {
    let [visibility, setVisibility] = useState(false);
    let [message, setMessage] = useState('');
    let [type, setType] = useState('');

    useEffect(() => {
        Bus.addListener('flash', ({message, type}) => {
            setVisibility(true);
            setMessage(message);
            setType(type);
            setTimeout(() => {
                setVisibility(false);
            }, 4000);
        });


    }, []);

    useEffect(() => {
        if(document.querySelector('.close') !== null) {
            document.
            querySelector('.close').
            addEventListener('click', () => setVisibility(false));
        }
    })

    return (
        visibility && <div className={`alert alert-${type}`}>
            <span className="close"><strong>X</strong></span>
            <p>{message}</p>
        </div>
    )
}
export default Flash;