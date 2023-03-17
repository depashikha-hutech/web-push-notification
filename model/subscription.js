const sequelize = require("sequelize");
const {DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize)=> {
    const Subscription = sequelize.define(
        "subscriptions",
        {
            id: {
                type :DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            endpoint: DataTypes.STRING,
            keys:{
                type:DataTypes.JSON
            }
        },
        { tabelName :"subscriptions"}
    );
    return Subscription;
}