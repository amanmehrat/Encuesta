import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import allActions from '../action';
import { useDispatch } from 'react-redux';

import PrivateRoute from './Routes/PrivateRoute';
import RestricatedRoute from './Routes/RestricatedRoute';


import Header from "./Header";
import Login from './Login';
import Dashboard from './Dashboard';
import SurveyNew from './surveys/SurveyNew';

const Landing = () => <h2>Landing</h2>;


const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allActions.userActions.FetchUser());
    }, [dispatch]);

    return (
        <div>
            <BrowserRouter>
                <div>
                    <Header />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <RestricatedRoute exact path="/auth" component={Login} />
                        <PrivateRoute exact path="/surveys" component={Dashboard} />
                        <PrivateRoute exact path="/surveys/new" component={SurveyNew} />
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
