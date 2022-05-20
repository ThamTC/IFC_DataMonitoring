const redis = require("redis")
const client = redis.createClient()
var isConnect = false
client.on("error", (error) => {
    isConnect = false
    console.log(error)
})

const asyncRedis = {
    
    connect: async () => {
        try {
            await client.connect()
            isConnect = true
            return "success"
        } catch (error) {
            isConnect = false
            return error
        }
    },
    get: async (key) => {
            try {
                const data = await client.get(key)
                return data
            } catch (error) {
                return error
            }
    },
    set: async (key, payload) => {
            try {
                await client.set(key, payload)
                return "success"
            } catch (error) {
                return error
            }
    },
    publish: async (channel, payload) => {
        const res = await client.publish(channel, payload)
        return res
    },
    subscribe: async (channel) => {
        const subscriber = client.duplicate();
        await subscriber.connect();
        await subscriber.subscribe(channel, (message) => {
            console.log(message); // 'message'
        });
    }
}

module.exports = asyncRedis