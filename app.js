'use strict'
const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const models = require('./models');
const database = models.db;
const path = require('path')
const routes = require('./routes');
const PORT = 8000;

//logging middleware
app.use(morgan('dev'));

//body parser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//view engine
app.set('view engine', 'html')
app.engine('html',nunjucks.render);
nunjucks.configure('views',{noCache:true});

//static files
app.use(express.static(path.join(__dirname,'/public')));
app.use('/jquery',express.static(path.join(__dirname,'node_modules/jquery/dist')));
app.use('/bootstrap',express.static(path.join(__dirname,'node_modules/bootstrap/dist')));

//routing
app.use('/', routes);

//error middleware
app.use(function (err,request,response,next) {
	response.render('error');
	console.error(err)
})

database.sync()
.then( databaseInformation => {
	app.listen(PORT, () => {
		console.log(`On Port ${PORT}`);
	});
})
