import { TARGET_REPOSITORY } from "src/core/constants";
import { Target } from "./target.entity";

export const TargetProviders = [{
    provide: TARGET_REPOSITORY,
    useValue: Target
}];