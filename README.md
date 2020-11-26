# ContractInteract
NodeJs application to interact with smart-contract, get balance and transfer tokens

Contract Address: '0xb8f467892A862E6552c9a1B6C7A911A80C48C1B3',

APIs

/api/getBalance

Body:
{
    "userAddress": eth_address_of which balance is to be found
}

/api/transfer

Body:
{
    "recipientAddress": address_of_recipient,
    "tokenAmount": no_of_tokens_to_be_sent
}


for swagger visit
/api/api-docs