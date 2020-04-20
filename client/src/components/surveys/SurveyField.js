import React from 'react';
//import { Field } from 'redux-form';


const surveyField = (({ label, input, meta }) => {
    //console.log(meta);
    return (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} style={{ marginBottom: "0px" }} />
            </div>
            <div className="red-text" style={{ fontSize: "10px", marginBottom: "15px" }} >
                {meta.touched && meta.error}
            </div>
        </div>
    )
});


export default surveyField;