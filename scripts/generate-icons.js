const fs = require('fs');
const path = require('path');

const ICONS_PATH = '/assets/icons';

const CSS_FILE_NAME = 'icons.css';
const CSS_DIRECTORY_PATH = '../src/app/[locale]/';

const TS_FILE_NAME = 'icons.ts';
const TS_DIRECTORY_PATH = '../src/components/ui/icon/';

let CSS_FILE_CONTENT = [];
let TYPE_FILE_CONTENT = [];

const getIconStyle = (className, fileName) => `
.${className} {
  mask-image: url('${ICONS_PATH}/${fileName}');
}
`;

function toCamelCase(val) {
  return val.trim().replace(/([-_ ]+)./g, ($) => $.at(-1).toUpperCase());
}
function toKebabCase(val) {
  return toCamelCase(val).replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, o) => (o ? '-' : '') + $.toLowerCase(),
  );
}

fs.readdirSync(path.join(__dirname, '../public' + ICONS_PATH)).forEach((file) => {
  const withoutFormat = file.replace('.svg', '');
  const iconName = toKebabCase(withoutFormat);
  const className = 'i-' + iconName;

  TYPE_FILE_CONTENT.push(`'${iconName}'`);
  CSS_FILE_CONTENT.push(getIconStyle(className, file));
});

fs.writeFile(
  path.join(__dirname, CSS_DIRECTORY_PATH, CSS_FILE_NAME),
  CSS_FILE_CONTENT.join(''),
  (err) => {
    if (err) {
      throw err;
    }
  },
);

const createTypeFile = () => {
  return 'export type IconName = ' + TYPE_FILE_CONTENT.join(' | ');
};

fs.writeFileSync(path.join(__dirname, TS_DIRECTORY_PATH, TS_FILE_NAME), createTypeFile(), (err) => {
  if (err) {
    throw err;
  }
  console.log('✨ Icons generated');
});
