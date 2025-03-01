import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LEAD_REPOSITORY } from 'src/core/constants';
import { Lead } from './lead.entity';
import { LeadDto } from './dto/lead.dto';
import { Attributes } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class LeadService {

    constructor(@Inject(LEAD_REPOSITORY) private readonly leadRepository: typeof Lead) { }

    async create(lead: LeadDto): Promise<Lead> {
        try {
            return await this.leadRepository.create<Lead>({ ...lead } as Attributes<Lead>);
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAll(userID: number): Promise<Lead[]> {
        try {
            return await this.leadRepository.findAll<Lead>({
                where: {
                    leadOwner: userID
                }
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findOne(id): Promise<Lead | null> {
        try {
            return await this.leadRepository.findOne({
                where: { id },
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async delete(id) {
        try {
            return await this.leadRepository.destroy({
                where: { id },
            })
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async update(id, data: LeadDto) {
        try {
            const lead = await this.leadRepository.findOne({
                where: { id },
            });
            if (lead?.status !== data.status && data.status === "WON") {
                data.wonDate = new Date();
            }

            data.fullName = `${data.firstName} ${data.lastName}`;
            const [numberOfAffectedRows, [updatedLead]] = await this.leadRepository.update({ ...data }, { where: { id }, returning: true });
            return { numberOfAffectedRows, updatedLead };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getCount(userID: number): Promise<number> {
        try {
            return this.leadRepository.count({
                where: {
                    leadOwner: userID
                }
            });
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async getTotalWonLeadValue(userID, type: 'TODAY' | 'YESTERDAY' | 'MONTH'): Promise<number> {
        let startDate = new Date();
        let endDate = new Date();

        switch (type) {
            case 'TODAY':
                startDate.setHours(0, 0, 0, 0);
                endDate.setDate(startDate.getDate() + 1);
                break;

            case 'YESTERDAY':
                startDate.setDate(startDate.getDate() - 1);
                startDate.setHours(0, 0, 0, 0);
                endDate.setDate(startDate.getDate() + 1);
                break;

            case 'MONTH':
                startDate.setDate(1);
                startDate.setHours(0, 0, 0, 0);
                endDate.setMonth(endDate.getMonth() + 1, 0);
                endDate.setHours(23, 59, 59, 999);
                break;
        }

        const result = await this.leadRepository.sum('dealValue', {
            where: {
                leadOwner: userID,
                status: 'WON',
                wonDate: { [Op.between]: [startDate, endDate] },
            },
        });

        return result || 0;
    }

}
