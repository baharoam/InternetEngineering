const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const rootRoutes = require('./routes')

const PORT = 3000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors())


mongoose.connect(
    "mongodb://127.0.0.1:27017/baharTwtter",
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log("DB is connected");
    })
    .catch(err => {
        console.log(err);
    })

// app.use('/uploads/profiles', express.static('images'))


app.use('/', rootRoutes)


app.listen(PORT, () => {
    console.log(`app is running on port ${PORT}`);
})