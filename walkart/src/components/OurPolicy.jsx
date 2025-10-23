import React from 'react'
import { assets } from '../assets/assets'

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} alt="" className="w-12 m-auto mb-5" />
            <p className="font-semibold">No Exchange Policy</p>
            <p className="text-gray-400">We can't offer exchange on our items as we are still growing </p>
        </div>
        <div>
            <img src={assets.quality_icon} alt="" className="w-12 m-auto mb-5" />
            <p className="font-semibold">No return Policy</p>
            <p className="text-gray-400">We can't offer returns on our items as we are still growing </p>
        </div>
        <div>
            <img src={assets.support_img} alt="" className="w-12 m-auto mb-5" />
            <p className="font-semibold">Best Customer Support</p>
            <p className="text-gray-400">We provide 24/7 customer support through our telegram channel and group. </p>
        </div>
    </div>
  )
}

export default OurPolicy