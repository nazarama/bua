import { ObjectId } from "mongoose";
//process.env.NODE_ENV
process.env.TEST = "test";
import { PlatformTest } from "@tsed/common";
import { expect } from "chai";
import * as SuperTest from "supertest";
import { Server } from "../Server";

export interface iEvent {
  _id?: string;
  name: string;
  from: Date;
  to: Date;
  promoter: string;
  active: Boolean;
}

describe("Session", () => {
  const bson = require("bson");

  const testEvent: iEvent = {
    name: "TEST",
    from: new Date(2022, 2, 1, 17, 0),
    to: new Date(2022, 2, 2, 5, 0),
    promoter: "TEST",
    active: true,
  };
  let request: any;

  before(PlatformTest.bootstrap(Server));
  before(() => {
    request = SuperTest.agent(PlatformTest.callback());
  });
  after(PlatformTest.reset);
  describe("controller / EVENT", () => {
    it("test create update and delete event", async () => {
      const res1 = await request.get("/api/event").expect(200);
      expect(res1.body.length).to.be.equal(1);

      const res2 = await request
        .post("/api/event")
        .send({ event: testEvent })
        .expect(200);

      const newId: string = JSON.parse(res2.text).id;
      const query = { _id: newId };
      const res4 = await request.put(`/api/event/${newId}`).send({
        event: {
          name: "changedNAME",
          promoter: "PROMOTER",
          active: false,
        },
      });
      const res5 = await request.post(`/api/event/${newId}`).expect(200);
      const res6 = await request.get("/api/event").expect(200);
      expect(res6.body.length).to.be.equal(1);
    });
  });
});
