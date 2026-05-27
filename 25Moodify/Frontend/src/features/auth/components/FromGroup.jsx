import React from 'react';

const FromGroup = ({ label, placeholder,value, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={label}>{label}</label>
            <input
            value = {value}
            onChange={onChange}
            type="text" placeholder={placeholder} name={label} id={label}  required/>
        </div>
    );
};

export default FromGroup;
