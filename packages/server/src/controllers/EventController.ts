import { Inject, Controller } from '@tsed/common';
import { EventModel } from '../models/event';
import { MongooseModel } from '@tsed/mongoose';
import { Required, Post, Get, Put } from '@tsed/schema';
import { ClubModel } from '../models/club';
import { QueryParams, PathParams, BodyParams } from '@tsed/platform-params';

@Controller('/event')
export class EventController {
    @Inject(EventModel) private model: MongooseModel<EventModel>;

    //http://0.0.0.0:8080/api/event/filter?from=kokor&to=kokot2
    //http://0.0.0.0:8080/api/event/filter?from=01-01-2012&to=01-31-2023
    @Get('/filter')
    // @Get("/:clubId")
    // @Get("/:clubId/:from/:to")
    public async listBy(@Required() @QueryParams('from') from: Date, @Required() @QueryParams('to') to: Date) {
        const result = await this.model.find({ from: { $gte: from, $lte: to } }).exec();
        return result;
    }

    @Get('/find')
    public async findBy(@Required() @QueryParams() params: any) {
        return await this.model.findOne(params).exec();
    }

    @Get('/')
    async listAll(): Promise<EventModel[]> {
        const result = await this.model.find().select({ name: 1, club: 1, from: 1 }).exec();
        return result;
    }

    /*
  Add new event
   */
    @Post('/')
    async save(@BodyParams('event') event: EventModel): Promise<MongooseModel<EventModel>> {
        const doc = new this.model(event);
        await doc.save();
        return doc as any;
    }

    /*
  Update event
   */
    @Put('/:id')
    async update(@PathParams('id') id: string, @BodyParams('event') event: any): Promise<MongooseModel<EventModel>> {
        const doc = await this.model.findOneAndUpdate({ _id: id }, event);
        return doc as any;
    }

    /*
  Delete update
   */
    @Post('/:id')
    async delete(@PathParams('id') id: string): Promise<MongooseModel<EventModel>> {
        const doc = await this.model.findOneAndDelete({ _id: id });
        return doc as any;
    }
}
