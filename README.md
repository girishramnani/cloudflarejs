# cloudflarejs
a simple js wrapper for cloudflare dns api

# How to

```js

var cloudflare = require("cloudflare");

var cf = new cloudflare(email,key);
cf.add_record(domain,sub_domain,ip,callback); 
// cf.add_record("bottleneck.io","testing123","appbase.io",function(err,body){ console.log(body) })
```
