import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { TARGET_REPOSITORY } from 'src/core/constants';
import { Target } from './target.entity';
import { TargetDto } from './dto/target.dto';
import { Attributes } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class TargetService {

    constructor(@Inject(TARGET_REPOSITORY) private readonly targetRepository: typeof Target) { }

    async upsertTarget(userID: number, target: TargetDto): Promise<Target> {
        const [targetData, created] = await this.targetRepository.findOrCreate({
            where: { year: target.year, month: target.month },
            defaults: { targetValue: target.targetValue } as Attributes<Target>,
        });

        if (!created) {
            targetData.targetValue = target.targetValue;
            targetData.userID = userID;
            await targetData.save();
        }

        return targetData;
    }

    async getByYearAndMonth(userID: number, year: number, month: number) {
        return this.targetRepository.findOne({
            where: {
                userID,
                year, month
            }
        });
    }

    async getByYear(userID: number, year: number) {
        return this.targetRepository.findAll({
            where: {
                userID,
                year
            }
        });
    }

    async deleteByYearAndMonth(userID: number, year: number, month: number) {
        return this.targetRepository.destroy({ 
            where: { userID, year, month } 
        });
    }

    async getCurrentAndLastMonthTarget(userID: number): Promise<Record<string, number>> {
        const now = new Date();
        const currentYear = now.getFullYear();
        const currentMonth = now.getMonth() + 1;

        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;

        const targets = await this.targetRepository.findAll({
            where: {
                userID,
                [Op.or]: [
                    { year: currentYear, month: currentMonth },
                    { year: lastMonthYear, month: lastMonth }
                ]
            }
        });

        const currentMonthTarget = targets.find(t => t.year === currentYear && t.month === currentMonth)?.targetValue || 0;
        const lastMonthTarget = targets.find(t => t.year === lastMonthYear && t.month === lastMonth)?.targetValue || 0;

        return {
            currentMonthTarget,
            lastMonthTarget
        };
    }

}
