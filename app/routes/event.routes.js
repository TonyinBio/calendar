module.exports = (app) => {
	const eventController = require("../controllers/event.controller.js");

	const router = require("express").Router();

	// Create a new Event
    router.post("/", eventController.createEvent)

    // Retrieve an Event with id
    router.get("/:id", eventController.findOneEvent)

    // Retrieve all events
    router.get("/", eventController.findAllEvents)

    // Update an Event with id
    router.put("/:id", eventController.updateEvent)

    // Delete an Event with id    
    router.delete("/:id", eventController.deleteEvent)

	app.use("/api/events", router);
};