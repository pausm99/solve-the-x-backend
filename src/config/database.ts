import { Sequelize } from 'sequelize';

const dbPath = 'db/database.sqlite';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath,
});

export default sequelize;
