import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
    declare username: string;
    declare password: string;
}

User.init(
    {
        username: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'User',
        tableName: 'users',
        timestamps: false,
    },
);

export default User;
