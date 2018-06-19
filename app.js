const RemoteDiff=require('./remoteDiff');

let sitemap=process.argv[2];
let version=process.argv[3] || 'Unnamed version';
let records_dir = process.argv[4] || __dirname+'/records/';
let remoteDiff = new RemoteDiff(sitemap, version, records_dir);

console.time("Done in");
console.log("Processing sitemap, this may take a while...");
remoteDiff.process({verbose: true})
  .then(msg=>console.log(msg))
  .then(_=>console.log("Done"))
  .then(_=>console.timeEnd("Done in"))
  .catch(e=>console.error(e));
