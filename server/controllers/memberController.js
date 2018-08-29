var mongoose = require('mongoose');
var Member = mongoose.model('Member');

var member = {
    get: () => {},

    create: (req, res) => {
        Member.findOne({'username': req.body.username})
		.then(member => {
			if (member) {
				res.json({ result: 0, msg: "User already exists!", data: {} });
			} else {
				var hash = generateHash(req.body.password);
				req.body.password = hash;
				Member.create(req.body)
					.then((data) => {
						res.json({ result: 1, msg: 'Create successful!', data: data});
					})
					.catch((err) => {
						console.log(err);
						res.json({ result: 0, msg: `${err}`, data: {} });
					})
			}
		}).catch(err => { res.json({ result: 0, msg: `${err}`, data: {} }); })
    },
    update: () => {},
    delete: () => {}
}
module.exports = member;