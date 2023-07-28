'use client'

import Link from 'next/link'
import Header from '../components/header/Header'
import { useState } from 'react'
import FormData from '@/types/RegistrationUser'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    address: '',
    email: '',
    phone: '',
    avatar: null,
    previewURL: null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the first selected file or null if nothing is selected
    setFormData((prevFormData) => ({
      ...prevFormData,
      profilePicture: file,
      previewURL: file ? URL.createObjectURL(file) : null,
    }));
  };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // Handle form submission here
    };

  return (   
    <section>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-current dark:bg-slate-900 rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Registration
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-800 dark:text-white dark:opacity-80"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-800 dark:text-white dark:opacity-80"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-800 dark:text-white dark:opacity-80"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="phone"
                className="block text-sm mb-2 font-semibold text-gray-800 dark:text-white dark:opacity-80"
              >
                Teléfono (con cod. de área y sin 15)
              </label>
              <PhoneInput
                defaultCountry="ar"
                value={formData.phone}
                forceDialCode={true}
                style={{ '--react-international-phone-height': '40px' } as React.CSSProperties}
                onChange={(phone) => setFormData((prevData) => ({ ...prevData, phone }))}
                inputClassName="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>
            <div style={{ width: '200px', height: '200px', border: '1px solid #ccc', marginTop: '10px' }}>
              {formData.previewURL ? (
                <div className="flex justify-center">
                  <img
                    src={formData.previewURL}
                    alt="Profile Preview"
                    className="mt-2 rounded-md"
                    style={{ maxWidth: '100%', maxHeight: '150px' }}
                  />
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: '#f5f5f5' }}>
                  <span>No Image Preview</span>
                </div>
              )}
            </div>
            <label
              htmlFor="profilePicture"
              className="block text-sm font-semibold text-gray-800 dark:text-white dark:opacity-80"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
            <button>
              Upload Image
            </button>
          </form>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
            >
              Register
            </button>
          </div>
        </div>
      </div>
      <Link href="/signIn" className="text-xs text-purple-600 hover:underline">
        Ya tenés una cuenta? Iniciá Sesión aquí
      </Link>
    </section>  
  )
}

export default SignUp
