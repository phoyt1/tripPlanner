const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripPlanner');

const places = db.define('Place', {
	address:{
		type: Sequelize.STRING
	},
	city: {
		type:Sequelize.STRING
	},
	state:{
		type:Sequelize.STRING
	},
	phone:{
		type:Sequelize.STRING
	},
	location:{
		type:Sequelize.ARRAY(Sequelize.FLOAT)
	}
})

const hotel = db.define('Hotel', {
	name:{
		type: Sequelize.STRING
	},
	num_stars: {
		type:Sequelize.FLOAT
	},
	amenities: {
		type:Sequelize.ARRAY(Sequelize.STRING)
	}
})

const activity = db.define('Activity', {
	name:{
		type: Sequelize.STRING
	},
	age_range:{
		type: Sequelize.STRING
	}
})

const restaurant = db.define('Restaurant', {
	name:{
		type: Sequelize.STRING
	},
	cuisine:{
		type:Sequelize.ARRAY(Sequelize.STRING)
	},
	price:{
		type:Sequelize.FLOAT,
		validate:{min:1,max:5}
	}
})

hotel.belongsTo(places);
activity.belongsTo(places);
restaurant.belongsTo(places);

module.exports = {
	place:places,
	hotel:hotel,
	restaurant:restaurant,
	activity:activity,
	db:db
}