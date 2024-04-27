import { CollectionOf, Default, Description, Format, Property, Required, string } from '@tsed/schema';
import { Model, ObjectID, Ref, Schema, Unique } from '@tsed/mongoose';
import { PersonModel } from './person';
import { EventModel } from './event';

// @Model()
// export class LineupModel {
//     @ObjectID('id')
//     _id: string;

//     @Required()
//     @Ref(EventModel)
//     event: Ref<EventModel>;
    
//     @Ref(PersonModel)
//     persons: Ref<PersonModel>[];
//     @Property()
//     description: string;
// }
@Model()
export class LineupModel {
    @ObjectID('id')
    _id: string;

    @Required()
    @ObjectID() // Store only the ID of the EventModel
    @Unique()
    event: string;
    
    @Ref(PersonModel)
    persons: string[]; // Store only the IDs of PersonModel instances
    
    @Property()
    description: string;
}