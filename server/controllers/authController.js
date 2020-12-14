const bcrypt = require('bcryptjs');

module.exports = {
    signup: async (req, res) => {
        // need db to add user eventually
        const db = req.app.get('db');

        // need user info from the registering user
        const {username, password, is_admin} = req.body;

        const foundUser = await db.auth.get_user(username);

        // if existing user found
        if (foundUser[0]) {
            return res.status(400).send('Try another username')
        }

        // hash the pass
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = await db.auth.add_new_user(username, hash, is_admin);
        delete newUser[0].hash;

        // create a session for the new user which logs them in
        req.session.user = { ...newUser[0] }

        // send a response with the session object so the front end can use the info as needed
        res.status(200).send(req.session.user);

    },
    signin: (req, res) => {

    },
    signout: (req, res) => {

    }
}