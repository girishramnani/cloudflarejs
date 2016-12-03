

var request = require("request");
var validateip = require("validate-ip");
function cloudFlare(email,api_key){

  this.email = email;
  this.api_key = api_key;
  this.api_url = "https://api.cloudflare.com/client/v4/";

  this.headers = {
          "X-Auth-Key":this.api_key,
          "X-Auth-Email":this.email,
          "Content-Type": "application/json"
      }
  }


cloudFlare.prototype.get_zone_id = function (domain,cb) {

    //TODO use a query method to add query params

    var options = {
        url : this.api_url+"zones?name="+domain,
        headers: this.headers
    }

    request(options,function(error,response,body){
        if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            return cb(json.result[0].id)
    }
    })

};

cloudFlare.prototype.add_record = function (zone,sub_domain,ip,cb) {

    var self = this;

    var type = validateip(ip) ? "A" : "CNAME";
    
    this.get_zone_id(zone,function(id){

        var domain_name = sub_domain;
        var options = {
            method:"POST",
            url : self.api_url+"zones/"+id+"/dns_records",
            headers: self.headers,
            json:true,
            body:{
                type:type,
                name:domain_name,
                content:ip
            }
        }

        request(options,function(error,response,body){
            cb(error,body);
        });



    })


};

module.exports = cloudFlare;
