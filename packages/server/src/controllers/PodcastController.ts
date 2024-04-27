import { Inject, Controller } from '@tsed/common';
import { PodcastModel } from '../models/podcast';
import { MongooseModel } from '@tsed/mongoose';
import { Required, Post, Get, Put } from '@tsed/schema';
import { QueryParams, PathParams, BodyParams } from '@tsed/platform-params';

@Controller('/podcast')
export class PodcastController {
    @Inject(PodcastModel) private model: MongooseModel<PodcastModel>;

    //http://0.0.0.0:8080/api/event/filter?from=01-01-2012&to=01-31-2023
    @Get('/')
    // @Get("/:clubId")
    // @Get("/:clubId/:from/:to")
    public async listBy() {
        const result = await this.model.find().sort({ registered: -1 }).populate({ path: 'podcastimage' }).exec();
        return result;
    }

    @Get('/page/:skip/:limit')
    // @Get("/:clubId")
    // @Get("/:clubId/:from/:to")
    public async listByPage(@PathParams('skip') skip?: any, @PathParams('limit') limit?: any) {
        console.log('skip', skip);
        const result = await this.model
            .find()
            .sort({ registered: -1 })
            .populate({ path: 'podcastimage' })
            .skip(skip)
            .limit(limit)
            .exec();
        return result;
    }

    @Get('/find')
    public async findBy(@Required() @QueryParams() params: any) {
        return await this.model.findOne(params).exec();
    }

    @Get('/:order')
    async findOne(@PathParams('order') order: string): Promise<MongooseModel<PodcastModel>> {
        const doc = await this.model.findOne({ order: order });
        return doc as any;
    }

    //   @Get("/")
    //   async listAll(): Promise<PodcastModel[]> {
    //     const result = await this.model.find().select({ name: 1, club: 1 }).exec();
    //     return result;
    //   }

    /*
  Add new event
   */
    @Post('/')
    async save(@BodyParams('podcast') podcast: PodcastModel): Promise<MongooseModel<PodcastModel>> {
        const doc = new this.model(podcast);
        await doc.save();
        return doc as any;
    }

    /*
  Update event
   */
    @Put('/:id')
    async update(
        @PathParams('id') id: string,
        @BodyParams('podcast') podcast: any,
    ): Promise<MongooseModel<PodcastModel>> {
        const doc = await this.model.findOneAndUpdate({ _id: id }, podcast);
        return doc as any;
    }

    /*
  Delete update
   */
    @Post('/:id')
    async delete(@PathParams('id') id: string): Promise<MongooseModel<PodcastModel>> {
        const doc = await this.model.findOneAndDelete({ _id: id });
        return doc as any;
    }
}
