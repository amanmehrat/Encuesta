import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import SurveyField from './SurveyField';
import Validation from '../../utils/Validation';
import formFiels from '../surveys/surveyFormFields';
//import _ from 'lodash';

class SurveyForm extends Component {
    renderFields() {
        //console.log(formFiels);
        return (formFiels.map(({ name, label }) => {
            console.log(name + " ---- " + label);
            //_.map(FIELDS, ({ name, label }) => {
            return (
                <Field key={name} type="text" component={SurveyField} name={name} label={label} />
            )
        }));
    }
    render() {
        return (
            <form className="container" onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
                {this.renderFields()}
                <button className="btn-Flat btn-large white-text blue right" type="submit" disabled={this.props.pristine || this.props.submitting}>Next <i className="material-icons">done</i></button>
                <button className="btn-Flat btn-large white-text red " type="button" disabled={this.props.pristine || this.props.submitting} onClick={this.props.reset}>Reset</button>
            </form>
        );
    }
}

const validate = (values) => {
    let errors = {}
    errors.recipients = Validation.validateEmails(values.recipients || '');
    formFiels.forEach(({ name, noValueError }) => {
        if (!values[name]) {
            errors[name] = noValueError;
        }
    });
    return errors;
}
export default reduxForm({
    validate,
    destroyOnUnmount: false,
    form: 'SurveyForm', // a unique identifier for this form
})(SurveyForm);



