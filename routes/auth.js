const router = require("express").Router();
const { body, validationResult, check } = require("express-validator");
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt_generator = require("../utils/jwt_generator");
const { login } = require("../controller/index");
const { sendEmail } = require("../utils/sendEmail");
const randomtoken = require("rand-token");
const crypto = require('crypto')
const nodemailer = require('nodemailer')

// send verification link
router.post("/send-email", (req, res, next) => {
	let email = req.body.email;
	db.query("SELECT * FROM users ")
		.then((result) => {
			let type = "success";
			let msg = "Email already verified";
			if (result.length > 0) {
				let token = randomtoken.generate(20);
				if (result[0].verify == 0) {
					let sent = sendEmail(email, token);
					if (sent != 0) {
						let data = {
							token: token,
						};
						db.query(
							'UPDATE users SET ? WHERE email ="' + email + '"',
							data,
							function (err, result) {
								if (err) throw err;
							}
						);
						type = "success";
						msg = "The verification link has been sent to your email address";
					} else {
						type = "error";
						msg = "Something goes to wrong. Please try again";
					}
				}
			}
		})
		.catch((err) => {
			if (err) {
				throw err;
			}
		});
});


let transporter = nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:'godwin2341@gmail.com',
		pass:'Kingsly8'
	}
})

// Register user
router.post(
	"/register",

	check("email").isEmail().withMessage("Not a valid email"),
	check("password")
		.isLength({ min: 7 })
		.withMessage("Password length must be greater 6")
		.matches(/\d/)
		.withMessage("Must contain a number"),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			errors.errors.map((error) => {
				res.status(400).json({
					message: error.msg,
				});
			});
			return;
		}
		try {
			const { name, email, phone, password } = req.body;
			verified = false
			const check = await db.query("SELECT * FROM users WHERE email = $1", [
				req.body.email,
			]);
			if (check.rows.length > 0) {
				return res
					.status(400)
					.json({ message: "User with this email already exist" });
			}
			// const salt = await bcrypt.genSalt(10);
			const hashPassword = await bcrypt.hash(password, 10);
			// const insert =
			// 	"INSERT INTO users(name, email, phone, password) VALUES ($1, $2, $3, $4) returning *";
			// const value = [name, email, phone, hashPassword];
			await db
				.query(
					"INSERT INTO users(name, email, phone, password) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
					[name, email, phone, hashPassword, verified, crypto.randomBytes(64).toString('hex')]
				)
				.then((response) => {
					const token = jwt_generator(response.rows[0]);
					 res.status(201).json({ message: "Signup success!" });
					 // send verification mail to user
					 let mailOptions = {
						from: ' "Verify your email" <godwin2341@gmail.com>',
						to:response.rows[0]['email'],
						subject:'Email verification',
						html:`<h1>${response.rows[0]['name']}! thanks for signing up</h1>
						<h4>Please verify your emaill address to continue<h4>
						<a href="https://${req.headers.host}/user/verify-email?token=${response.rows[0]['token']}">Verify Your Email</a>
						`
					 }

					 // sending mail
					 transporter.sendMail(mailOptions, (error, info) => {
						if(error){
							res.send(error.message)
						}
						res.send('Verification email is sent to your gmail account')

					 })
					 
					 
					 
				})
				.catch((err) => {
					res.json({ message: err.message });
				});
		} catch (error) {
			res.status(500).json({ message: "Internal server error" });
		}
	}
);

// Login user
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await db.pool.query("select * from users where email = $1", [
			email,
		]);
		const isMatch = await bcrypt.compare(password, user.rows[0].password);
		if (user.rows.length != 0) {
			if (isMatch) {
				const token = jwt_generator(user.rows[0]);
				// Storing user info on the express session
				req.session.token = token;
				console.log(req.session, "session");
				return res.status(200).json(req.session);

				//res.status(200).json({ token: token });
			} else {
				res.status(400).json({ message: "Password not correct" });
			}
		} else {
			res.status(404).json({ message: "Email not found" });
		}
	} catch (error) {
		res.send(error.message);
	}
});

// Login

router.post("/forgot-password", async (req, res) => {
	const { email } = req.body;
	// Check if user with email exists
	const user = await db.query("SELECT * FROM users WHERE email = $1", [email]);
	if (user.rows.length === 0) {
		return res
			.status(404)
			.json({ message: `User with the email ${email} was not found` });
	}
});

// Logout route
router.get("/logout", (req, res, next) => {
	if (req.session) {
		//delete the session object
		req.session.destroy((err) => {
			if (err) {
				return next(err);
			} else {
				return res.redirect("/login");
			}
		});
	}
});

module.exports = router;
