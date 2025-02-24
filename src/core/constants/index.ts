export const SEQUELIZE = 'SEQUELIZE';
export const DEVELOPMENT = 'development';
export const TEST = 'test';
export const PRODUCTION = 'production';

export const USER_REPOSITORY = "USER_REPOSITORY";
export const SUBSCRIPTION_TYPE_REPOSITORY = "SUBSCRIPTION_TYPE_REPOSITORY";
export const SUBSCRIPTION_REPOSITORY = "SUBSCRIPTION_REPOSITORY";
export const LEAD_REPOSITORY = "LEAD_REPOSITORY";
export const ACTIVITY_REPOSITORY = "ACTIVITY_REPOSITORY";

export enum Gender {
    MALE = "male",
    FEMALE = "female",
    OTHER = "other",
}

export enum LeadStatus {
    NEW = "NEW",
    FOLLOW_UP = "FOLLOW_UP",
    UNDER_REVIEW = "UNDER_REVIEW",
    DEMO = "DEMO",
    NEGOTIATION = "NEGOTIATION",
    WON = "WON",
    LOST = "LOST",
    UNQUALIFIED = "UNQUALIFIED",
}

export enum InterestedProduct {
    SOFTWARE = "SOFTWARE",
    HARDWARE = "HARDWARE",
    SERVICE = "SERVICE",
}

export enum IndustryType {
    IT = "IT",
    FINANCE = "FINANCE",
    HEALTHCARE = "HEALTHCARE",
    EDUCATION = "EDUCATION",
}

export enum ActivityType {
    CALL = "CALL",
    MEETING = "MEETING",
    EMAIL = "EMAIL",
}

export enum ActivityStatus {
    COMPLETED = "COMPLETED",
    SCHEDULED = "SCHEDULED",
}

