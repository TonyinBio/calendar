const db = require("../models");
const Event = db.events;

// Create and Save a new event
exports.createEvent = (req, res) => {
	if (!req.body.checkout) {
		res.status(400).send({
			message: "Content cannot be empty!",
		});
		return;
	}

	// Create an event
	const event = {
		checkout: req.body.checkout,
		checkin: req.body.checkin,
		presenters: req.body.presenters,
		demoId: req.body.demoId,
        color: req.body.color
	};

	// Save an event in the db
	Event.create(event)
		.then((savedEvent) => {
			res.send(savedEvent);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occured while creating the Event",
			});
		});
};

// Retrieve (all) events by title, include demos
exports.findAllEvents = (req, res) => {
	Event.findAll({ include: ["demo"]})
		.then((events) => {
			res.send(events);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occured while retrieving events.",
			});
		});
};

// Find a single Event with an id
exports.findOneEvent = (req, res) => {
	const id = req.params.id;

	Event.findByPk(id)
		.then((event) => {
			if (event) {
				res.send(event);
			} else {
				res.status(404).send({
					message: `Cannot find event with id=${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error retrieving event with id=${id}`,
			});
		});
};

// Update an event by the id in the request
exports.updateEvent = (req, res) => {
	const id = req.params.id;

	Event.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Event was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Event with id=${id}. Maybe Event was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error updating Event with id=${id}`,
			});
		});
};

// Delete an event with the specified id in the request
exports.deleteEvent = (req, res) => {
	const id = req.params.id;

	Event.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Event was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Event with id=${id}. Maybe Event was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Could not delete Event with id=${id}`,
			});
		});
};