import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from '../action/index';

import Header from "./Header";
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

const Landing = () => <h2>Landing</h2>;

class App extends Component {
    componentDidMount() {
        this.props.fetchUser();
    }
    render() {
        return (
            <div>
                <BrowserRouter>
                    <div>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new" component={SurveyNew} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
};

export default connect(null, actions)(App);//null is props;
