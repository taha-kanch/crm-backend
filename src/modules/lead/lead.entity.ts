import { BeforeCreate, BeforeSave, BelongsTo, Column, DataType, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../users/user.entity";
import { LeadStatus } from "src/core/constants";

@Table
export class Lead extends Model<Lead> {

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
    phoneNumber: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    jobTitle: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    address: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    city: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    state: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    country: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    postalCode: number

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    gender: string;

    @Default(LeadStatus.NEW)
    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    status: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    dealValue: number;

    @Column({
        type: DataType.DATE,
        allowNull: true,
    })
    wonDate: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    companyName: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    website: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: true,
    })
    annualRevenue: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    numberOfEmployees: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    industryType: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    fax: string;

    @Column({
        type: DataType.ARRAY(DataType.STRING),
        allowNull: true,
    })
    interestedProducts: string[];

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    leadOwner: number;

    @BelongsTo(() => User)
    user: User;

    @BeforeCreate
    static generateFullName(lead: Lead) {
        lead.fullName = `${lead.firstName} ${lead.lastName}`;
    }

    @BeforeSave
    static generateWonDate(lead: Lead) {
        if (lead.status === "WON") {
            lead.wonDate = new Date();
        }
    }

    toJSON() {
        return {
            ...this.get(),
            annualRevenue: parseFloat(this.getDataValue('annualRevenue') as unknown as string),
            dealValue: parseFloat(this.getDataValue('dealValue') as unknown as string),
        }
    }

}