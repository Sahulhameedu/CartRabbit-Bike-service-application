const express = require('express'); 
const cors = require("cors"); // used to cross origin 
const connectDB = require('./config/db'); // To configure Database
const authRoutes = require('./routes/authRoutes'); // authRoutes
const serviceRoutes = require('./routes/serviceRoutes'); // serviceRoutes
const bookingRoutes = require('./routes/bookingRoutes'); // bookingRoutes

const app = express();
app.use(express.json()); // to parse incoming data (middleware)

app.use(cors()); 

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);

app.listen(process.env.PORT || 5000, () => {
    console.log('Server running on port', process.env.PORT || 5000);
});
