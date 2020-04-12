import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import ShowFromReview from './SurveyFormReview';
class SurveyNew extends Component {

    state = { showFromReview: false }

    renderContent() {
        if (this.state.showFromReview) {
            return <ShowFromReview onCancel={() => { this.setState({ showFromReview: false }) }} />;
        }
        return <SurveyForm onSubmit={() => { this.setState({ showFromReview: true }) }} />;
    }
    render() {
        return this.renderContent()
    }
}
export default SurveyNew;