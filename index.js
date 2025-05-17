require('dotenv').config();
const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://sandbox-vendors.paddle.com/dashboard/api/subscriptions',
  headers: { 
    'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
  }
};

axios.request(config)
.then((response) => {
  const subscriptions = response.data.data;
  
  subscriptions.forEach((subscription, index) => {
    const item = subscription.items[0]; // Get the first item since we're interested in the main subscription
    
    console.log(`\nSubscription ${index + 1}:`);
    console.log('----------------------------------------');
    console.log(`WABA Subscription ID: ${subscription.id}`);
    console.log(`Subscription Status: ${subscription.status}`);
    console.log(`Status Change Date: ${subscription.updatedAt}`);
    console.log(`Next Payment Due: ${subscription.nextBilledAt || 'N/A'}`);
    console.log(`Product: ${item.product.name}`);
    console.log(`Price: ${item.price.unitPrice.amount} ${item.price.unitPrice.currencyCode}`);
    console.log(`Customer Link: ${subscription.managementUrls.cancel ? subscription.managementUrls.cancel.split('?')[0] : 'N/A'}`);
    console.log(`First Payment Date: ${subscription.firstBilledAt}`);
    console.log('----------------------------------------');
  });
})
.catch((error) => {
  console.error('Error fetching subscriptions:', error.message);
});
