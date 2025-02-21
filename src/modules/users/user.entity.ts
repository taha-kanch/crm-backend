import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Subscription } from '../subscription/subscription.entity';

@Table
export class User extends Model<User> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    subscriptionStartDate: Date;
    
    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    subscriptionEndDate: Date;

    @ForeignKey(() => Subscription)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    subscriptionID: number;

    @BelongsTo(() => Subscription)
    subscription: Subscription;
}