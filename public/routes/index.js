/**
 * @author Amir Saleem
 * @description 
 */

const app = require('../../core/App');

function routeHandler() {

    app.get('/v1/user/login', (req, res) => {

        const base64Auth = (req.headers.authorization || '').split(' ')[1] || '';
        const [login, password] = new Buffer(base64Auth, 'base64').toString().split(':');

        return res.json({
            username: login,
            password: password
        });

    });

    app.get('/', (req, res) => {
        res.send({
            'Greeting': "Welcome to your workspace"
        });
    });

}

module.exports = routeHandler();