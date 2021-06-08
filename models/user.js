const router = require("express").Router();
const Joi = require ('joi');
const NotFoundError = require ('../errors/not-found-error');
const InvalidRequestBodyError = require('../errors/invalid-request-body-error');
const User = require('../models').User;
const Group = require('../models').Group;
const Exercise = require('../models').Exercise;
const ExerciseType = require('../models').ExerciseType;
const Set = require('../models').Set;
const {Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

module.exports = User;

//User model
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    //First name
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    //Last name
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 1
      }
    },
    //Email (cannot be null & must be a proper email)
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    //Phone
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: 10,
        isNumeric: true
      }
    },
    // Password
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

  },

  {
    hooks: {
      beforeCreate: async (newUserData) => {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

  User.associate = function(models){
    User.hasMany(models.Plant,{
      onDelete: "cascade"
    });
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(
      user.password,
      bcrypt.genSaltSync(10),
      null
    );
  });
  return User;
};