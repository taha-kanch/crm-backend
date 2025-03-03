import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LeadService } from '../lead/lead.service';
import { ActivityService } from '../activity/activity.service';
import { TargetService } from '../target/target.service';
import { Lead } from '../lead/lead.entity';
import { LEAD_REPOSITORY, TARGET_REPOSITORY } from 'src/core/constants';
import { Sequelize } from 'sequelize';
import { Op } from 'sequelize';
import { Target } from '../target/target.entity';

@Injectable()
export class DashboardService {

    constructor(
        private readonly leadService: LeadService,
        private readonly activityService: ActivityService,
        private readonly targetService: TargetService,
        @Inject(LEAD_REPOSITORY) private readonly leadRepository: typeof Lead,
        @Inject(TARGET_REPOSITORY) private readonly targetRepository: typeof Target,
    ) { }

    async getSummary(userID: number) {

        try {
            const totalLeadCount = await this.leadService.getCount(userID);
            const totalScheduledActivityCount = await this.activityService.getScheduledCount(userID);
            const totalLeadValueOfToday = await this.leadService.getTotalWonLeadValue(userID, 'TODAY');
            const totalLeadValueOfYesterday = await this.leadService.getTotalWonLeadValue(userID, 'YESTERDAY');
            const totalLeadValueOfMonth = await this.leadService.getTotalWonLeadValue(userID, 'MONTH');
            const { currentMonthTarget, lastMonthTarget } = await this.targetService.getCurrentAndLastMonthTarget(userID);

            return {
                totalLeadCount,
                totalScheduledActivityCount,
                totalLeadValueOfToday,
                totalLeadValueOfYesterday,
                totalLeadValueOfMonth,
                currentMonthTarget,
                lastMonthTarget
            }

        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }

    }

    async getLeadsAnalytics(userID: number, year: number) {
        const results = await this.leadRepository.findAll({
            attributes: [
                [Sequelize.literal(`EXTRACT(MONTH FROM "createdAt")`), 'month'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'leadCount'],
            ],
            where: {
                leadOwner: userID,
                createdAt: {
                    [Op.between]: [
                        new Date(`${year}-01-01 00:00:00`),
                        new Date(`${year}-12-31 23:59:59`),
                    ],
                },
            },
            group: [Sequelize.col('month')],
            order: [Sequelize.col('month')],
        });

        return results.map((item: any) => ({
            month: item.getDataValue('month'),
            leadCount: item.getDataValue('leadCount'),
        }));
    }

    async getLeadValueSummary(userID: number, type: 'MONTHLY' | 'YEARLY', year?: number) {
        let leadResults;
        let targetResults;

        if (type === 'MONTHLY') {
            leadResults = await this.leadRepository.findAll({
                attributes: [
                    [Sequelize.literal(`EXTRACT(MONTH FROM "wonDate")`), 'month'],
                    [Sequelize.fn('SUM', Sequelize.col('dealValue')), 'leadValueSum'],
                ],
                where: {
                    leadOwner: userID,
                    status: 'WON',
                    wonDate: {
                        [Op.between]: [
                            new Date(`${year}-01-01 00:00:00`),
                            new Date(`${year}-12-31 23:59:59`),
                        ],
                    },
                },
                group: [Sequelize.col('month')],
                order: [Sequelize.col('month')],
                raw: true,
            });

            targetResults = await this.targetRepository.findAll({
                attributes: ['month', 'targetValue'],
                where: {
                    year: year,
                    userID,
                },
                raw: true,
            });
            return leadResults.map((lead) => {
                const target = targetResults.find((t) => t.month == lead.month);
                return {
                    month: lead.month,
                    leadValueSum: lead.leadValueSum,
                    targetValue: target?.targetValue,
                };
            });
        } else {
            leadResults = await this.leadRepository.findAll({
                attributes: [
                    [Sequelize.literal(`EXTRACT(YEAR FROM "wonDate")`), 'year'],
                    [Sequelize.fn('SUM', Sequelize.col('dealValue')), 'leadValueSum'],
                ],
                where: {
                    leadOwner: userID,
                    status: 'WON',
                    wonDate: {
                        [Op.gte]: new Date('2025-01-01 00:00:00'),
                    },
                },
                group: [Sequelize.col('year')],
                order: [Sequelize.col('year')],
                raw: true,
            });

            targetResults = await this.targetRepository.findAll({
                attributes: [[Sequelize.fn('SUM', Sequelize.col('targetValue')), 'targetValue']],
                where: {
                    year: { [Op.gte]: 2025 },
                    userID
                },
                raw: true,
            });

            return leadResults.map((lead) => ({
                year: lead.year,
                leadValueSum: lead.leadValueSum,
                targetValue: targetResults[0]?.targetValue,
            }));
        }
    }

}
