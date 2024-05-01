import {PlatformApplication} from "@tsed/common";
import {Inject} from "@tsed/di";
import "@tsed/platform-express";
import "@tsed/swagger";
import * as bodyParser from "body-parser";
import  compress from "compression";
import cookieParser from 'cookie-parser';
import methodOverride from "method-override";
import * as path from "path";
import cors from "cors";
import "@tsed/ajv";
import "@tsed/swagger";
import "@tsed/mongoose";
import { config, mongoPROD, mongoDEV,mongoConnect } from "./config";
import {Configuration} from "@tsed/di";
import { ClubController } from "./controllers/ClubController";
import { EventController } from "./controllers/EventController";
import { UploadController } from "./controllers/ImageController";
import { PodcastController } from "./controllers/PodcastController";
import { LineupController } from "./controllers/LineupController";


const rootDir = __dirname;
const clientDir = path.join(rootDir, "../../client/dist");

@Configuration({
  ...config,
  rootDir,
  acceptMimes: ["application/json"],
  httpPort: process.env.PORT || 8084,
  httpsPort: false,
  logger: {
    debug: true,
    logRequest: true,
    requestFields: ["reqId", "method", "url", "headers", "query", "params", "duration"]
  },
  mongoose: [
    {
      id: "default", // Recommended: define default connection. All models without dbName will be assigned to this connection
      // url: `mongodb://127.0.0.1:27017/${process.env.TEST===undefined ? "bratislava" : "test"}`,
      //url: `mongodb://127.0.0.1:27017/${
      url: mongoConnect,
      connectionOptions: {},
    },
    {
      id: "bratislava",
      url: mongoConnect,
      // url: `mongodb://127.0.0.1:27017/${
      //   process.env.TEST === "test" ? "test" : "bratislava"
      // }`,
      connectionOptions: {},
    },
  ],
  mount: {
    "/api": [
      `${rootDir}/controllers/**/*.ts` // Automatic Import, /!\ doesn't works with webpack/jest, use  require.context() or manual import instead
    ],
   "/manual": [ClubController, EventController,UploadController, PodcastController, LineupController]
  },
  // mount: { //from old code
  //   "/api": [`${rootDir}/controllers/**/*.ts`]
  // },
  swagger: [
    {
      path: "/api-docs"
    }
  ],
  calendar: {
    token: true
  },
  statics: {
    "/": clientDir
  }
})
export class Server   {
  @Inject()
  app: PlatformApplication;
  settings: Configuration;
  $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(cors())
      .use(cookieParser())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
    return null;
  }

  $afterRoutesInit() {
    this.app.get("/", (req, res) => {
      if (!res.headersSent) {
        // prevent index.html caching
        res.set({
          "Cache-Control": "no-cache, no-store, must-revalidate",
          "Pragma": "no-cache"
        });
      }
    });
    this.app.get(`*`, (req, res) => {
      res.sendFile(path.join(clientDir, "index.html"));
    });
  }
}
