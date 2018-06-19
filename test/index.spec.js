const RemoteDiff = require("../remoteDiff");
const expect = require("chai").expect;
const helper = require("./helper");
const fs = require('fs-extra');
const nock = require("nock");
const rimraf = require('rimraf');

describe('Creates snapshots', function() {
  this.timeout(20000);

  before(function(done){
    nock("http://example.com").persist()
      .get("/sitemap_index.xml").reply(200, helper.sitemap.index)
      .get("/foo.xml").reply(200, helper.sitemap.foo.sitemap)
      .get("/foo.html").reply(200, helper.sitemap.foo.html)
      .get("/bar.xml").reply(200, helper.sitemap.bar.sitemap)
      .get("/bar.html").reply(200, helper.sitemap.bar.html);

    let sitemap="http://example.com/sitemap_index.xml";
    let version='Unnamed version';
    let records_dir = __dirname+"/tmp/";
    let remoteDiff = new RemoteDiff(sitemap, version, records_dir);
    remoteDiff.process().then(_=>done()).catch(e=>console.error(e));
  });

  after(function () {
    nock.cleanAll();
    rimraf(__dirname+"/tmp/example.com", _=>{});
  });

  it('creates web shots', function(done) {
    let exists = true;
    ["/tmp/example.com/bar.html.html",
      "/tmp/example.com/bar.html_desktop.png",
      "/tmp/example.com/bar.html_mobile.png",
      "/tmp/example.com/bar.html_tablet.png",
      "/tmp/example.com/foo.html.html",
      "/tmp/example.com/foo.html_desktop.png",
      "/tmp/example.com/foo.html_mobile.png",
      "/tmp/example.com/foo.html_tablet.png"
    ].forEach(file=>{
      exists = exists && fs.existsSync(__dirname+file);
    });

    expect(exists).to.be.true;
    done();
  });

  it('commits web shots into repository', function(done){
    let gitMasterHeadCommit = fs.existsSync(__dirname+"/tmp/example.com/.git/refs/heads/master");
    expect(gitMasterHeadCommit).to.be.true;
    done();
  });

});
