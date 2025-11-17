import React from 'react'

const InputField = ({ placeholder, type = 'text' }) => (
  <input
    type={type}
    placeholder={placeholder}
    className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    required
  />
);

const TextAreaField = ({ placeholder }) => (
  <textarea
    placeholder={placeholder}
    rows="5"
    className="w-full text-xl border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
    required
  />
);

const ContactForm = () => {
  return (
    <div className='mt-12'>
          <section className="py-8 px-8 w-fit bg-gray-50 mx-auto rounded-xl">
        <div className="max-w-md sm:max-w-xl">
          <h2 className="text-2xl sm:text-5xl font-bold text-center mb-6">Tell us how we can help you…</h2>
          <form className="space-y-4">
            <InputField placeholder="Your Name" />
            <InputField placeholder="Your Email" type="email" />
            <InputField placeholder="Subject" />
            <TextAreaField placeholder="Message" />
            <button type="submit" className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default ContactForm

