import { DataTypes } from "sequelize";
import sequelize from "../db/dbConfig.js";

const User = sequelize.define("user", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,// default size - 255
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    contactNumber: {
        type: DataTypes.STRING(10),
        allowNull: false
    }
});

sequelize.sync()
    .then(() => {
        console.log("user table created.....");
    })
    .catch((err) => {
        console.log("user somthing wrong....");
        console.log(err);
    })

export default User;

// async , await