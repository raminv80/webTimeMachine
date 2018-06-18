const RemoteDiff=require('./remoteDiff');
let sitemap=process.argv[2];
let version=process.argv[3] || 'Unnamed version';
let records_dir = process.argv[4] || __dirname+'/records/';
let remoteDiff = new RemoteDiff(sitemap, version, records_dir);
remoteDiff.process();
