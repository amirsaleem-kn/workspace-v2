/**
 * @author Amir Saleem
 * @description
 * @api sudo -s /usr/share/postman/Postman /usr/bin/postman 
 */

const app = require('../../core/App');
const helperFunctions = require('../../lib/etc/helper-functions');
const { calcResponseTime, encodeBase64, decodeBase64 } = helperFunctions;

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

        return res.json({
            status: "success"
        });

    });

    app.get('/', (req, res) => {
        res.send({
            'Greeting': "Welcome to your workspace"
        });
    });

}

module.exports = routeHandler();