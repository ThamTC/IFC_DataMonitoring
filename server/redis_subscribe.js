const redis = require("redis")
const client = redis.createClient()
client.connect().then(data => console.log(data))
async function subcrible(params) {
    const subscriber = client.duplicate();
    await subscriber.connect();
    await subscriber.subscribe("channel", (message) => {
        console.log(message); // 'message'
    });
}
subcrible()