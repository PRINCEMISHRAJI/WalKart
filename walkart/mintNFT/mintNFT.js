import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect();

// 1. Start the NFT purchase process
export async function startNFTPurchase(productMetadata) {
    try {
        const accounts = await peraWallet.connect();
        const userAddress = accounts[0];
        
        // Step 1: Get the transactions from backend
        const response = await fetch('/api/nft/prepare-mint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyerAddress: userAddress,
                metadata: productMetadata
            })
        });
        
        const { createTransaction, optInTransaction, transferTransaction, creatorAddress } = await response.json();
        
        // Convert transactions from base64 or object to Algorand transactions
        const createTx = algosdk.decodeUnsignedTransaction(Buffer.from(createTransaction, 'base64'));
        
        // Step 2: Sign the creation transaction with Pera Wallet
        const signedCreateTx = await peraWallet.signTransaction([[createTx]]);
        
        // Step 3: Send signed creation transaction to backend
        const completeResponse = await fetch('/api/nft/complete-mint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyerAddress: userAddress,
                metadata: productMetadata,
                signedCreateTx: Buffer.from(signedCreateTx[0]).toString('base64')
            })
        });
        
        const { optInTransaction: finalOptInTx, signedTransferTransaction, assetID } = await completeResponse.json();
        
        // Step 4: Sign the opt-in transaction and submit atomic transfer
        const optInTx = algosdk.decodeUnsignedTransaction(Buffer.from(finalOptInTx, 'base64'));
        const signedOptInTx = await peraWallet.signTransaction([[optInTx]]);
        
        // Step 5: Submit the atomic transfer
        const submitResponse = await fetch('/api/nft/submit-transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                signedOptInTx: Buffer.from(signedOptInTx[0]).toString('base64'),
                signedTransferTx: signedTransferTransaction
            })
        });
        
        const result = await submitResponse.json();
        
        console.log("🎉 NFT purchased successfully! Asset ID:", assetID);
        return result;
        
    } catch (error) {
        console.error("❌ NFT purchase failed:", error);
        throw error;
    }
}

// Simplified version for better user experience
export async function purchaseNFTSimplified(productId, productName) {
    try {
        const accounts = await peraWallet.connect();
        const userAddress = accounts[0];
        
        console.log("Starting NFT purchase for:", userAddress);
        
        // Single API call that handles everything
        const response = await fetch('/api/nft/purchase', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                buyerAddress: userAddress,
                productId: productId,
                productName: productName,
                userAddress: userAddress
            })
        });
        
        const { transactions, assetId } = await response.json();
        
        // Sign all transactions with Pera Wallet
        const decodedTxs = transactions.map(tx => 
            algosdk.decodeUnsignedTransaction(Buffer.from(tx, 'base64'))
        );
        
        const signedTxs = await peraWallet.signTransaction([decodedTxs]);
        
        // Submit signed transactions
        const submitResponse = await fetch('/api/nft/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                signedTransactions: signedTxs.map(tx => 
                    Buffer.from(tx).toString('base64')
                )
            })
        });
        
        const result = await submitResponse.json();
        
        console.log("✅ NFT purchase completed! Asset ID:", assetId);
        return result;
        
    } catch (error) {
        console.error("❌ Purchase failed:", error);
        throw error;
    }
}