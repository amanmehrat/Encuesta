import React from 'react';
import { connect } from 'react-redux';
import formFields from '../surveys/surveyFormFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../action';

const SurveyFormReview = ({ onCancel, formValues, submitSurvey, history, data }) => {

    const reviewFields = formFields.map(({ name, label }) => {
        return (
            <div key={name}>
                <div>
                    <label>{label}</label>
                    <div>{formValues[name]}</div>
                </div>
            </div>
        );
    })


    return (
        <div>
            <div>Please Check Your Entries</div>
            {reviewFields}
            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Recipients Emails Are:</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(email => (email.length > 0 && <tr key={email[0]}><td>{email[0]}</td></tr>))}
                    </tbody>
                </table>
            </div>
            <button onClick={onCancel} className="btn-flat blue text-white">Back</button>
            <button onClick={() => submitSurvey(formValues, history)} className="btn-flat blue text-white">Submit</button>
        </div>
    );
}


const mapStateToProps = (state) => {
    return { formValues: state.form.SurveyForm.values };
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));
