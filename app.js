const RemoteDiff=require("./remoteDiff");

let argv = require("minimist")(process.argv.slice(2), {
  string: ["version", "records", "remote"],
  boolean: ["verbose"],
  default: {
    "version": "Unnamed version",
    "records": __dirname+"/records/",
    "remote": false,
    "branch": false,
    "verbose": false,
    "batch": 3
  }
});

let sitemap=argv._[0];
if(sitemap){
  let remoteDiff = new RemoteDiff(sitemap, {
    version: argv.version,
    records_dir: argv.records,
    remote: argv.remote,
    branch: argv.branch,
    verbose: argv.verbose,
    batch: argv.batch
  });
  console.time("Done in");
  console.log("Processing sitemap, this may take a while...");
  remoteDiff.processSitemap()
    .then(msg=>console.log(msg))
    .then(_=>console.timeEnd("Done in"))
    .catch(e=>console.error(e));
} else {
  console.log(`usage: npm start [--version=<verion_tag>] [--records=<artifacts_directory>] [--remote=<remote_git_url>] [--branch=<remote_branch>] <http(s)://url_to_your_website_sitemap.xml>`);
}
