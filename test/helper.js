const fs = require('fs-extra');
const data_dir = __dirname+"/fixtures/"

exports.sitemap = {
  index: fs.readFileSync(data_dir+"sitemap.xml"),
  foo: {
    sitemap: fs.readFileSync(data_dir+"foo.xml"),
    html: fs.readFileSync(data_dir+"foo.html"),
  },
  bar: {
    sitemap: fs.readFileSync(data_dir+"bar.xml"),
    html: fs.readFileSync(data_dir+"bar.html")
  },
};

