const readline = require('readline');
const path = require('path');
const fs = require('fs');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const templateEntryFileName = 'template-config.js';
const templateDataDirectory = 'files';
const templatePatchFilesExtension = '.$patch.json';

const ask = (question, def = '') =>
  new Promise(ok => rl.question(`${question} ${def ? '(' + def + ') ' : ''}? `, answer => ok(answer || def)));

const anyLocalDir = () => fs.readdirSync(__dirname).find(name => fs.lstatSync(path.join(__dirname, name)).isDirectory());

const fillPlaceholderValues = template =>
  // ask user for placeholders
  template.placeholders.reduce((prom, placeholder) =>
    prom
      .then(() => placeholder.auto ? placeholder.defaultValue : ask(placeholder.name, placeholder.defaultValue))
      .then(value => placeholder.value = value)
    , Promise.resolve())
  .then(() => template);

function main(template, projectRoot) {
  const applyPlaceholders = text => template.placeholders.reduce((result, placeholder) =>
    result.replace(new RegExp(placeholder.signature, 'g'), placeholder.value), text);

  // process template file
  const processFile = fn => {
    const templateFn = path.resolve(template.rootPath, fn);
    if (templateFn.endsWith(templatePatchFilesExtension)) {
      const patches = require(templateFn);
      // console.log(`Applying ${patches.length} patches from ${path.basename(templateFn)}`);
      patches.forEach(patch => patch.value = applyPlaceholders(patch.value));

      const projectFn = applyPlaceholders(path.resolve(projectRoot, fn.substr(0, fn.length - templatePatchFilesExtension.length)));
      const inputFileContent = fs.readFileSync(projectFn, 'utf8');

      const result = patches.reduce((result, patch, patchIndex) => {
        const patchedValue = result.replace(
          new RegExp(`(${patch.after || ''})(${patch.replace || ''})(${patch.before || ''})`, patch.flags),
          `$1${patch.value}$3`);
        if (patchedValue === result) {
          console.log(`Warning! ${templateFn} patch with index ${patchIndex} ("${patch.description || ''}") has not been applied!`);
        }
        return patchedValue;
      }, inputFileContent);

      fs.writeFileSync(projectFn, result, 'utf8');
    } else {
      const result = applyPlaceholders(fs.readFileSync(templateFn, 'utf8'));
      const projectFn = applyPlaceholders(path.resolve(projectRoot, fn));
      fs.writeFileSync(projectFn, result, 'utf8');
    }
  }

  // traverse template directory
  const processFolder = (relativePath = '') => {
    const absoluteTemplatePath = path.join(template.rootPath, relativePath);
    const absoluteProjectPath = applyPlaceholders(path.join(projectRoot, relativePath));
    if (!fs.existsSync(absoluteProjectPath)) {
      fs.mkdirSync(absoluteProjectPath);
    }
    fs.readdirSync(absoluteTemplatePath).forEach(entryName => {
      if (fs.lstatSync(path.join(absoluteTemplatePath, entryName)).isDirectory()) {
        processFolder(path.join(relativePath, entryName));
      } else {
        processFile(path.join(relativePath, entryName));
      }
    });
  }
  processFolder();
  console.log('Done!');
  process.exit();
}


ask('Project source path', process.argv[3] || path.resolve(__dirname, '../../src'))
  .then(srcPath =>
    ask('template', process.argv[2] || anyLocalDir())
      .then(templateName => {
        const template = require(path.join(__dirname, templateName, templateEntryFileName));
        template.rootPath = path.join(__dirname, templateName, templateDataDirectory);
        return fillPlaceholderValues(template);
      })
      .then(template => main(template, srcPath))
  );

