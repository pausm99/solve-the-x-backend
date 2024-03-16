import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Player extends Model {}

Player.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        position: {
            type: DataTypes.ENUM({
                values: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward'],
            }),
            allowNull: false,
        },
        height: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
        width: {
            type: DataTypes.DECIMAL,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Player',
        tableName: 'players',
        timestamps: false,
    },
);

export default Player;
