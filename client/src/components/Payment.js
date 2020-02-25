import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import * as actions from '../action/index';
import { connect } from 'react-redux';
class Payment extends Component {



    render() {
        return <StripeCheckout
            name="Emaily"
            description="(Recharge 100 Credits to Your wallet)"
            // image="www.tboacademy.com/images/logo.png"
            amount={10000}
            currency="INR"
            stripeKey={process.env.REACT_APP_STRIPE_KEY}
            token={token => this.props.handleStripeToken(token)} >
            <button className="btn">Add 100 Credits</button>
        </StripeCheckout>
    }
}

export default connect(null, actions)(Payment);//actions as a props used