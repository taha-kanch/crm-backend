import { BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { Lead } from "../lead/lead.entity";
import { ActivityStatus } from "src/core/constants";

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

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
    })
    reminder: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    emailAt: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    fromDate: Date;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    toDate: Date;

    @ForeignKey(() => Lead)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    leadID: number;

    @BelongsTo(() => Lead)
    lead: Lead;

}