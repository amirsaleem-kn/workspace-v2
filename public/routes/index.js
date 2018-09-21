const app = require('../../core/App');

function routeHandler() {

    app.get('/', (req, res) => {
        res.send({
            'Greeting': "Welcome to your workspace"
        });
    });

}

module.exports = routeHandler();