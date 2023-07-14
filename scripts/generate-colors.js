const fs = require('fs');
const path = require('path');
const tailwind = require('../tailwind.config.js');

const COLORS_FILE_NAME = 'colors.ts';
const COLORS_DIRECTORY_PATH = '../src/components/ui/icon/';

const TAILWIND_COLORS = {
  ...tailwind.theme?.colors,
  ...tailwind.theme?.extend?.colors,
};

const COLORS = Object.entries(TAILWIND_COLORS).reduce((acc, [colorName, colorOrVariants]) => {
  if (typeof colorOrVariants === 'string') {
    return [...acc, `'${colorName}'`];
  }
  if (typeof colorOrVariants === 'object' && colorOrVariants) {
    return [
      ...acc,
      ...Object.keys(colorOrVariants).map((value) =>
        value === 'DEFAULT' ? `'${colorName}'` : `'${colorName}-${value}'`,
      ),
    ];
  }
  return acc;
}, []);

const createTypeFile = () => {
  return 'export type ColorName = ' + COLORS.join(' | ');
};

fs.writeFile(
  path.join(__dirname, COLORS_DIRECTORY_PATH, COLORS_FILE_NAME),
  createTypeFile(),
  function (err) {
    if (err) throw err;
    console.log('Colors type file was created successfully.');
  },
);
