const express = require('express');
const router = express.Router();
const fs = require('fs');
const ejs = require('ejs');
const controller = require('../controller/index')
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const options = {
	swaggerDefinition: {
	  info: {
		title: 'MyToken contract integration', // Title (required)
		version: '1.0.0', // Version (required)
		description: 'API docs for Test'
	  },
	  host: 'localhost:3000',
	  basePath: '/api',
	  tags: [
		{
		  name: 'Users',
		  description: 'API for smart contract integration in the system'
		}
	  ]
	},
	apis: [`./routes/api.js`] // Path to the API docs
  };
  
  //const swaggerDocument = require('./v1/config/swagger.json');
  const swaggerSpec = swaggerJSDoc(options);
  
  router.get('/api-docs.json', (req, res) => {
	res.setHeader('Content-Type', 'application/json');
	res.send(swaggerSpec);
  });
  
  
  //router.use('/', swaggerUi.serve);
  // if(env === 'staging' || env === 'development') {
	router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // }



  /**
	* @swagger
	* /getBalance:
	*   post:
	*     description: get balance of the submitted address(MYTOK token balance)
	*     tags:
	*       - Users
	*     produces:
	*       - application/json
	*     parameters:
	*       - name: userAddress
	*         description: ETH address of which balance is to find out
	*         in: body
	*         required: true
	*         type: string
	*     responses:
	*       200:
	*        	description: Success message
	*/
router.post('/getBalance', controller.getBalance);


  /**
	* @swagger
	* /transfer:
	*   post:
	*     description: Send/Transfers tokens to the recipient address
	*     tags:
	*       - Users
	*     produces:
	*       - application/json
	*     parameters:
	*       - name: recipientAddress
	*         description: ETH address of recipient where tokens are to be transferred
	*         in: body
	*         required: true
	*         type: string
	*       - name: tokenAmount
	*         description: Amount of tokens to be transferred
	*         in: body
	*         required: true
	*         type: number
	*     responses:
	*       200:
	*        	description: Success message
	*/
router.post('/transfer', controller.transfer);



module.exports = router;