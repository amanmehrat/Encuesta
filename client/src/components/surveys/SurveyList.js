import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../action';

class SurveyList extends Component {
    componentDidMount() {
        this.props.fetchSurveys();
    }

    renderList() {
        return this.props.surveys.map(surveys => {
            return (<div key={surveys._id}>
                <div>Title: {surveys.title}</div>
                <div>Subject: {surveys.body}</div>
                <div>Yes : {surveys.yes}</div>
                <div>No : {surveys.No}</div>
            </div>
            );
        })
    }

    render() {
        return <div>{this.renderList()}</div>;
    }


}


const mapStateToProps = ({ surveys }) => {
    return { surveys };
}
export default connect(mapStateToProps, actions)(SurveyList);

