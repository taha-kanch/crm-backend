import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.entity";

@Table
export class Target extends Model<Target> {

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    year: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    month: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    targetValue: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userID: number;

    @BelongsTo(() => User)
    user: User;

    toJSON() {
        return {
            ...this.get(),
            targetValue: parseFloat(this.getDataValue('targetValue') as unknown as string),
        }
    }

}