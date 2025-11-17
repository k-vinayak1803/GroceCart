
import React from 'react';
import NewsLetter from '../components/NewsLetter';
import ContactForm from '../components/ContactForm';
import ContactDetail from '../components/ContactDetail';
import ContactBanner from '../components/ContactBanner';
import Navbar from '../components/Navbar';

const ContactPage = () => {
  return (
    <div className="bg-white text-gray-800 font-sans">
      {/* <ContactBanner /> */}
      <ContactForm />
      <ContactDetail />
      <NewsLetter />
    </div>
  );
};





export default ContactPage;