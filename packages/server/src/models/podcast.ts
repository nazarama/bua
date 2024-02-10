import {
    CollectionOf,
    Default,
    Format,
    Property,
    Required,
    string,
  } from "@tsed/schema";
  import {ImageModel} from "./image";
  import { Model, ObjectID, Ref, Schema } from "@tsed/mongoose";
import { StringErrorFilter } from "@tsed/common";

  @Model()
  export class PodcastModel {
    @ObjectID("id")
    _id: string;
    @Required()
    name: string;
   
    @Required()
    mix: string;

    @Required()
    @Property()
    interview: string;

    @Required()
    @Property()
    order: string;

    @Format("date-time")
    @Default(Date.now)
    registered: Date = new Date();

    @Ref("ImageModel")
    public podcastimage: Ref<ImageModel>;

  }