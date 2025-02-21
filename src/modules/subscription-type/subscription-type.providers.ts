import { SUBSCRIPTION_TYPE_REPOSITORY } from "src/core/constants";
import { SubscriptionType } from "./subscription-type.entity";

export const subscriptionTypeProviders = [{
    provide: SUBSCRIPTION_TYPE_REPOSITORY,
    useValue: SubscriptionType
}];