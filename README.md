WebTimeMachine creates visual and textual snapshot of web pages by processing site maps and stores them in a git 
repository.

This utility is designed out of the need to archive and inspect web page changes after each deployment. It checks in 
three different screenshots (mobile, tablet and desktop) plus html response of urls listed in your sitemap. This gives 
the benefit of inspecting changes done by each deployment from browser perspective.


## Installation

    npm install web-time-machine

## Usage

This utility is designed for DevOps and is meant to be used as a tool to archive web pages up on deployment.

Once installation is complete run this command to create a snapshot:

    npm start <http(s)://url_to_your_website_sitemap.xml> <verion_tag> [<artifacts_directory>]
    
First parameter is safe explanatory. 

Second parameter is used as commit message and is recommended to be set to 
version tag of your deployment.

Using last parameter artifacts directory can be configured. By default it creates "records" directory where the app 
is running from.

This command will create four artifacts per url within you Sitemap and stores them in <artifact_directory>/<your 
website domain>:
- Mobile snap shot: <webpage_path>_mobile.html
- Tablet snap shot: <webpage_path>_tablet.html
- Desktop snap shot: <webpage_path>_desktop.html
- Response body: <webpage_path>.html
  
Once all artifacts are created they will be committed to a git repository under <artifact_directory>/<your  website 
domain> with commit message of <verion_tag>.

## License

MIT.

