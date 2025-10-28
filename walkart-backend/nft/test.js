// test.js
import { algoNFT } from "./algoNFT.js";
import algosdk from "algosdk";

async function test() {
  try {
    // Make sure this is a valid Algorand address
    const buyerAddress = "YNKBWMUH5X6TBCYBSZY2SDXWYTIBZLVXNU2BE2WMOYWOSC23W5LNYTQTP4";
    
    console.log("Testing with buyer:", buyerAddress);
    console.log("Is valid address?", algosdk.isValidAddress(buyerAddress));
    
    const metadata = {
      name: "Test NFT",
      unitName: "TEST",
      url: "https://your-metadata-url.com/nft.json"
    };
    
    const assetId = await algoNFT(buyerAddress, metadata);
    console.log("✅ Success! NFT created with Asset ID:", assetId);
  } catch (error) {
    console.error("❌ Test failed:", error);
  }
}

test();