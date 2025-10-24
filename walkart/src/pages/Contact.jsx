import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

export default function Contact() {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={'Contact'} text2={'Us'}/>
      </div>
      
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img src={assets.contact_img} alt="" className="w-full md:max-w-[480px]" />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">Dwarka New Delhi, <br /> India</p>
          <p>Tel: (91)123-456-7890 <br /> Email: contact@walkart.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Walcart</p>
          <p className="text-gray-500">Learn more about our Team and Job Openings</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}
