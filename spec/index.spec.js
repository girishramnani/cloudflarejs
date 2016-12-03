

var cf = require("../index")

function randInt(){
    return parseInt(String(Math.random()*10000000))
}

var headers = {
        "X-Auth-Key":process.env["AUTH_KEY"],
        "X-Auth-Email":process.env["AUTH_EMAIL"]
}

describe("Cloudflare rest api", function() {
    // base test
  it("should create a cloudflare object", function() {
      var cf_object = new cf(headers["X-Auth-Email"],headers["X-Auth-Key"]);
      expect(cf_object.email).toEqual(process.env["AUTH_EMAIL"])
  });

  it("add a A record", function(done) {
      var cf_object = new cf(headers["X-Auth-Email"],headers["X-Auth-Key"]);
      cf_object.add_record("bottleneck.io","testing"+String(randInt()),"54.197.195.142",function(error,res){
          expect(res.success).toEqual(true);
          done()

      })
  });
  it("add a CNAME record", function(done) {
      var cf_object = new cf(headers["X-Auth-Email"],headers["X-Auth-Key"]);
      cf_object.add_record("bottleneck.io","testing"+String(randInt()),"appbase.io",function(error,res){
          expect(res.success).toEqual(true);
          done()

      })
  });

});
