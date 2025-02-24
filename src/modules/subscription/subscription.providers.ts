import { SUBSCRIPTION_REPOSITORY } from "src/core/constants";
import { Subscription } from "./subscription.entity";

export const SubscriptionProviders = [{
    provide: SUBSCRIPTION_REPOSITORY,
    useValue: Subscription
}];