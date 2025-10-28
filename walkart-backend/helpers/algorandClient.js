// helpers/algorandClient.js
import algosdk from 'algosdk';

// TestNet configuration
const algodToken = '';
const algodServer = 'https://testnet-api.algonode.cloud'; 
const algodPort = 443;

export const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);