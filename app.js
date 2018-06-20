const RemoteDiff=require('./remoteDiff');

let argv = require('minimist')(process.argv.slice(2), {
  string: ['version', 'records', 'remote']
});

let sitemap=argv._[0];
let version=argv.version || 'Unnamed version';
let records_dir = argv.records || __dirname+'/records/';
let remote = argv.remote || false;
let branch = argv.branch || false;

if(sitemap){
  let remoteDiff = new RemoteDiff(sitemap, {
    version: version,
    records_dir: records_dir,
    remote: remote,
    branch: branch
  });
  console.time("Done in");
  console.log("Processing sitemap, this may take a while...");
  remoteDiff.process({verbose: true})
    .then(msg=>console.log(msg))
    .then(_=>console.timeEnd("Done in"))
    .catch(e=>console.error(e));
} else {
  console.log(`usage: npm start [--version=<verion_tag>] [--records=<artifacts_directory>] [--remote=<remote_git_url>] [--branch=<remote_branch>] <http(s)://url_to_your_website_sitemap.xml>`);
}
