

// Export robot names
let c = db.getCollection('robots').find({}, {name:1, _id:0});
while(c.hasNext()) {printjson(c.next())}
