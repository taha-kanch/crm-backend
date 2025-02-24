import { LEAD_REPOSITORY } from "src/core/constants";
import { Lead } from "./lead.entity";

export const LeadProviders = [{
    provide: LEAD_REPOSITORY,
    useValue: Lead,
}];