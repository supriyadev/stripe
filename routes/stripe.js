const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const bodyparser = require('body-parser');
const path=require("path");

router.use(bodyparser.urlencoded({extended:false})) 
router.use(bodyparser.json()) 

var Publishable_Key = 'pk_test_3bwbiXOYEmOlmCnCVSIG971M'
router.get('/', function(req, res){ 
  res.render('Home', { 
  key: Publishable_Key 
  }) 
}) 
router.post('/payment', function(req, res){ 

  // Moreover you can take more details from user 
  // like Address, Name, etc from form 
  stripe.customers.create({ 
      email: req.body.stripeEmail, 
      source: req.body.stripeToken, 
      name: 'Gautam Sharma', 
      address: { 
          line1: 'TC 9/4 Old MES colony', 
          postal_code: '110092', 
          city: 'New Delhi', 
          state: 'Delhi', 
          country: 'India', 
      } 
  }) 
  .then((customer) => { 

      return stripe.charges.create({ 
          amount: 7000,    // Charing Rs 25 
          description: 'Web Development Product', 
          currency: 'USD', 
          customer: customer.id 
      }); 
  }) 
  .then((charge) => { 
      res.send("Success") // If no error occurs 
  }) 
  .catch((err) => { 
      res.send(err)    // If some error occurs 
  }); 
}) 
module.exports = router;
