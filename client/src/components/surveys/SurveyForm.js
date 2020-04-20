import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import SurveyField from './SurveyField';
import FileInput from '../htmlInputs/FileInput';
import Validation from '../../utils/Validation';
import formFiels from '../surveys/surveyFormFields';
//import _ from 'lodash';


class SurveyForm extends Component {

    normalizeFileList = () => {
        return this.props.data;
    }
    renderFields() {
        return (formFiels.map(({ name, label, type }) => {
            return (
                <Field key={name} type={type} component={SurveyField} name={name} label={label} />
            )
        }));
    }

    render() {
        console.log(this.props.recipientData);
        return (
            <form className="container" onSubmit={this.props.handleSubmit(this.props.onSubmit)} content-type="multipart/form-data">
                {this.renderFields()}
                <Field key="file" type="file" normalize={this.normalizeFileList} component={FileInput} name="recipientExcel" label="Upload excel" handleFile={this.props.handleFile} />
                <button className="btn-Flat btn-large white-text blue right" type="submit" disabled={this.props.pristine || this.props.submitting}>Next <i className="material-icons">done</i></button>
                <button className="btn-Flat btn-large white-text red " type="button" disabled={this.props.pristine || this.props.submitting} onClick={this.props.reset}>Reset</button>
            </form>
        );
    }
}

const validate = (values) => {
    console.log("1--------------- in Validate Function");
    console.log(values);
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



