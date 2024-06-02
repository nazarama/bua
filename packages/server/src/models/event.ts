import { CollectionOf, Default, Format, Property, Required, string } from '@tsed/schema';
import { Model, ObjectID, Ref, Schema } from '@tsed/mongoose';
import { ClubModel } from './club';
import { ImageModel } from './image';
import { PersonModel } from './person';

@Model()
export class EventModel {
    @ObjectID('id')
    _id: string;
    @Property()
    @Required()
    name: string;

    @Format('date-time')
    @Default(Date.now)
    dateCreation: Date = new Date();

    @Property()
    public from: Date;
    @Property()
    public to: Date;

    @Required()
    @Property()
    promoter: string;
    //TO-DO another model of users/ promotores

    @Required()
    @Default(false)
    active: boolean;

    @Required()
    @Default(false)
    top: boolean;

    @Required()
    @Property()
    description: string;

    @Required()
    @Property()
    fb: string;

    @Property()
    ra: string;

    @Ref('ImageModel')
    public image: Ref<ImageModel>;

    @Ref('ImageModel')
    public topimage: Ref<ImageModel>;

    // @Property()
    // @Ref('PersonModel')
    // public person?: Ref<PersonModel>[];
}
