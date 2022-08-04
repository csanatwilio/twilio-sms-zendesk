# twilio-sms-zendesk
1- Set the variable in the Studio flow:
 Set the value for the BASIC_AUTH: This will be the url encoded of your username and api key in the following format USERNAME/token:API_KEY. For example if your user name is owl@twilio.com and your Zendesk apikey is Zxxxxxx. The token will be the encoded url value for "owl@twilio.com/token:Zxxxxxx". Use a service like https://meyerweb.com/eric/tools/dencoder/ to encode the url . The resulting encoded value for the example above would be "owl%40twilio.com%2Ftoken%3AZxxxxxx".
 Set the value for ZENDESK_SUBDOMAIN: This will be the subdomain for your Zendesk account. for example it could be "twiliosedemo.zendesk.com"

2- Copy the JSON and import it by following the steps here https://www.twilio.com/docs/studio/user-guide#importing-flow-data. Save and Publish.
3- Create a new Twilio Function by following the steps here. Name the function "update_ticket". Copy the content from functions.js and paste it in the newly created update_ticket function
4- Set the environment variable for the function by creatting and setting values for BASIC_AUTH and ZENDESK_SUBDOMAIN 
5- Deploy the function
6- You can purchase or use a existing number for this step. In the number configurations, set the Messaging option "CONFIGURE WITH OTHER HANDLERS" to "Webhook, TwiML Bin, Function, Studio Flow, Proxy Service"
7- For the option or "A MESSAGE COMES IN", set the value to the studio Flow we created in Step 2.
Save.

