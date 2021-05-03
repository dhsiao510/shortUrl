let app = require("../express");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.use(chaiHttp);
chai.should();

describe("Test GET route to /", () => {
    it("It should return the html page", (done) => {
        chai.request(app)
        .get("/")
        .end((err, response) => {
            response.should.have.status(200);
        done();
        })
    })
})
