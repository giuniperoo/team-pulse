// @flow
const productionStore = require('./configureStore.production');
const developmentStore = require('./configureStore.development');

if (process.env.NODE_ENV === 'production') {
  module.exports = productionStore;
} else {
  module.exports = developmentStore;
}
