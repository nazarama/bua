import { Model, ObjectID, Unique } from "@tsed/mongoose";
import mongoose from "mongoose";

@Model()
export class counter {
  @ObjectID("id")
  _id: string;

  @Unique()
  modelName: string;
  sequence_value: number = 0;
}
