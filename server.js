const express = require('express');
const { connectDB } = require('./database');

const app = express();
// Connect to DB
connectDB();

// Init Middleware -> Body Parser that is included in Express
app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

// Define Routes
app.use('/photos', require('./routes/photos'));
app.use('/albums', require('./routes/albums'));

// Create Port and Add Listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Listening at port ${PORT}`);
});
