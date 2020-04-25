const eosjs = require('../eosjs')
const env = require('../.env')
const accts = require('../accounts')
const acct = (name) => accts[env.network][name]
const api = eosjs(env.keys[env.network]).api
const tapos = { blocksBehind: 6, expireSeconds: 10 }

async function doAction(name,data){
  try {
    if (!data) data = {}
    const contract = acct('token')
    const authorization = [{actor:acct('token'),permission: 'active'}]
    const account = contract
    const result = await api.transact({actions: [{ account, name, data, authorization }]},tapos)
    console.log(result.transaction_id)
    return result
  } catch (error) {
    console.error(error.toString())
  }
}

async function transfer(from,to,quantity,memo){
  return doAction('transfer',{from,to,quantity,memo}).then(result => console.log(result))
}

async function retire(quantity,memo){
  return doAction('retire',{quantity,memo}).then(result => console.log(result))
}

const methods = {transfer,retire}
module.exports = methods

if (process.argv[2]) {
  if (Object.keys(methods).find(el => el === process.argv[2])) {
    console.log("Starting:",process.argv[2])
    methods[process.argv[2]](process.argv[3],process.argv[4],process.argv[5],process.argv[6]).catch(console.error)
    .then((result)=>console.log('Finished'))
  }
}