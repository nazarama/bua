import {
  CollectionOf,
  Default,
  Format,
  Property,
  Required,
  string,
} from "@tsed/schema";
import { Model, ObjectID, Ref, Schema } from "@tsed/mongoose";
import { ClubModel } from "./club";
import {ImageModel} from "./image";

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
@Model()
export class EventModel {
  @ObjectID("id")
  _id: string;
  @Property()
  @Required()
  name: string;

  @Format("date-time")
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

  @Ref("ImageModel")
  public image: Ref<ImageModel>;

  @Ref("ImageModel")
  public topimage: Ref<ImageModel>;

}
