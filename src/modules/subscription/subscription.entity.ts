import { BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { SubscriptionType } from "../subscription-type/subscription-type.entity";

@Table
export class Subscription extends Model<Subscription> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    planName: string;

    @Column({
        type: DataType.FLOAT,
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    duration: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    description: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
    })
    features: string[];

    @Default(false)
    @Column({
        type: DataType.BOOLEAN,
        allowNull: true,
    })
    active: boolean;

    @ForeignKey(() => SubscriptionType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    typeID: number;

    @BelongsTo(() => SubscriptionType)
    subscriptionType: SubscriptionType;
}