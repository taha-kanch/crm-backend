import { ACTIVITY_REPOSITORY } from "src/core/constants";
import { Activity } from "./activity.entity";

export const ActivityProviders = [{
    provide: ACTIVITY_REPOSITORY,
    useValue: Activity,
}];