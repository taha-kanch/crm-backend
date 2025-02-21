import { SUBSCRIPTION } from "src/core/constants";
import { Subscription } from "./subscription.entity";

export const SubscriptionProviders = [{
    provide: SUBSCRIPTION,
    useValue: Subscription
}];