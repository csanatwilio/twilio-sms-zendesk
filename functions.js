exports.handler = function(context, event, callback) {
    // require('dotenv').config();
      var request = require('request');
   
   console.log(`###############\n environment = ${process.env.Env} \n  
               ZENDESK_TOKEN  = ${process.env.ZENDESK_TOKEN} \n################### \n
               TicketID= ${event.ticket_ID}`);
     var customer_zendesk_domain = 'https://' + process.env.BASIC_AUTH +'@'+ process.env.ZENDESK_SUBDOMAIN + '.zendesk.com';
       
     // console.log("Zendesk endpoint: " + customer_zendesk_domain + '/api/v2/tickets/' + event.ticket_ID+ '.json');
       
     //Request 1 to get author ID for the existing ticket:
   var options = {
                 'method': 'GET',
                 'url': customer_zendesk_domain + '/api/v2/users/search.json?query=phone:' + event.From.substring(1),
                 'headers': {
                   'Content-Type': 'application/json'              },           
               };
     request(options, function (error, response) {
         if (error) {
           console.log("Error in getting user details");
           throw new Error(error);
   
         } 
         else {
           console.log("Event from: " + event.From)
           console.log(JSON.parse(response.body))
            let author_id = JSON.parse(response.body).users[0].id;
   
   //Requst 2 to update the ticket using the user details
   var options = {
                 'method': 'PUT',
                 'url': customer_zendesk_domain + '/api/v2/tickets/' + event.ticket_ID+ '.json',
                 'headers': {
                   'Content-Type': 'application/json'              },
                 body: JSON.stringify({"ticket":{"comment":{"body":`${event.Body} - ${event.From}`, 
                             "author_id":author_id}}})
               
               };
   
               request(options, function (error, response) {
   
                 if (error) throw new Error(error);
                 console.log(JSON.stringify(response.body))
                         callback(null, event.ticket_ID);
   
               });
   
         }
   
   
     });
   
   }