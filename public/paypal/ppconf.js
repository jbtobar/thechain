paypal.Button.render({

    env: 'production', // Or 'sandbox'

    client: {
        sandbox:    'ASbNprGqzYwaAmAZ6UVRSRN2JFZyHmrcGsrz1BuxpVckwn3rBSrJlqClI-uCZc2SvQ1f7o0ql94Bb8p7',
        // production: 'xxxxxxxxx'
    },

    commit: true, // Show a 'Pay Now' button

    payment: function(data, actions) {
        return actions.payment.create({
            payment: {
                transactions: [
                    {
                        amount: { total: '1.00', currency: 'USD' }
                    }
                ]
            }
        });
    },

    onAuthorize: function(data, actions) {
        return actions.payment.execute().then(function(payment) {

            // The payment is complete!
            // You can now show a confirmation message to the customer
        });
    }

}, '#paypal-button');
