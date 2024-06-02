import { CollectionOf, Default, Description, Format, Property, Required, string } from '@tsed/schema';
import { Model, ObjectID, Ref, Schema } from '@tsed/mongoose';

@Model()
export class PersonModel {
    @ObjectID('id')
    _id: string;
    @Property()
    @Required()
    name: string;
    @Property()
    external_link: string;
    @Property()
    description: string;
}
