const PlanService = require('../services/plan.service');
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

exports.create = async (req, res, next) => {
    if (!req.body?.username) {
        return next(new ApiError(400, "User Name can not be empty"));
    }
  
    try {
        const planService = new PlanService();
        const plan = await planService.create(req.body);
        return res.send(plan);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the Plan")
        );
    }
};

exports.findAll = async (req, res, next) => {
    let plan = [];
  
    try {
        const planService = new PlanService();
        const { tourname } = req.query;
        if (tourname) {
            plan = await planService.findByTourName(tourname);
        } else {
            plan = await planService.all();
        }
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retrieving Plan")
        );
    }

    return res.send(plan);
};

exports.findOne = async (req, res, next) => {
    try {
        const planService = new PlanService();
        const plan = await planService.findById(req.params.id);
        if (!plan) {
            return next(new ApiError(404, "Plan not found"));
        }
        return res.send(plan);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error retrieving Plan with id=${req.params.id}`)
        );
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be empty"));
    }
  
    try {
        const planService = new PlanService();
        const updated = await planService.update(req.params.id, req.body);
        if (!updated) {
            return next(new ApiError(404, "Plan not found"));
        }
        return res.send({ message: "Plan was updated successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error updating Plan with id=${req.params.id}`)
        );
    }
};

exports.delete = async (req, res, next) => {
    try {
        const planService = new PlanService();
        const deleted = await planService.delete(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, "Plan not found"));
        }
        return res.send({ message: "Plan was deleted successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Could not delete Plan with id=${req.params.id}`)
        );
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const planService = new PlanService();
        const deleted = await planService.deleteAll();
        return res.send({
            message: `${deleted} Plan were deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while removing all Plan")
        );
    }
};
