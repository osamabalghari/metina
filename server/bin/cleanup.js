const fs = require('fs').promises;
const fileHelper = require('../helper/file');

async function cleanup(){

  try {

    const files = [
      '../client/src/routes/setup.js',
      'controller/setupController.js',
      'model/setup.js',
      'api/setup.js'
    ];

    for (file of files){
      try {

        await fs.access(file);
        fs.unlink(file);

      }
      catch (err){}
    }


    // remove setup views folder (client)
    await fs.rm('../client/src/views/setup', { recursive: true });
      
    // remove setup routes import (client)
    await fileHelper.line.remove({ path: '../client/src/app/app.js', str: 'routes/setup' });

    // remove setup api route import
    await fileHelper.line.remove({ path: 'api/index.js', str: '/setup' })

    console.log('✅ Cleaned setup files');
    process.exit();

  }
  catch (err){

    console.error(err);
    process.exit(0);

  } 
}

cleanup();