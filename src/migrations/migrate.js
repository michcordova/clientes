const { migrator } = require('../config/bd.js');

(async () => {
  await migrator.up();
  console.log('Migraciones aplicadas');
})();
