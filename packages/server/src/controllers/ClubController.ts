import { BodyParams, Err, Inject, PathParams, QueryParams, Controller, Get, Post, Put } from '@tsed/common';
import { ClubModel } from '../models/club';
import { MongooseDocument, MongooseModel } from '@tsed/mongoose';
import { date, Required } from '@tsed/schema';
import { EventModel } from '../models/event';
import e from 'express';

@Controller('/club')
export class ClubController {
    @Inject(ClubModel) private clubModel: MongooseModel<ClubModel>;
    @Inject(EventModel) private eventModel: MongooseModel<ClubModel>;
    @Get('/')
    async listAll(): Promise<ClubModel[]> {
        const result = await this.clubModel
            .find({ event: { $exists: true } })
            .populate({ path: 'event', match: { name: { $exists: true } } });
        return result;
    }

    //this will return only clubs without items on event
    // not great but works :()
    @Get('/only')
    async listClubsOnly(): Promise<ClubModel[]> {
        // const result = await this.clubModel
        //   .find({ })

        // return result.map((e: ClubModel)=> ({ ...e, event: []}))

        const result = await this.clubModel.find({});

        return result.map((e) => {
            const clubObject = e;
            clubObject.event = [];

            // You can also include the original '_id' if needed
            clubObject.id = e._id;

            return clubObject;
        });
    }

    @Get('/flatten')
    async listAllFlatten(
        @QueryParams('from') from: Date,
        @QueryParams('to') to: Date,
        @QueryParams('club') club: string,
    ): Promise<any[]> {
        let query = [
            {
                $unwind: {
                    path: '$event',
                },
            },
            {
                $lookup: {
                    from: 'eventmodels',
                    localField: 'event',
                    foreignField: '_id',
                    as: 'events',
                },
            },
            {
                $project: {
                    eventId: '$events._id',
                    eventName: '$events.name',
                    promoter: '$events.promoter',
                    dateFrom: '$events.from',
                    dateTo: '$events.to',
                    active: '$events.active',
                    imageId: '$events.image',
                    fb: '$events.fb',
                    clubName: '$name',
                    clubId: '$id',
                    clubIcon: '$icon',
                    top: '$events.top',
                    topImage: '$events.topimage',
                    description: '$events.description',
                },
            },
            { $sort: { dateFrom: 1 } },
        ];
        let clubQuery = {};
        let dateQuery = {};
        if (club) {
            clubQuery = { $match: { clubName: club } };
            query.push(clubQuery as any);
        }
        if (from) {
            console.log('rrrrr');
            dateQuery = { $match: { dateFrom: { $gte: from, $lte: to } } };
            query.push(dateQuery as any);
        }
        const result = await this.clubModel.aggregate(query as any);
        console.log('query', query);
        return result;
    }

    @Get('/clubs')
    async listClubs() {
        const result = this.clubModel.find({}).select('name');
        return result;
    }
    @Get('/filter')
    async listBy(
        @QueryParams('from') from: Date,
        @QueryParams('to') to: Date,
        @QueryParams('club') club: string,
        @QueryParams('eventId') eventId: string,
    ): Promise<ClubModel[]> {
        if (!from && club) {
            const result = await this.clubModel.find({
                event: { $exists: true },
                name: club,
            });
            return result.filter((e: ClubModel) => e.event!.length > 0);
        } else {
            if (club) {
                const result = await this.clubModel.find({ event: { $exists: true }, name: club }).populate({
                    path: 'event',
                    options: { sort: { from: 1 } },
                    match: { name: { $exists: true }, from: { $gte: from, $lte: to } },
                });
                return result.filter((e: ClubModel) => e.event!.length > 0);
            } else {
                const result = await this.clubModel.find({ event: { $exists: true } }).populate({
                    path: 'event',
                    options: { sort: { from: 1 } },
                    match: { name: { $exists: true }, from: { $gte: from, $lte: to } },
                });
                return result.filter((e: ClubModel) => e.event!.length > 0);
            }
        }
    }

    @Put('/')
    async save(@BodyParams('club') club: ClubModel): Promise<MongooseModel<ClubModel>> {
        const doc = new this.clubModel(club);
        await doc.save();

        return doc as any;
    }
    /*
  Find event in specific club
 */
    @Get('/:clubId/:eventId')
    async findEvent(@PathParams('clubId') clubId: string, @PathParams('eventId') eventId: string) {
        const result = await this.clubModel.find({ event: { $exists: true }, _id: clubId }).populate({
            path: 'event',
            match: { name: { $exists: true }, _id: eventId },
        });
        return result;
    }

    /*
  Adding or removing event from club, depends if event id exists already in specific club
 */
    @Put('/:clubId/:eventId')
    async updateEvent(@PathParams('clubId') clubId: string, @PathParams('eventId') eventId: string) {
        const club = await this.clubModel.findById({ _id: clubId }).exec();
        // remove
        if (club!.event.includes(eventId)) {
            const index = club!.event.indexOf(eventId, 0);
            club!.event.splice(index, 1);
            return club!.save();
        }
        // add
        else {
            if ((await this.eventExist(eventId)) != false) {
                club!.event.push(eventId);
                return club!.save();
            } else {
                return new Error('EVENT DOES NOT EXIST');
            }
        }
    }
    //check if event is event registered
    async eventExist(eventId: string): Promise<boolean> {
        const event = !!(await this.eventModel.findById({ _id: eventId }).exec());
        if (event === false) {
            return false;
        } else {
            return true;
        }
    }

    /*
Delete update
 */
    @Post('/:id')
    async delete(@PathParams('id') id: string): Promise<MongooseModel<ClubModel>> {
        const doc = await this.clubModel.findOneAndDelete({ _id: id });
        return doc as any;
    }
}
