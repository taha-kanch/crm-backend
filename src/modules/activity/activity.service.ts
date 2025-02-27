import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ACTIVITY_REPOSITORY } from 'src/core/constants';
import { Activity } from './activity.entity';
import { ActivityDto } from './dto/activity.dto';
import { Attributes } from 'sequelize';
import { Lead } from '../lead/lead.entity';

@Injectable()
export class ActivityService {

    constructor(@Inject(ACTIVITY_REPOSITORY) private readonly activityRepository: typeof Activity) { }

    async create(activity: ActivityDto): Promise<Activity> {
        try {
            return await this.activityRepository.create<Activity>({ ...activity } as Attributes<Activity>);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(userID: number): Promise<Activity[]> {
        try {
            return await this.activityRepository.findAll<Activity>({
                where: {
                    userID: userID
                },
                include: [
                    {
                        model: Lead,
                        as: "lead",
                        attributes: ["firstName", "lastName", "fullName", "email", "jobTitle"],
                    }
                ]
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findByLeadID(leadID: number): Promise<Activity[]> {
        try {
            return await this.activityRepository.findAll<Activity>({
                where: {
                    leadID: leadID,
                },
                include: [
                    {
                        model: Lead,
                        as: "lead",
                        attributes: ["firstName", "lastName", "fullName", "email", "jobTitle"],
                    }
                ]
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id): Promise<Activity | null> {
        try {
            return await this.activityRepository.findOne({
                where: { id },
                include: [
                    {
                        model: Lead,
                        as: "lead",
                        attributes: ["firstName", "lastName", "fullName", "email", "jobTitle"],
                    }
                ]
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(id) {
        try {
            return await this.activityRepository.destroy({
                where: { id },
            })
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id, data) {
        try {
            const [numberOfAffectedRows, [updatedActivity]] = await this.activityRepository.update({ ...data }, { where: { id }, returning: true });
            return { numberOfAffectedRows, updatedActivity };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
