// @flow
/* eslint global-require: 0 */
import { app } from 'electron';

const menubar = require('menubar');

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')();
  const path = require('path');
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p); // eslint-disable-line
}

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer');

    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];

    const forceDownload = !!process.env.UPGRADE_EXTENSIONS;

    // TODO: Use async interation statement.
    //       Waiting on https://github.com/tc39/proposal-async-iteration
    //       Promises will fail silently, which isn't what we want in development
    return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log);
  }
};

app.on('window-all-closed', () => {
  app.quit();
});

const mb = menubar({
  dir: __dirname,
  width: 420,
  height: 570,
  index: `file://${__dirname}/app.html`,
  icon: `${__dirname}/../resources/iconTemplate.png`,
  preloadWindow: true,
  transparent: true
});

mb.on('ready', async () => {
  await installExtensions();

  // if (process.env.NODE_ENV === 'development') {
  mb.window.openDevTools();
  // }

  if (process.env.NODE_ENV === 'production') {
    // prevent user from resizing window
    mb.window.setResizable(false);
  }
});
