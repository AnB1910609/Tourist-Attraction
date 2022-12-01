const express = require('express');
const cors = require('cors');
const touristAttractionController = require('./controllers/touristAttraction.controller');
const planController = require('./controllers/plan.controller');
const ApiError = require('./api-error');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to tourist-Attraction application.' });
});

app.route('/api/touristAttraction')
    .get(touristAttractionController.findAll)
    .post(touristAttractionController.create)
    .delete(touristAttractionController.deleteAll);

app.route('/api/touristAttraction/favorite').get(touristAttractionController.findAllFavorite);

app.route('/api/touristAttraction/:id')
    .get(touristAttractionController.findOne)
    .put(touristAttractionController.update)
    .delete(touristAttractionController.delete);

// Plan
app.route('/api/plan')
    .get(planController.findAll)
    .post(planController.create)
    .delete(planController.deleteAll);

app.route('/api/plan/:id')
    .get(planController.findOne)
    .put(planController.update)
    .delete(planController.delete);
app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});


app.use((error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        message: error.message || 'Internal Server Error',
    });
});

module.exports = app;