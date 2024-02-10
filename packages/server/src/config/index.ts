import {join} from "path";
import {loggerConfig} from "./logger";
import mongooseConfig from "./mongoose";

//const {version} = require("package.json");
export const rootDir = join(__dirname, "..");
export const mongoPROD = "mongodb+srv://nazarama:choraPalma1.3@cluster0.rfrhrbm.mongodb.net/default?retryWrites=true&w=majority";
export const mongoDEV = `mongodb://127.0.0.1:27017/${process.env.TEST===undefined ? "default" : "test"}`;
export const mongoConnect = `mongodb${process.env.NODE_ENV === "production" ? "+srv://nazarama:choraPalma1.3@cluster0.rfrhrbm.mongodb.net/default?retryWrites=true&w=majority": "://127.0.0.1:27017/default" }`;
export function mongoConnection(): string{
  if(process.env.NODE_ENV === "production") { return mongoPROD}
  else {
    return mongoDEV;
  }
}

export const config: Partial<TsED.Configuration> = {
//  version,
  //rootDir,
  logger: loggerConfig,
  //mongoose: mongooseConfig,
  // additional shared configuration
};
