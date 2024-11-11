const Login = require("../model/logModel.js");

exports.create = (req, res) => {
    const login = new Login({
        login: req.body.login,
        mp: req.body.mp,
    });

    login.save()
        .then(data => {
            res.status(201).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Login.",
            });
        });
};

exports.findAll = (req, res) => {
    Login.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving logins.",
            });
        });
};

exports.findOne = (req, res) => {
    Login.findById(req.params.loginId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Login not found with id " + req.params.loginId,
                });
            }
            res.send(data);
        })
        .catch(err => {
            if (err.kind === "ObjectId") {
                return res.status(404).send({
                    message: "Login not found with id " + req.params.loginId,
                });
            }
            return res.status(500).send({
                message: "Error retrieving message with id " + req.params.loginId,
            });
        });
};

exports.update = (req, res) => {
    Login.findByIdAndUpdate(
        req.params.loginId,
        {
            login: req.body.login,
            mp: req.body.mp,
        },
        { new: true }
    )
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message: "Login non trouvé avec l'ID " + req.params.loginId,
            });
        }
        res.send(data);
    })
    .catch(err => {
        if (err.kind === "ObjectId") {
            return res.status(404).send({
                message: "Login non trouvé avec l'ID " + req.params.loginId,
            });
        }
        return res.status(500).send({
            message: "Erreur lors de la mise à jour du login avec l'ID " + req.params.loginId,
        });
    });
};

exports.delete = (req, res) => {
    Login.findByIdAndDelete(req.params.loginId)
        .then(data => {
            if (!data) {
                return res.status(404).send({
                    message: "Login non trouvé avec l'ID " + req.params.loginId,
                });
            }
            res.send({ message: "Login supprimé avec succès !" });
        })
        .catch(err => {
            if (err.kind === "ObjectId" || err.name === "NotFound") {
                return res.status(404).send({
                    message: "Login non trouvé avec l'ID " + req.params.loginId,
                });
            }
            return res.status(500).send({
                message: "Impossible de supprimer le login avec l'ID " + req.params.loginId,
            });
        });
};
