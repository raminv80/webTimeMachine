[![Build Status](https://travis-ci.org/raminv80/webTimeMachine.svg?branch=master)](https://travis-ci.org/raminv80/webTimeMachine)

# Web Time Machine

WebTimeMachine creates visual and textual snapshot of web pages by processing site maps and stores them in a git 
repository.

This utility is designed out of the need to archive and inspect web page changes after each deployment. It git commits 
three different screenshots (mobile, tablet and desktop) plus html response of urls listed in your sitemap. This gives 
the benefit of inspecting changes done by each deployment from browser perspective.

This tool can be used as part of a CI build after deployment hook and it has capability to automatically push 
 commits to a github repository.

## Installation

    npm install web-time-machine

## Usage

This utility is designed for DevOps and is meant to be used as a tool to archive web pages up on deployment.

Once installation is complete run this command to create a snapshot:

    npm start [--version=<verion_tag>] [--records=<artifacts_directory>] [--remote=<remote_git_url>] \ 
    [--branch=<remote_branch>] [--verbose] [--batch=<batch_size>] <http(s)://url_to_your_website_sitemap.xml>
    
|Option|Required|description|Default|
|------|-----------|--------|-------|
|version|no|Used as git commit message.|`Unnamed version`|
|records|no|path to the artifacts directory.|`__dirname/records/`|
|remote|no|Remote git repository URL|false: by default commits will not be pushed to remote|
|branch|no|Remote git branch|`<website_domain_name>`|
|verbose|no|Enables verbose mode|false|
|batch|no|Urls are processed in concurrently in batch size set by this option|3|


This command creates four artifacts per url and stores them in `<records_directory>/<your_website_domain>`:
- Mobile snap shot: `<webpage_path>_mobile.html`
- Tablet snap shot: `<webpage_path>_tablet.html`
- Desktop snap shot: `<webpage_path>_desktop.html`
- Response body: `<webpage_path>.html`
  
Once all artifacts are created they will be committed to a git repository under `<artifact_directory>/<your  website 
domain>` with commit message of `<verion_tag>`.

If `remote` option is set changes are pushed to the remote. `branch` option controls which remote branch will be used.

## License

MIT.

