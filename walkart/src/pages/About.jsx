import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

export default function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'About'} text2={'Us'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={assets.about_img} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>At <strong>WALKART</strong>, we’re redefining the future of commerce by merging real-world products with the power of blockchain technology. Built on the <strong>Algorand network</strong>, our platform transforms every purchase into more than just a transaction — it becomes a piece of your digital legacy.</p>
          <p>When you place an order for a physical item, you don’t just receive it at your doorstep — you also mint an NFT that represents your ownership on-chain. <strong>These NFTs are not mere collectibles</strong>; they are functional digital assets that unlock new possibilities.</p>
          <p><strong>Through our burn-and-mint mechanism, specific NFT combinations can be exchanged (burned) to create new, exclusive items — both digitally and physically.</strong> This fuses sustainability, creativity, and authenticity, allowing users to evolve their collections over time and be part of a living, ever-expanding ecosystem.</p>
          <p>Our mission is to bridge the gap between tangible products and digital innovation, empowering creators and collectors alike with <strong>true ownership, transparent provenance, and an engaging, gamified shopping experience — all secured by the speed and sustainability of the Algorand blockchain.</strong></p>
          <b className='text-gray-800'>OUR Mission</b>
          <p>Our mission is to make shopping an adventure.</p>
          <p>Every product you buy mints an NFT that’s more than a receipt — <strong>it’s a key to unlock new items, burn-to-craft combinations, and exclusive experiences.</strong></p>
          <p>We’re building a world where <strong>collecting, creating, and owning become part of one seamless, gamified ecosystem.</strong></p>
        </div>
      </div>

      <div className="text-4xl py-4">
        <Title text1={'Why'} text2={'Choose Us'} />
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Every product we deliver — physical or digital — goes through rigorous quality
            checks to ensure authenticity, durability, and precision. Our physical items are
            sourced and crafted with verified partners, while every NFT is securely minted on
            the <strong>Algorand blockchain</strong>, guaranteeing traceable ownership and
            transparency.
          </p>
          <p className="text-gray-600">
            From production to delivery, we maintain strict quality standards so you can
            trust the integrity of what you buy, collect, and trade. Our commitment to
            excellence extends to every layer of our ecosystem — merging craftsmanship,
            technology, and trust into one seamless experience.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className="text-gray-600">
            At <strong>WALCART</strong>, we believe innovation should simplify life,
            not complicate it. Our platform is designed to make your shopping experience
            effortless — from secure checkout and instant NFT minting to real-time order
            tracking and blockchain-backed verification.
          </p>
          <p className="text-gray-600">
            Every purchase automatically generates a unique NFT on the
            <strong> Algorand blockchain</strong>, linking your physical item to its digital
            proof of ownership. No extra steps, no complex setup — just seamless integration
            between the physical and digital worlds.
          </p>
          <p className="text-gray-600">
            Whether you’re collecting, trading, or crafting new items through our
            burn-and-mint system, everything you need is at your fingertips — fast,
            transparent, and user-friendly.
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            At <strong>WALCART</strong>, we place our customers at the heart of
            everything we do. Whether you’re exploring our products, managing your NFTs, or
            crafting new combinations, our support team is always ready to assist you at
            every step.
          </p>
          <p className="text-gray-600">
            We offer fast, transparent, and reliable communication to ensure your experience
            is smooth from start to finish. Our goal is to deliver not just quality products
            but also peace of mind — knowing that help is always within reach.
          </p>
          <p className="text-gray-600">
            From blockchain inquiries to shipping updates, our dedicated team is here to
            provide clear guidance and timely solutions. Your trust and satisfaction are our
            top priorities, and we’re committed to delivering service that exceeds
            expectations.
          </p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}
