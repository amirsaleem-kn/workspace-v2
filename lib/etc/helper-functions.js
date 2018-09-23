function printLog(message) {
    if(process.env.NODE_ENV != 'production') {
        console.log(message);
    }
}

module.exports = {
    printLog: printLog
};