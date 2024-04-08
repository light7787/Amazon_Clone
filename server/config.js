const MONGODBURI =  "mongodb+srv://chinmayab7787:778788@cluster0.gkfb1n9.mongodb.net/ecommers?retryWrites=true&w=majority&appName=Cluster0"

const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/ecommers');
mongoose.connect(MONGODBURI);