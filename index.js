const express = require('express');
const path = require('path');
const app = express();
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//connect to mongodb
//mongoose.connect('mongodb://localhost/scontracts', {useNewUrlParser: true, useUnifiedTopology: true});
//mongoose.Promise = global.Promise;


//app.use('/public', express.static(path.join(__dirname, 'static')));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.get('/', (req, res)=>{
	res.sendFile(path.join(__dirname, 'static', 'index.html'));
});


app.use('/api', routes);
app.use(function(err, req,res,next){
	//console.log(err); 
	res.status(422).send({error: err.message});
});

app.listen(process.env.port || 3000, function(){
	console.log('now listening for requests');
});