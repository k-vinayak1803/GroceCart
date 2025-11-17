import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const ContactBanner = () => {
    return (
        <div className="relative">
            <img src={assets.contact_banner} alt="banner" className="w-full h-full hidden md:block object-contain " />
            {/* <img src={assets.main_banner_bg_sm} alt="banner" className="w-full h-full md:hidden object-contain" /> */}
            <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-5 md:pb-0 
        px-4 md:pl-18 lg:pl-18 md:max-w-130 lg:max-w-145 xl:max-w-200 hidden">
                    <h1 className="text-5xl xl:text-7xl font-bold text-gray-900 mb-4">We would love to hear from you</h1>
                    <p className="text-gray-700">If you have any questions or need assistance, feel free to reach out to us!</p>


            </div>

        </div>
    )
}

export default ContactBanner