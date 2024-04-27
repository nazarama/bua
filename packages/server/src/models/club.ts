import { CollectionOf, Property, Required } from '@tsed/schema';
import { Model, ObjectID } from '@tsed/mongoose';
import { MongooseIndex, MongoosePlugin, Ref, Schema, Unique } from '@tsed/mongoose';
import { EventModel } from './event';

interface IPosition {
    lat: number;
    lng: number;
}

@Model()
export class ClubModel {
    @ObjectID('id')
    _id: string;
    @Required()
    @Property()
    name: string;

    @Required()
    @Property()
    address: string;

    @Required()
    @Property()
    position: IPosition;

    @Ref('EventModel')
    public event: Ref<EventModel>[];

    @Property()
    icon?: string;
}
