module.exports = (app) => {
	const demoController = require("../controllers/demo.controller.js");
	const router = require("express").Router();

	// Create a new Demo
	router.post("/", demoController.createDemo);

	// Retrieve all Demos
	router.get("/", demoController.findAll);
    
	// Retrieve all available Demos
	router.get("/available", demoController.findAllAvailable);
    
	// Update a Demo with id
	router.put("/:id", demoController.updateDemo);
    
	// Delete a Demo with id
	router.delete("/:id", demoController.deleteDemo);
    
	// Delete all Demos
	router.delete("/", demoController.deleteAll);
    
	app.use("/api/demos", router);
};

