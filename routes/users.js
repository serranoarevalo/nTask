module.exports = app => {

	const Users = app.db.models.Users;

	app.route("/user")
		.all(app.auth.authenticate())

		/**
		* @api {get} /user Get logged in user data
		* @apiVersion 0.1.0
		* @apiGroup User
		* @apiHeader {String} Authorization Token of authenticated user
		* @apiHeaderExample {json} Header
		* 		{"Authorization": "JWT xyz.abc.123.hfg"}
		* @apiSuccess {Number} id User id
		* @apiSuccess {String} name User name
		* @apiSuccess {String} email User email
		* @apiSuccessExample {json} Success
		*		HTTP/1.1 200 OK
		*		{
		*			"id": 1,
		*			"name": "John Connor",
		*			"email": "john@connor.net"
		*		}
		* @apiErrorExample {json} Find error
		*		HTTP/1.1 412 Precondition Failed
		*/

		.get((req, res) => {
			Users.findById(req.user.id, {
				attributes: ["id", "name", "email"]
			})
			.then(result => res.json(result))
			.catch(error => {
				res.status(412).json({msg:error.message});
			});
		})

		/**
		* @api {delete} /user Delete logged in user
		* @apiGroup User
		* @apiHeader {String} Authorization Token of uthenticated user
		* @apiHeaderExample {json} Header
		*		{"Authorization": "JWT xyz.abc.123.hfg"}
		* @apiSuccessExample {json} Success
		*		HTTP/1.1 204 No Content
		* @apiErrorExample {json} Delete error
		*		HTTP/1.1 412 Precondition Failed
		*/


		.delete((req, res) => {
			Users.destroy({where: {id: req.user.id} })
			.then(result => res.sendStatus(204))
			.catch(error => {
				res.status(412).json({msg:error.message});
			});
		});

	/**
	* @api {post} /users Register a new user
	* @apiGroup User
	* @apiParam {String} name User name
	* @apiParam {String} email User email
	* @apiParam {String} password User password
	* @apiParamExample {json} Input
	* 		{
	*		"name": "John Connor",
	*		"email": "john@connor.net"
	*		"password": "12345"
	*	}
	* @apiSuccess {Number} id User id
	* @apiSuccess {String} name User name
	* @apiSuccess {String} email User email
	* @apiSuccess {String} password User encrypted password
	* @apiSuccess {Date} updated_at Updated time
	* @apiSuccess {Date} created_at Created time
	* @apiSuccessExample {json} Success
	*		HTTP/1.1 200 OK
	*		{
	*			"id": 1,
	*			"name": "John Connor",
	*			"email": "john@connor.net",
	*			"password": "$2a$%10sSKKD",
	*			"updated_at": "2016-02-10T15:20:11.700Z",
	*			"created_at": "2016-02-10T15:20:11.700Z"
	*		}
	* @apiErrorExample {json} Register error
	*		HTTP/1.1 412 Precondition Failed
	*/

	app.post("/users", (req, res) => {
		Users.create(req.body)
			.then(result => res.json(result))
			.catch(error => {
				res.status(412).json({msg:error.message});
			});
	});
}