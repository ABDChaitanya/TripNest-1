const axios = require('axios');
exports.searchFlight = async (req, res) => {
    try {
        const { origin, destination, departureDate, passengers } = req.body;
        const response = await axios.post(
            'https://api.duffel.com/air/offer_requests',
            {
                data: {
                    slices: [
                        {
                            origin:origin.fromDest,
                            destination:destination.toDest,
                            departure_date: departureDate.departDate
                        }
                    ],
                    passengers: Array.from(
                        { length: Number(passengers.passengers) || 1 },
                        () => ({ type: 'adult' })
                    ),
                    cabin_class: 'economy'
                }
            },
            {
                headers: {
                    Authorization:`Bearer ${process.env.DUFFEL_ACCESS_TOKEN}`,
                    'Duffel-Version':'v2',
                    'Content-Type':'application/json',
                    Accept:'application/json'
                }
            });
            const data =Array.from(response.data.data.offers);  
            const data1 = data.splice(0,10);
            const flights=  data1.map((item)=>({
                id:item.id,
                price:`₹${((item.total_amount)*128.12).toFixed(2)}`,
                owner:item.owner?.name,
                expiresAt:item.expires_at,
                currency:'INR'
            }))
            res.status(200).json({
                status: 'success',
                flights
            });
    } catch (err) {
        console.log(err.message);
    }

}