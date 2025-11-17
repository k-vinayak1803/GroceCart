import React from 'react'
import { assets } from '../assets/assets';

const ContactCard = ({ icon, label, value, size }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transform transition-all duration-300
  hover:scale-105 flex flex-col items-center text-center">
    {/* <div className="text-4xl mb-2">{icon}</div> */}
    <img src={icon} alt={label} className='w-14 h-14 mb-4 object-contain' />
    <p className="text-gray-700 text-base mb-2">{value}</p>
    <p className="font-semibold text-green-600 text-sm tracking-wide uppercase">{label}</p>
  </div>
);

const ContactDetail = () => {

  return (
    <div className='mt-12'>
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

          <ContactCard icon={assets.location_icon} label="Location" value="123 Main Street, Mumbai, MH 400001" />
          <ContactCard icon={assets.phone_icon} label="Phone" value="+91 97699 62081" />
          <ContactCard icon={assets.gmail_icon} label="Email" value="kumawatvinayak3@gmail.com" />
        </div>
      </section>
    </div>
  )
}

export default ContactDetail