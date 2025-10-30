
// import algosdk from "algosdk";
// import { algodClient } from "../helpers/algorandClient.js";


// // Debug: Check available transaction functions
// console.log("Available transaction functions:");
// Object.keys(algosdk)
//     .filter(key => key.includes('make') && key.includes('Txn'))
//     .forEach(key => console.log(" -", key));

// export const algoNFT = async (buyerAddress, metadata) => {
//     try {
//         console.log("Buyer Address:", buyerAddress);
//         console.log("Type of buyerAddress:", typeof buyerAddress);
//         console.log("Is buyerAddress valid?", algosdk.isValidAddress(buyerAddress));

//         const creatorMnemonic = "alarm gaze drip sand antique crater firm army enrich scene popular steel remember hollow slush ozone select secret awesome token drama note rare absorb happy";
//         const creatorAccount = algosdk.mnemonicToSecretKey(creatorMnemonic);
    
//     console.log("🧪 Using algosdk v2.4 with corrected parameters");
        
//         // Get suggested params
//         const suggestedParams = await algodClient.getTransactionParams().do();
        
//         // Debug the suggestedParams to see the actual structure
//         console.log("Suggested params structure:", {
//             firstRound: suggestedParams.firstRound,
//             lastRound: suggestedParams.lastRound,
//             firstValid: suggestedParams.firstValid,
//             lastValid: suggestedParams.lastValid,
//             fee: suggestedParams.fee,
//             genesisHash: suggestedParams.genesisHash ? 'present' : 'missing',
//             genesisID: suggestedParams.genesisID ? 'present' : 'missing'
//         });

//         // For v2.4, let's use the FromObject function which is more reliable
//         const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
//             from: creatorAccount.addr,
//             total: 1,
//             decimals: 0,
//             assetName: metadata.name || "MyNFT",
//             unitName: metadata.unitName || "NFT",
//             assetURL: metadata.url || "https://example.com/nft.json",
//             defaultFrozen: false,
//             manager: creatorAccount.addr,
//             reserve: creatorAccount.addr,
//             freeze: creatorAccount.addr,
//             clawback: creatorAccount.addr,
//             suggestedParams: suggestedParams,
//         });

//         console.log("✅ Asset creation transaction created");

//         // Sign and send
//         const signedTxn = txn.signTxn(creatorAccount.sk);
//         const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
//         console.log("NFT creation TxID:", txId);

//         // Wait for confirmation
//         console.log("⏳ Waiting for confirmation...");
//         const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
//         const assetID = confirmedTxn["asset-index"];
//         console.log("✅ Created NFT with Asset ID:", assetID);

//         // Create transfer transaction using FromObject
//         const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
//             from: creatorAccount.addr,
//             to: buyerAddress,
//             amount: 1,
//             assetIndex: assetID,
//             suggestedParams: suggestedParams,
//         });

//         const signedTransfer = transferTxn.signTxn(creatorAccount.sk);
//         const transferTx = await algodClient.sendRawTransaction(signedTransfer).do();
//         console.log("NFT transfer TxID:", transferTx.txId);

//         await algosdk.waitForConfirmation(algodClient, transferTx.txId, 4);
//         console.log("🎉 NFT successfully transferred to buyer!");

//         return assetID;

//     } catch (error) {
//         console.error("❌ Error minting NFT:", error);
        
//         // More detailed error information
//         if (error.response && error.response.body) {
//             console.error("Algod error details:", error.response.body);
//         }
        
//         throw error;
//     }
// };


import algosdk from "algosdk";
import { algodClient } from "../helpers/algorandClient.js";

