const db = require("../models");
const Events = db.events;
const Op = db.Sequelize.Op;

// Create and Save a new calendar Event
exports.create = (req, res) => {
	if (!req.body.title) {
		res.status(400).send({
			message: "Content can be empty!",
		});
		return;
	}

	// Create a calendar event
	const event = {
		title: req.body.title,
		demotype: req.body.demotype,
		presenters: req.body.presenters,

		checkout: req.body.checkout,
		checkin: req.body.checkin,
	};

	// Save event in the db
	Events.create(event)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Some error occurred while creating the Event",
			});
		});
};

// Retrieve all Calendar Events from the database.
exports.findAll = (req, res) => {
	const title = req.query.title;
	let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

	Events.findAll({ where: condition })
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "Some error occurred while retrieving tutorials.",
			});
		});
};

// Find a single Calendar Event with an id
exports.findOne = (req, res) => {
    const id = req.params.id

    Events.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send({
                    message: `Cannot find event with id=${id}.`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Error retrieving event with id=${id}`
            })
        })
};

// Update a Calendar Event by the id in the request
exports.update = (req, res) => {};

// Delete a Calendar Event with the specified id in the request
exports.delete = (req, res) => {};

// Delete all Calendar Events from the database.
exports.deleteAll = (req, res) => {};

// Find all Calendar Events of a demotype
exports.findAllPublished = (req, res) => {};
