# nightlife-coordinator
Simple nightlife coordination app written for Free Code Camp's Back End Development curriculum.

## Installation
After you clone the repo and install the node_modules, you'll need to create a .env file. You'll need api
credentials for the yelp search as well as for facebook authentication, if you'd like to use it.
This file should contain these environment variables:

YELP_CONSUMER_KEY=add your yelp consumer key
YELP_CONSUMER_SECRET=add your yelp consumer secret
YELP_TOKEN=add your yelp token
YELP_TOKEN_SECRET=add your yelp token secret

MONGODB_URI=add your mongodb uri (mongodb://localhost:27017/nightlife)

FACEBOOK_CLIENT_ID=add your facebook client id
FACEBOOK_SECRET=add your facebook secret
FACEBOOK_CALLBACK=add your facebook callback (http://localhost:3000/auth/facebook/callback)

You can view the app demo at https://prk-night-out.herokuapp.com/
