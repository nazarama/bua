import {Required} from "@tsed/schema";

process.env.TEST = "test";
process.env.TEST = "test";
import {Get, PathParams, PlatformTest} from "@tsed/common";
import { expect } from "chai";
import * as SuperTest from "supertest";
import { Server } from "../Server";
//todo make help class for interfaces as this one
import {iEvent} from "./EventController.spec";
import * as fs from 'fs';
interface iClub {
    _id?: string;
    name: string;
    position: any;
    address: string;
    event?: [iEvent]
}

describe("Session", () => {


    const testClub: iClub = {
        name: "TESTCLUB",
        address: "v pici",
        position : {
            "lat" : 48.1446473916946,
            "lng" : 17.1121549423383
        },

    };
    let request: any;

    before(PlatformTest.bootstrap(Server));
    before(() => {
        request = SuperTest.agent(PlatformTest.callback());
    });
    after(PlatformTest.reset);
    describe("controller / CLUB", () => {
        it("test create update and delete club", async () => {
            const res1 = await request.get("/api/club").expect(200);
            expect(res1.body.length).to.be.equal(0);


            const res2 = await request
                .put("/api/club")
                .send({ club: testClub })
                .expect(200);

            const newId: string = JSON.parse(res2.text).id;

            const res3 = await request.get("/api/club").expect(200);
            expect(res3.body.length).to.be.equal(1);

            const res4 = await request.post(`/api/club/${newId}`).expect(200);

            const res5 = await request.get("/api/club").expect(200);
            expect(res5.body.length).to.be.equal(0);

        });
    });
})
