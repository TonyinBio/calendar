module.exports = (app) => {
	const controller = require("../controllers/calendar.controller.js");
	const router = require("express").Router();

	// Create a new Demo
	router.post("/", controller.createDemo);

	// Retrieve all Demos
	router.get("/", controller.findAll);
    
	// Retrieve all available Demos
	router.get("/available", controller.findAllAvailable);
    
	// Update a Demo with id
	router.put("/:id", controller.updateDemo);
    
	// Delete a Demo with id
	router.delete("/:id", controller.deleteDemo);
    
	// Delete all Demos
	router.delete("/", controller.deleteAll);
    
	app.use("/api/demos", router);
};

