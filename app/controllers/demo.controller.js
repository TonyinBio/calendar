const db = require("../models");  // requires the index.js file be default
const Demo = db.demos;
const Op = db.Sequelize.Op;

// Create and Save a new demo
exports.createDemo = (req, res) => {
	if (!req.body.title) {
		res.status(400).send({
			message: "Content cannot be empty!",
		});
		return;
	}

	// Create a demo
	const demo = {
		title: req.body.title,
		available: req.body.available ? req.body.available : false,
	};

	// Save demo in the db
	Demo.create(demo)
		.then((savedDemo) => {
			res.send(savedDemo);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Demo",
			});
		});
};

// Retrieve (all) demos by title, include events.
exports.findAll = (req, res) => {
	const title = req.query.title;
	const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

	Demo.findAll({ where: condition, include: ["events"] })
		.then((demos) => {
			res.send(demos);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving demos.",
			});
		});
};

// Retrieve (all) demos by title, include events, don't include unavailable
exports.findAllAvailable = (req, res) => {
	const title = req.query.title;
	const condition = title
		? { title: { [Op.like]: `%${title}%` }, available: true }
		: { available: true };

	Demo.findAll({ where: condition, include: ["events"] })
		.then((demos) => {
			res.send(demos);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while retrieving demos.",
			});
		});
};

// *NOT NEEDED* find a single Demo with an id, include events.

// Update a demo by the id in the request
exports.updateDemo = (req, res) => {
	const id = req.params.id;

	Demo.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Demo was updated successfully.",
				});
			} else {
				res.send({
					message: `Cannot update Demo with id=${id}. Maybe Demo was not found or req.body is empty!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Error updating Demo with id=${id}`,
			});
		});
};

// Delete a demo with the specified id in the request
exports.deleteDemo = (req, res) => {
	const id = req.params.id;

	Demo.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Demo was deleted successfully!",
				});
			} else {
				res.send({
					message: `Cannot delete Demo with id=${id}. Maybe Demo was not found!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: `Could not delete Demo with id=${id}`,
			});
		});
};

// Delete all demos from the database.
// **Will this delete events as well?
exports.deleteAll = (req, res) => {
	Demo.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} Demos were deleted successfully!` });
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occured while removing all demos.",
			});
		});
};
