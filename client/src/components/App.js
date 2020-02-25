import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "./Header";
import { connect } from 'react-redux';
import * as actions from '../action/index';
const Landing = () => <h2>Landing</h2>;
const Dashboad = () => <h2>Dashboad</h2>;
const SurveyNew = () => <h2>newSurvey</h2>;


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
            <Route exact path="/surveys" component={Dashboad} />
            <Route path="/surveys/new" component={SurveyNew} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);//null is props;
