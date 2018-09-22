const app = require('./core/App');
require('./public/routes/');
require('./lib/models');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});