import { Table, Column, Model, DataType, ForeignKey, BelongsTo, BeforeCreate, Default, BeforeUpdate } from 'sequelize-typescript';
import { Subscription } from '../subscription/subscription.entity';

@Table
export class User extends Model<User> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    firstName: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    lastName: string;

    @Default("")
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    fullName: string;

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
        type: DataType.STRING,
        allowNull: true,
    })
    phoneNumber: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    city: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    state: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    country: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    postalCode: number

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    gender: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    facebook: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    xcom: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    linkedIn: string;
    
    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    instagram: string;

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

    @BeforeCreate
    static generateFullName(user: User) {
        user.fullName = `${user.firstName} ${user.lastName}`;
    }
}