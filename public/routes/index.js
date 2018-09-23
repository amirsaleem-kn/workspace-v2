/**
 * @author Amir Saleem
 * @description 
 */

const app = require('../../core/App');

function calcResponseTime(startTimestamp) {
    if(!startTimestamp) {
        return null;
    }
    return Date.now() - startTimestamp
}

function routeHandler() {

    app.post('/v1/user/login', (req, res) => {

        var startTime = Date.now();
        var endTime;

        const base64Credentials = req.get('Basic') || null;

        if(!base64Credentials) {
            res.status(422).json(
                {
                    api_status: "stable",
                    version: "1.0",
                    response_time: calcResponseTime(startTime) + ' ms',
                    data: { 
                        status: "fail",
                        message: "missing parameters"
                    }
                }
            );
            return;
        }

        console.log(req.get('Basic'));
        console.log(Buffer.from(req.get('Basic'), 'base64').toString());

        
        return res.json({
            status: "success"
        });

    });

    app.get('/', (req, res) => {
        const base64Credentials = new Buffer('admin:secret').toString('base64');
        res.send({
            'Greeting': "Welcome to your workspace",
            'base64Creds': base64Credentials
        });
    });

}

module.exports = routeHandler();