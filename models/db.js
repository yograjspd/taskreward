const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  'quick_pay',
  'postgres',
  'postgres',
  
  {
    dialect: 'postgres',
    port:5433
  },
);
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.users = require('./user.model.js')(sequelize,Sequelize);
db.role = require('./role.model.js')(sequelize,Sequelize);
db.bank_details = require('./bank_detail.model.js')(sequelize,Sequelize);
db.plans = require('./plan.model.js')(sequelize,Sequelize);
db.pins = require('./pin.model.js')(sequelize,Sequelize);
db.user_pins = require('./user_pin.model.js')(sequelize,Sequelize);
db.user_wallets = require('./user_wallet.model.js')(sequelize,Sequelize);
db.watch_videos = require('./watch_video.model.js')(sequelize,Sequelize);
db.user_watch_video = require('./user_watch_video.model.js')(sequelize,Sequelize);
db.generate_user_pins = require('./generate_user_pin.model.js')(sequelize,Sequelize);
db.daily_ad_income_histories = require('./daily_ad_income_history.model.js')(sequelize,Sequelize);
db.pin_transfers = require('./pin_transfer.model.js')(sequelize,Sequelize);
db.withdraw_amounts = require('./withdraw_amount.model.js')(sequelize,Sequelize);
db.user_levels = require('./user_level.model.js')(sequelize,Sequelize);
db.level_amounts = require('./level_amount.model.js')(sequelize,Sequelize);
db.level_amount_histories = require('./level_amount_history.model.js')(sequelize,Sequelize);
db.reward_income_histories = require('./reward_income_history.model.js')(sequelize,Sequelize);
db.pins.belongsTo(db.users,{foreignKey:{name: 'userId'}})
db.pins.belongsTo(db.plans,{foreignKey:{name: 'planId'}})

db.bank_details.belongsTo(db.users,{foreignKey: {
  name: 'userId'
}})
db.role.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
  });
  db.users.belongsToMany(db.role, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
  });
  db.ROLES = ["user", "admin", "moderator"];
module.exports = db;