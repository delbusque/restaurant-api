require('dotenv').config();
const cors = require('cors')

const express = require('express');
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const tableRoutes = require('./routes/tableRoutes.js');
const itemRoutes = require('./routes/itemRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const messageRoutes = require('./routes/messageRoutes.js');
const chefRoutes = require('./routes/chefRoutes.js');

const app = express();

app.use(cors({
    // origin: "https://ourestaurant.onrender.com"
    origin: "http://localhost:3000"
}))

app.use(express.json());

app.get('/', (req, res) => {
    res.status(404).json({ mssg: 'No such API endpoint' })
})

app.use('/tables', tableRoutes);

app.use('/items', itemRoutes);

app.use('/user', userRoutes);
app.use('/staff', userRoutes);

app.use('/messages', messageRoutes)

app.use('/chef', chefRoutes)

app.use('*', (req, res) => {
    res.status(404).json({ mssg: 'No such API endpoint' })
})


mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to DB');
        app.listen(process.env.PORT, () => console.log(`Listening for request on port ${process.env.PORT}`));
    })
    .catch(err => console.log(err));
