import { Inject, Controller } from '@tsed/common';
import { EventModel } from '../models/event';
import { MongooseModel } from '@tsed/mongoose';
import { Required, Post, Get, Put } from '@tsed/schema';
import { PersonModel } from '../models/person';
import { LineupModel } from '../models/lineup';
import { QueryParams, PathParams, BodyParams } from '@tsed/platform-params';

@Controller('/lineup')
export class LineupController{
    @Inject(LineupModel) private lnmodel: MongooseModel<LineupModel>;
    @Inject(PersonModel) private pmodel: MongooseModel<PersonModel>;

    @Get('/persons')
    async listPersons(): Promise<PersonModel[]> {
        const result = await this.pmodel.find().sort([['name', 'descending']]).exec();
        return result;
    }

    @Post('/savePerson')
    async savePerson(@BodyParams('person') person: PersonModel): Promise<MongooseModel<EventModel>> {
        const doc = new this.pmodel(person);
        await doc.save();
        return doc as any;
    }

    @Post('/saveLineup')
    async saveLinup(@BodyParams('lineup') lineup: LineupModel): Promise<MongooseModel<LineupModel>> {
        const doc = new this.lnmodel(lineup);
        await doc.save();
        return doc as any;
    }


    @Get('/:event')
    async listLineup(
        @PathParams('event') event: string 
    ): Promise<LineupModel> {
        const result = await this.lnmodel.findOne( {event: event}).populate({
            path: 'persons',
            select:({ name: 1, external_link: 1 }),
        }).exec();
        return result;
    }
}