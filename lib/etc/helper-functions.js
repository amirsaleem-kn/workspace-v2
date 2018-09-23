function printLog(message) {
    if(process.env.NODE_ENV != 'production') {
        console.log(message);
    }
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

module.exports = {
    printLog: printLog,
    httpRequestLogger: httpRequestLogger
};