export const prepareNFTMintAndTransfer = async (buyerAddress, metadata) => {
    try {
        const creatorMnemonic = process.env.ALGO_WALLET_PHRASE;
        const creatorAccount = algosdk.mnemonicToSecretKey(creatorMnemonic);
    
        console.log("🔄 Preparing NFT mint and transfer for:", buyerAddress);
        
        // Get suggested params
        const suggestedParams = await algodClient.getTransactionParams().do();

        // 1. Create NFT transaction
        const createTxn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
            from: creatorAccount.addr,
            total: 1,
            decimals: 0,
            assetName: metadata.name || "MyNFT",
            unitName: metadata.unitName || "NFT",
            assetURL: metadata.url || "https://example.com/nft.json",
            defaultFrozen: false,
            manager: creatorAccount.addr,
            reserve: creatorAccount.addr,
            freeze: creatorAccount.addr,
            clawback: creatorAccount.addr,
            suggestedParams: suggestedParams,
        });

        // 2. Opt-in transaction (buyer needs to opt-in before receiving)
        // We'll create a dummy opt-in transaction that will be replaced after asset creation
        const dummyOptInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: buyerAddress,
            to: buyerAddress,
            amount: 0,
            assetIndex: 1, // Dummy asset ID, will be updated
            suggestedParams: suggestedParams,
        });

        // 3. Transfer transaction
        const dummyTransferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: creatorAccount.addr,
            to: buyerAddress,
            amount: 1,
            assetIndex: 1, // Dummy asset ID, will be updated
            suggestedParams: suggestedParams,
        });

        return {
            createTransaction: createTxn,
            optInTransaction: dummyOptInTxn,
            transferTransaction: dummyTransferTxn,
            creatorAddress: creatorAccount.addr,
            suggestedParams: suggestedParams
        };

    } catch (error) {
        console.error("❌ Error preparing NFT transactions:", error);
        throw error;
    }
};

export const completeNFTMintAndTransfer = async (buyerAddress, metadata, signedCreateTx) => {
    try {
        const creatorMnemonic = process.env.ALGO_WALLET_PHRASE;
        const creatorAccount = algosdk.mnemonicToSecretKey(creatorMnemonic);

        console.log("🎯 Completing NFT mint and transfer...");

        // First, send the asset creation transaction
        const { txId } = await algodClient.sendRawTransaction(signedCreateTx).do();
        console.log("NFT creation TxID:", txId);

        // Wait for confirmation to get the asset ID
        console.log("⏳ Waiting for asset creation confirmation...");
        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
        const assetID = confirmedTxn["asset-index"];
        console.log("✅ Created NFT with Asset ID:", assetID);

        // Get fresh suggested params for the next transactions
        const suggestedParams = await algodClient.getTransactionParams().do();

        // Now create the actual opt-in and transfer transactions with the real asset ID
        const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: buyerAddress,
            to: buyerAddress,
            amount: 0,
            assetIndex: assetID,
            suggestedParams: suggestedParams,
        });

        const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
            from: creatorAccount.addr,
            to: buyerAddress,
            amount: 1,
            assetIndex: assetID,
            suggestedParams: suggestedParams,
        });

        // Group the opt-in and transfer transactions
        const groupedTxs = algosdk.assignGroupID([optInTxn, transferTxn]);
        
        // Sign the transfer transaction (creator signs this part)
        const signedTransferTxn = algosdk.signTransaction(groupedTxs[1], creatorAccount.sk);

        return {
            optInTransaction: groupedTxs[0],
            signedTransferTransaction: signedTransferTxn,
            assetID: assetID
        };

    } catch (error) {
        console.error("❌ Error completing NFT transfer:", error);
        throw error;
    }
};

export const submitAtomicTransfer = async (signedOptInTx, signedTransferTx) => {
    try {
        console.log("🚀 Submitting atomic transfer...");
        
        // Submit both transactions
        const { txId } = await algodClient.sendRawTransaction([
            signedOptInTx,
            signedTransferTx.blob
        ]).do();

        console.log("Atomic transfer TxID:", txId);

        // Wait for confirmation
        const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
        console.log("✅ Atomic transfer completed successfully!");

        return {
            txId: txId,
            assetID: confirmedTxn["asset-index"] || "transfer_completed"
        };

    } catch (error) {
        console.error("❌ Error submitting atomic transfer:", error);
        throw error;
    }
};