import mongoose from 'mongoose';

const mintedNFTSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },

  // Core workflow fields
  status: {
    type: String,
    enum: ['pending', 'minted', 'claimed'],
    default: 'pending'
  },
  
  // Algorand essentials only
  assetId: { type: Number },
  txHash: { type: String },
  
  // Basic product snapshot
  itemName: { type: String, required: true },
  size: { type: String, required: true },
  purchaseDate: { type: Date, default: Date.now },

  // Simple claim tracking
  claimToken: { type: String },
  claimedAt: { type: Date },

  createdAt: { type: Date, default: Date.now }
});

// Only essential indexes
mintedNFTSchema.index({ userId: 1, status: 1 });
mintedNFTSchema.index({ claimToken: 1 });

// Simple virtual for claim link
mintedNFTSchema.virtual('claimLink').get(function() {
  return this.claimToken 
    ? `https://yourapp.com/claim/${this.claimToken}`
    : null;
});

const mintedNFT = mongoose.models.mintedNFT || mongoose.model('mintedNFT', mintedNFTSchema);
export default mintedNFT;