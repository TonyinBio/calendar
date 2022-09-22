module.exports = (app) => {
	const controller = require("../controllers/calendar.controller.js");

	const router = require("express").Router();

	// Create a new Event
    router.post("/", controller.createEvent)

    // Retrieve an Event with id
    router.get("/:id", controller.findOneEvent)

    // Update an Event with id
    router.put("/:id", controller.updateEvent)

    // Delete an Event with id    
    router.delete("/:id", controller.deleteEvent)

	app.use("/api/events", router);
};