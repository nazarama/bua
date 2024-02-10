import {Model, ObjectID} from "@tsed/mongoose";
import {Property, Required} from "@tsed/schema";

@Model()
export class ImageModel {
    @ObjectID("id")
    _id: string;
    // @Required()
    @Property()
    name: string;
    @Property()
    data: Buffer;
    @Property()
    type: string;
}
