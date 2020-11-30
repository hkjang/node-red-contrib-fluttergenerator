const path = require("path");
const fs = require("fs");
const chalk = require("chalk");
const async = require("async");
const metalsmith = require("metalsmith");
const render = require("consolidate").handlebars.render;
const toSlugCase = require("to-slug-case");
const toCamelCase = require("to-camel-case");
const toPascalCase = require("to-pascal-case");
const toSnakeCase = require("to-snake-case");
const toSpaceCase = require("to-space-case");
const isTextOrBinary = require("istextorbinary");

module.exports = function generate(type, options, settings, msg, self) {
  if (settings.templatePath == "") {
    settings.templatePath = path.join(__dirname, "../template");
  }

  if (!pathExists(settings.templatePath)) {
    msg.payload = `Template folder (${path.resolve(settings.templatePath)}) doesn't exist`;
    self.error(msg.payload);
    self.send(msg);
  }

  const fullTemplatePath = path.join(settings.templatePath, "/" + type);

  if (!pathExists(fullTemplatePath)) {
    msg.payload = `'${options.type}' template folder doesn't exist in ${path.resolve(
        settings.templatePath
    )}`;
    self.error(msg.payload);
    self.send(msg);
  }
  self.error(`Generating files from '${type}' template with name: ${options.name} to ${options.destination}`);

  metalsmith(fullTemplatePath)
    .metadata(Object.assign({}, getNames(options.name)))
    .source(".")
    .destination(path.resolve(options.destination))
    .clean(false)
    .use(renderPaths)
    .use(renderTemplates)
    .build(function(err) {
      if (err) {
        msg.payload = err;
        self.error(msg.payload);
        self.send(msg);
      } else {
        msg.payload = "Done!";
        self.send(msg);
      }
    });
};

function getNames(name) {
  return {
    name,
    name_cc: toCamelCase(name),
    name_pc: toPascalCase(name),
    name_sc: toSlugCase(name),
    name_uc: toUpperCase(name),
    name_lc: toLowerCase(name),
    name_sn: toSnakeCase(name),
    name_sp: toSpaceCase(name)
  };
}

function toUpperCase(name) {
  return name.toUpperCase();
}

function toLowerCase(name) {
  return name.toLowerCase();
}

function pathExists(value) {
  return fs.existsSync(path.resolve(value));
}

function renderPaths(files, metalsmith, done) {
  const keys = Object.keys(files);
  const metadata = metalsmith.metadata();

  keys.forEach(key => {
    let newKey = replaceVars(key, metadata);

    if (newKey != key) {
      files[newKey] = files[key];
      delete files[key];
    }
  });

  done();
}

function renderTemplates(files, metalsmith, done) {
  const keys = Object.keys(files);
  const metadata = metalsmith.metadata();

  async.each(keys, run, done);

  function run(file, done) {
    if (
      isTextOrBinary.isBinarySync(path.basename(file), files[file].contents)
    ) {
      done();
      return;
    }

    let str = files[file].contents.toString();
    render(str, metadata, function(err, res) {
      if (err) {
        return done(err);
      }
      files[file].contents = new Buffer(res);
      done();
    });
  }
}

function replaceVars(value, object) {
  return value.replace(/\$?\{([@#$%&\w\.]*)(\((.*?)\))?\}/gi, (match, name) => {
    const props = name.split(".");
    const prop = props.shift();
    let o = object;

    if (o != null && prop in o) {
      return o[prop];
    }
    return "";
  });
}
