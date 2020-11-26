# ContractInteract
NodeJs application to interact with smart-contract, get balance and transfer tokens

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
