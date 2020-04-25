const eosjs = require('../eosjs')
const env = require('../.env')
const accts = require('../accounts')
const acct = (name) => accts[env.network][name]
const api = eosjs(env.keys[env.network]).api
const tapos = { blocksBehind: 6, expireSeconds: 10 }

async function init(){
  try {
    const contract = acct('token')
    const authorization = [{actor:contract,permission: 'active'}]
    const account = contract
    const result = await api.transact({
      actions: [
        // { account,authorization,name:"create",data:{issuer:contract,maximum_supply:"250000000000.0000 EOS"}},
        // { account,authorization,name:"issue",data:{to:contract,quantity:"250000000000.0000 EOS",memo:"lul"}},
        // { account,authorization,name:"transfer",data:{from:contract,to:"john",quantity:"2500000000.0000 EOS",memo:"lul"}},
        // { account,authorization,name:"transfer",data:{from:contract,to:"boid",quantity:"2500000000.0000 EOS",memo:"lul"}},
        { account,authorization,name:"create",data:{issuer:contract,maximum_supply:"250000000000.0000 BOID"}},
        { account,authorization,name:"issue",data:{to:contract,quantity:"250000000000.0000 BOID",memo:"lul"}},
        // { account,authorization,name:"transfer",data:{from:contract,to:"john",quantity:"2500000000.0000 BOID",memo:"lul"}},
        { account,authorization,name:"transfer",data:{from:contract,to:"boid",quantity:"2500000000.0000 BOID",memo:"lul"}},
        // { account, name: "initstats", data:{wpf_reset:false}, authorization },
      ]
    },tapos)
    console.log(result.transaction_id)
  } catch (error) {
    return Promise.reject(error.toString())
  }
}




const methods = {init}

module.exports = methods

if (process.argv[2]) {
  if (Object.keys(methods).find(el => el === process.argv[2])) {
    console.log("Starting:",process.argv[2])
    methods[process.argv[2]]().catch(console.error)
    .then(()=>console.log('Finished'))
  }
}