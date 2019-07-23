// Mongodb configuration properties
export const databaseConfig = {
    useCreateIndex: true,
    // Optional. Use this if you create a lot of connections and don't want
    // to copy/paste.
    useNewUrlParser: true,
    // Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
    // by default, you need to set it to false.
    useFindAndModify: false,
    // Enable this for long running applications sudden 'connection closed' error
    keepAlive: true,
    // sets how many times to try reconnecting
    reconnectTries: Number.MAX_VALUE,
    // sets the delay between every retry (milliseconds)
    reconnectInterval: 1000,
    // Maintain up to 5 socket connections
    poolSize: 5,
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
};
