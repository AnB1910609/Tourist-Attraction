const TouristAttractionService = require('../services/touristAttraction.service');
const ApiError = require("../api-error");

exports.create = (req, res) => {
    return res.send({ message: 'create handler' });
};

exports.findAll = (req, res) => {
    return res.send({ message: 'findAll handler' });
};

exports.findOne = (req, res) => {
    return res.send({ message: 'findOne handler' });
};

exports.update = (req, res) => {
    return res.send({ message: 'update handler' });
};

exports.delete = (req, res) => {
    return res.send({ message: 'delete handler' });
};

exports.deleteAll = (req, res) => {
    return res.send({ message: 'deleteAll handler' });
};

exports.findAllFavorite = (req, res) => {
    return res.send({ message: 'dfindAllFavorite handler' });
};

// Create and Save a new TouristAttraction
exports.create = async (req, res, next) => {
    if (!req.body?.name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
  
    try {
        const touristAttractionService = new TouristAttractionService();
        const touristAttraction = await touristAttractionService.create(req.body);
        return res.send(touristAttraction);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the Tourist attraction")
        );
    }
};

// Retrieve all tourist attraction of a user from the database
exports.findAll = async (req, res, next) => {
    let touristAttraction = [];
  
    try {
        const touristAttractionService = new TouristAttractionService();
        const { name } = req.query;
        if (name) {
            touristAttraction = await touristAttractionService.findByName(name);
        } else {
            touristAttraction = await touristAttractionService.all();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retrieving Tourist attraction")
        );
    }

    return res.send(touristAttraction);
};

// Find by id
exports.findOne = async (req, res, next) => {
    try {
        const touristAttractionService = new TouristAttractionService();
        const touristAttraction = await touristAttractionService.findById(req.params.id);
        if (!touristAttraction) {
            return next(new ApiError(404, "Tourist attraction not found"));
        }
        return res.send(touristAttraction);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving Tourist attraction with id=${req.params.id}`)
        );
    }
};

// Update
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
  
    try {
        const touristAttractionService = new TouristAttractionService();
        const updated = await touristAttractionService.update(req.params.id, req.body);
        if (!updated) {
            return next(new ApiError(404, "Tourist attraction not found"));
        }
        return res.send({ message: "Tourist attraction was updated successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error updating Tourist attraction with id=${req.params.id}`)
        );
    }
};

// Delete a Tourist attraction with the specified id in the request
exports.delete = async (req, res, next) => {
    try {
        const touristAttractionService = new TouristAttractionService();
        const deleted = await touristAttractionService.delete(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, "Tourist attraction not found"));
        }
        return res.send({ message: "Tourist attraction was deleted successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Could not delete Tourist attraction with id=${req.params.id}`)
        );
    }
};

// Find all favorite Tourist Attraction of a user
exports.findAllFavorite = async (req, res, next) => {
    try {
        const touristAttractionService = new TouristAttractionService();
        const touristAttraction = await touristAttractionService.allFavorite();
        return res.send(touristAttraction);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retrieving favorite Tourist attraction")
        );
    }
};

// Delete all Tourist Attraction of a user from the database
exports.deleteAll = async (req, res, next) => {
    try {
        const touristAttractionService = new TouristAttractionService();
        const deleted = await touristAttractionService.deleteAll();
        return res.send({
            message: `${deleted} Tourist attraction were deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while removing all Tourist attraction")
        );
    }
};