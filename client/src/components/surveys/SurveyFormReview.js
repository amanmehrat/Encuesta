import React from 'react';
import { connect } from 'react-redux';
import formFields from '../surveys/surveyFormFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../action';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = formFields.map(({ name, label }) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    })


    return (
        <div>
            <div>Please Check Your Entries</div>
            {reviewFields}
            <button onClick={onCancel} className="btn-flat blue text-white">Back</button>
            <button onClick={() => submitSurvey(formValues, history)} className="btn-flat blue text-white">Submit</button>
        </div>
    );
}


const mapStateToProps = (state) => {
    console.log(state);
    return { formValues: state.form.SurveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
