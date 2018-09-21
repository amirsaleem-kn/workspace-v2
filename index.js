const app = require('./core/App');
require('./public/routes/');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening to port ${PORT}`);
});