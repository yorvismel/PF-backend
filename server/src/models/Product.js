const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Product',
    {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        validate: {
        isUUID: 4,
        }
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    price: {
        type: DataTypes.FLOAT,
        validate: {
            isFloat: true,
            min: 0.0,
        }
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },


    image: {
        type: DataTypes.STRING,
    },

    rating: {
        type: DataTypes.FLOAT,
        validate: {
            isFloat: true,
            max: 5.0,
            min: 0.0,
        }
    }

    },
    {
        timestamps: false,
        freezeTableName: true
    });
};
