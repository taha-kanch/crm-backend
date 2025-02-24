import { Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { LEAD_REPOSITORY } from 'src/core/constants';
import { Lead } from './lead.entity';
import { LeadDto } from './dto/lead.dto';
import { Attributes } from 'sequelize';

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

    async findAll(): Promise<Lead[]> {
        try {
            return await this.leadRepository.findAll<Lead>({
                // include: [
                //     {
                //         model: SubscriptionType,
                //         as: "subscriptionType",
                //         attributes: ["typeName"],
                //     }
                // ]
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

    async update(id, data) {
        try {
            const [numberOfAffectedRows, [updatedLead]] = await this.leadRepository.update({ ...data }, { where: { id }, returning: true });
            return { numberOfAffectedRows, updatedLead };
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

}
