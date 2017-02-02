import { app } from 'electron';

const menubar = require('menubar');

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support'); // eslint-disable-line
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development') {
  require('electron-debug')(); // eslint-disable-line global-require
  const path = require('path'); // eslint-disable-line
  const p = path.join(__dirname, '..', 'app', 'node_modules'); // eslint-disable-line
  require('module').globalPaths.push(p); // eslint-disable-line
}

app.on('window-all-closed', () => {
  app.quit();
});

const installExtensions = async () => {
  if (process.env.NODE_ENV === 'development') {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require

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

const mb = menubar({
  dir: __dirname,
  width: 520,
  height: 570,
  index: `file://${__dirname}/app.html`,
  icon: `${__dirname}/../resources/iconTemplate.png`,
  preloadWindow: true,
  y: 30
});

mb.on('ready', async () => {
  await installExtensions();

  if (process.env.NODE_ENV === 'development') {
    mb.window.openDevTools();
  }

  // prevent user from resizing window
  // mb.window.setResizable(false)
});
