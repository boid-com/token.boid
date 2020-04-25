# token.boid
Boid token contract rewrite

## IBC functionality
This contract listens for deposits from a specified IBC contract. The memo from the transaction should include the final destination.

### Example
 If you want to send your BOID token from EOS to TLOS your transaction would look like this.

```
from:eosaccountname
to:bosibc.io  
memo: hub.io@bos >> tokencontractname@tlos issue_to=telosaccountname
```

**issue_to** designates the account on the same chain as the token contract to receive the native token. When the token contract receives a valid deposit of the IBC token it issues an equal amount of the native (internal) token to the **issue_to** account. Each native token is backed 1:1 with an IBC token which was deposited. This functionality enables IBC tokens to use custom token contracts (as is required for many staking/governance contracts).

If the end user needs to utilize IBC, all they need to do is deposit their tokens back into the token contract (no special memo is necessary). When the native token is sent back to the token contract the native token is retired and an equal amount of the IBC token is sent from the token contract to the account that made the deposit. 

Now that the account has the IBC token, they can interact with the relay contract and move the token to any other chain easily.

### Example transactions
**Deposit IBC token to receive native token**
https://kylin.bloks.io/transaction/ba6211a85efa8d425fbd1dd649db06c150f720467ed11b43be345c0fae8b02bc?tab=traces

**Deposit native token to receive IBC token**
https://kylin.bloks.io/transaction/c0b7a2ebb504d82c5b78ad4c6667a328953f3261de8c124ac4c446ed835e90e4