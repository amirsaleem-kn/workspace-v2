function printLog(message) {
    if(process.env.NODE_ENV != 'production') {
        console.log(message);
    }
}

function calcResponseTime(startTimestamp) {
    if(!startTimestamp) {
        return null;
    }
    return Date.now() - startTimestamp
}

function httpRequestLogger(req, res, next) {
    printLog('\n*------------------- API CALL [START] -----------------------*');
    printLog(`[${req.method}]: ${req.originalUrl}`);
    printLog(`[HEADERS]: ${JSON.stringify(req.headers)}`);
    printLog(`[QUERY]: ${JSON.stringify(req.query)}`);
    printLog(`[PARAMS]: ${JSON.stringify(req.params)}`);
    printLog(`[BODY]: ${JSON.stringify(req.body)}`);
    printLog('*------------------- API CALL [END] -----------------------*\n');
    next();
}

function encodeBase64(utfString) {
    return new Buffer(utfString).toString('base64');
}

function decodeBase64(base64String) {
    return Buffer.from(base64String, 'base64').toString();
}

module.exports = {
    printLog: printLog,
    httpRequestLogger: httpRequestLogger,
    calcResponseTime: calcResponseTime,
    encodeBase64: encodeBase64,
    decodeBase64: decodeBase64
};