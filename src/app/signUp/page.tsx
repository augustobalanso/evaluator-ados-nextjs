'use client'

import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import RegistrationUserData from '@/types/RegistrationUser'
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import Image from 'next/image'

const SignUp = () => {
  const [passwordShown, setPasswordShown] = useState(false)
  const [profilePicture, setProfilePicture] = useState({
    avatar: null as File | null,
    previewURL: null as string | null,
  });
  const [formData, setFormData] = useState<RegistrationUserData>({
    fullName: '',
    email: '',
    password: '',
    address: '',
    phone: ''
  });
  const router = useRouter();

  const passwordToggle = (e: any) => {
    e.preventDefault()
    setPasswordShown(!passwordShown)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null; // Get the first selected file or null if nothing is selected
    setProfilePicture((prevFormData) => ({
      ...prevFormData,
      avatar: file,
      previewURL: file ? URL.createObjectURL(file) : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      const formDataForUpload = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataForUpload.append(key, value);
      }

      if (profilePicture.avatar) {
        formDataForUpload.append('avatar', profilePicture.avatar);
      }

      const response = await axios.post(`${process.env.NEXT_PUBLIC_URL}/api/user/newUser`, formDataForUpload, 
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if(response.data.ok){
        router.push('/signIn')
      } // The response from the backend API
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
        <div className="w-full p-6 m-auto bg-current dark:bg-slate-900 rounded-md shadow-md lg:max-w-xl">
          <h1 className="text-3xl font-semibold text-center text-purple-700">
            Registro
          </h1>
          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-2">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-gray-800 dark:text-white dark:opacity-80"
              >
                Nombre completo
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                placeholder="Ingrese su nombre completo"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                required
                placeholder="Ingrese su correo electrónico"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="relative mb-2">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-800 dark:text-white dark:opacity-80"
              >
                Contraseña
              </label>
              <div className="flex rounded-md border overflow-hidden">
                <input
                  type={passwordShown ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  placeholder="Ingrese su contraseña"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="flex-1 px-4 py-2 text-purple-700 bg-white focus:outline-none focus:ring focus:ring-opacity-40"
                />

                <button
                  onClick={passwordToggle}
                  className="px-3 py-2 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-5 h-5"
                  >
                    <path d="M12 4a8 8 0 100 16 8 8 0 000-16zM12 14a2 2 0 11.001-3.999A2 2 0 0112 14z" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="mb-2">
              <label
                htmlFor="address"
                className="block text-sm font-semibold text-gray-800 dark:text-white dark:opacity-80"
              >
                Dirección
              </label>
              <input
                type="text"
                id="address"
                name="address"
                required
                placeholder="Ingrese su dirección"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
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
                placeholder="Ingrese su número de teléfono"
              />
            </div>

            <label
              htmlFor="profilePicture"
              className="block text-sm font-semibold text-gray-800 dark:text-white dark:opacity-80"
            >
              Foto de perfil
            </label>
            <div style={{ width: '100%', height: '200px', border: '1px solid #ccc', marginTop: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

              {profilePicture.previewURL ? (
                <div className="flex justify-center items-center h-150px w-auto">
                  <Image
                    src={profilePicture.previewURL}
                    alt="Profile Preview"
                    className="rounded-md"
                    style={{ maxWidth: '150px', maxHeight: '150px' }}
                    width={150}
                    height={150}
                  />
                </div>
              ) : (
                <div className="flex justify-center items-center h-150px w-150px bg-gray-200 rounded-md">
                  <p className="text-black">No Image Preview</p>
                </div>
              )}
            </div>
            <div className="flex mt-4 justify-center">
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                required
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="profilePicture" className="block px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40 cursor-pointer">
                Subir imagen
              </label>
            </div>
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link href="/signIn" className="text-xs text-purple-600 hover:underline">
        Ya tenés una cuenta? Iniciá Sesión aquí
      </Link>
    </section>
  )
}

export default SignUp
