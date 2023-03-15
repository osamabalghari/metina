require('dotenv').config();
const user = require('../model/user');
const account = require('../model/account');

exports.create = async function(args){

  // create a new master account

  if (!args[2]){

    console.log('⛔️ Please specify an email and password, eg. email@domain.com:password12345')

  }

  const data = { 

    email: args[2].split(':')[0],
    password: args[2].split(':')[1]

  }

  try {

    let userData = await user.get({ email: data.email });
    if (userData) throw { message: 'You have already registered an account with this email' };

    // create the account and user
    const accountData = await account.create();
    await account.update({ id: accountData.id, data: { plan: 'master', name: 'Master' }});

    userData = await user.create({ user: { name: 'Master', email: data.email, password: data.password }, account: accountData.id });
    await user.account.add({ id: userData.id, account: accountData.id, permission: 'master' });

    console.log('✅ Master account created');
    process.exit();

  }
  catch (err){

    console.log(err);

  }
}
