const db = require('../db')
module.exports = {
	login: async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await db.pool.query("select * from users where email = $1", [
				email,
			]);
			const isMatch = await bcrypt.compare(password, user.rows[0].password);
			if (user.rows.length != 0) {
				if (isMatch) {
					const token = jwt_generator(user.rows[0]);
					// localStorage.setItem('token', token)

					res.status(200).json({ token: token });
				} else {
					res.status(400).json({ message: "Password not correct" });
				}
			} else {
				res.status(404).json({ message: "Email not found" });
			}
		} catch (error) {
			res.send(error.message);
		}
	},
	register: () => {},
};
