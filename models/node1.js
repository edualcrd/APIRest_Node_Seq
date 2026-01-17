import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Node1 = sequelize.define("Node1", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  node: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING, 
    allowNull: true 
  }
}, {
  tableName: "node1",
  timestamps: true
});

export default Node1;