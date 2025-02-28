import { BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { Lead } from "../lead/lead.entity";
import { ActivityStatus } from "src/core/constants";
import { User } from "../users/user.entity";

@Table
export class Activity extends Model<Activity> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    type: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    status: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    scheduleDate: Date;

    @ForeignKey(() => Lead)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    leadID: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userID: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Lead)
    lead: Lead;

}