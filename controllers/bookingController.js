const Booking = require('./../models/bookingModel');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.createBooking = async (req, res) => {
    const newBooking = await Booking.create(req.body);
    res.status(200).json({
        status: 'success',
        newBooking
    })
}
exports.getallbookings = async(req,res)=>{
    const bookings = await Booking.find({});
    res.status(200).json({
        status:'success',
        bookings
    })
}
exports.getCheckout = async (req, res) => {
    const booking = await Booking.findById(req.params.id).populate('tour', 'name price imageCover ');
    const totalPrice = booking.price * booking.guests;
    res.status(200).json({
        status: 'success',
        booking,
        totalPrice
    })
}
exports.createPaymentIntent = async (req, res, next) => {
    try {
        const booking = await Booking.findById(req.params.id);
        if (!booking) {
           return res.status(400).json({
                status: 'fail',
                message: 'There is no booking on the Given id'
            })
        }
        const paymentIntent = await stripe.paymentIntents.create({
            amount: booking.price*booking.guests* 100,
            currency: 'inr',
            metadata: {
                bookingId: booking._id.toString()
            }
        });
        res.status(200).json({
            status: 'success',
            clientSecret: paymentIntent.client_secret,
            bookingId:booking._id
        });

    } catch (err) {
        next(err);
    }
}
exports.bookingsuccess = async(req,res)=>{
    res.status(200).json({
        status:'success'
    });
}
exports.stripeWebhook = async(req, res) => {
    const sig = req.headers['stripe-signature'];

    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;

        const bookingId = paymentIntent.metadata.bookingId;

        try {
            await Booking.findByIdAndUpdate(
                bookingId,
                { status: 'paid' }
            );
            console.log(`Booking ${bookingId} marked as paid`);
        } catch (err) {
            console.log('Error updating booking:', err);
            return res.status(500).json({
                status: 'fail',
                message: 'Could not update booking'
            });
        }
    }

    res.status(200).json({
        received: true
    });
};