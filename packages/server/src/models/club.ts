import {
    CollectionOf, Property,

    Required
} from "@tsed/schema";
import {Model, ObjectID} from "@tsed/mongoose";
import { MongooseIndex, MongoosePlugin, Ref, Schema, Unique } from '@tsed/mongoose';
import {EventModel} from "./event";
// enum Categories {
//     CAT1 = "cat1",
//     CAT2 = "cat2"
// }

// export class MyModel {
//     _id: string;
//
//     @Required()
//     unique: string;
//
//     @MinLength(3)
//     @MaxLength(50)
//     indexed: string;
//
//     @Minimum(0)
//     @Maximum(100)
//     @Default(0)
//     rate: Number = 0;
//
//     @Enum(Categories)
//         // or @Enum("type1", "type2")
//     category: Categories;
//
//     @Pattern(/[a-z]/)
//     pattern: String;
//
//     @Format("date-time")
//     @Default(Date.now)
//     dateCreation: Date = new Date();
// }

interface IPosition { lat: number, lng: number};
// @Model()
// export class Location {
//     _id: string;
//     @Required()
//     @Property()
//     address: string;
//
//     @Required()
//     @Property()
//     coordinates: IPosition;
// }

@Model()
export class ClubModel {
    @ObjectID("id")
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

    @Ref("EventModel")
    public event: Ref<EventModel>[];

    @Property()
    icon?: string;
}
