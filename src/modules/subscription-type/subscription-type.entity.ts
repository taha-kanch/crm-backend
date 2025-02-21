import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class SubscriptionType extends Model<SubscriptionType> {
    
    @PrimaryKey
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    typeName: string;
}