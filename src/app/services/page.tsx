'use client';

import { pricingPlans } from '@/constants';
import { Play, Plus, Minus } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import DemoVideo from '@/components/video/DemoVideo';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PaymentFormAndUserRegistrationForm from '@/_mycomponents/forms/PaymentFormAndUserRegistrationForm';
import CustomVideoPlayer from '@/_mycomponents/video/CustomVideoPlayer';
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Suspense } from 'react';

interface InputFieldProps {
  label: string;
  type: string;
  id: string;
  name: string;
  required: boolean;
  placeholder?: string;
}
const videoList = [
  {
    id: "1",
    title: "Introduction Video",
    src: "/assets/videos/test.mp4",
    thumbnail: "/assets/images/thumbnail.jpg"
  },
  {
    id: "2",
    title: "Product Demo",
    src: "/assets/videos/Sample Video.mp4",
    thumbnail: "/assets/images/thumbnail.jpg"
  }
];
const InputField: React.FC<InputFieldProps> = ({ label, type, id, name, required, placeholder }) => (
  <div className={`flex flex-col mb-4`}>
    <label className="block font-bold text-gray-700 dark:text-gray-300" htmlFor={id}>{label}</label>
    <input className="block w-full p-2 border border-gray-300 rounded-[8px] bg-gray-100 dark:bg-gray-700" type={type} id={id} name={name} required={required} placeholder={placeholder || ""} />
  </div>
);

// Loading fallback component
const LoadingFallback = () => (
  <div className="flex min-h-screen flex-col items-center justify-center">
    <div className="text-xl">Loading services...</div>
  </div>
);

// Client component that uses useSearchParams
const ServicesPageContent = () => {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get('plan');
  const selectedPrice = searchParams.get('price');
  
  const [tab, setTab] = useState(selectedPlan ? 1 : 0);
  const [modal, setModal] = useState(false);
  const [servicePlan, setServicePlan] = useState<string>(selectedPlan || '');
  const [servicePrice, setServicePrice] = useState<string>(selectedPrice || '0');
  const [userFormData, setUserFormData] = useState({
    directorName: '',
    directorCompany: '',
    directorEmail: '',
    name: '',
    email: '',
    phone: '',
    relation: '',
    deceasedName: '',
    dateOfBirth: '',
    dateOfPassing: '',
    specialRequests: ''
  });
  
  useEffect(() => {
    // Update the state if URL parameters change
    if (selectedPlan) {
      setServicePlan(selectedPlan);
      setServicePrice(selectedPrice ? String(selectedPrice) : '0');
      setTab(1);
    }
  }, [selectedPlan, selectedPrice]);

  // Define type for form data
  interface FormData {
    directorName: string;
    directorCompany: string;
    directorEmail: string;
    name: string;
    email: string;
    phone: string;
    relation: string;
    deceasedName: string;
    dateOfBirth: string;
    dateOfPassing: string;
    specialRequests: string;
  }
  
  // Function to receive form data from PaymentFormAndUserRegistrationForm
  const handleFormDataUpdate = (formData: FormData) => {
    setUserFormData(formData);
  };

  const handleSelectPlan = (plan: string, price: string | number) => {
    setServicePlan(plan);
    setServicePrice(String(price));
    setTab(1);
  };

  const handlePrevious = (): void => {
    if (tab === 1) {
      setTab(0);
    } else if (tab === 2) {
      setTab(1);
    }
  };

  const handlePayment = (): void => {
    setTab(2);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center w-full dark:bg-gray-900">
        {/* Service Selection Section */}
        {tab === 0 && (
          <section className="w-full py-12 md:py-24 bg-[#4A77B5] dark:bg-[#3A67A5]">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">Services pricing plans</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pricingPlans.map((plan) => (
                  <Card key={plan.title} className="bg-white dark:bg-gray-700 p-8">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                          {plan.title}
                        </h3>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          starting from
                        </div>
                        <div className="mt-1 flex items-baseline">
                          <span className="text-[#4A77B5] dark:text-[#6B9BE3] text-3xl font-medium">$</span>
                          <span className="text-[#4A77B5] dark:text-[#6B9BE3] text-4xl font-medium">{plan.price}</span>
                          <span className="text-[#4A77B5] dark:text-[#6B9BE3] text-lg">.00</span>
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-[#4A77B5] dark:bg-[#6B9BE3] text-white" 
                        size="lg"
                        onClick={() => handleSelectPlan(plan.title, plan.price)}
                      >
                        SELECT PLAN
                      </Button>

                      <div className="space-y-4">
                        <h4 className="font-medium text-gray-900 dark:text-white">Whats included?</h4>
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center text-gray-600 dark:text-gray-300">
                            <svg className="w-5 h-5 mr-3 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            {feature}
                          </div>
                        ))}
                      </div>
                      
                      {userFormData.deceasedName && (
                        <div>
                          <h2 className="text-3xl font-bold mb-5 mt-5 text-gray-900 dark:text-white">Deceased Information:</h2>
                          <ul>
                            {userFormData.deceasedName && (
                              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ textAlign: 'left' }}>Name:</span> <span style={{ textAlign: 'right' }}>{userFormData.deceasedName}</span>
                              </li>
                            )}
                            {userFormData.dateOfBirth && (
                              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ textAlign: 'left' }}>Date of Birth:</span> <span style={{ textAlign: 'right' }}>{new Date(userFormData.dateOfBirth).toLocaleDateString()}</span>
                              </li>
                            )}
                            {userFormData.dateOfPassing && (
                              <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span style={{ textAlign: 'left' }}>Date of Passing:</span> <span style={{ textAlign: 'right' }}>{new Date(userFormData.dateOfPassing).toLocaleDateString()}</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                      
                      {userFormData.specialRequests && (
                        <div>
                          <h2 className="text-3xl font-bold mb-5 mt-5 text-gray-900 dark:text-white">Additional Information:</h2>
                          <p>{userFormData.specialRequests}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Form Section */}
        {tab === 1 && (
          <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
              <div className="flex flex-col mb-6">
                <div className="flex space-x-2 mb-4">
                  <img src="/assets/images/icons/back-arrow.svg" alt="Back" className="cursor-pointer" onClick={handlePrevious} />
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Payment & User Registration</h2>
                </div>
                {servicePlan && (
                  <div className="bg-[#4A77B5] text-white p-4 rounded-lg mb-6">
                    <h3 className="text-xl font-semibold">Selected Service: {servicePlan}</h3>
                    <p className="text-lg">Price: ${servicePrice}.00</p>
                  </div>
                )}
                <PaymentFormAndUserRegistrationForm 
                  setTab={setTab} 
                  onFormDataUpdate={handleFormDataUpdate} 
                  servicePlan={servicePlan} 
                  servicePrice={servicePrice} 
                />
                <div className="video-section mt-8">
                  <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Caecilia LT Std', fontSize: '24px', fontWeight: 700, lineHeight: '32px', textAlign: 'center', textDecoration: 'underline', textDecorationSkipInk: 'none' }}>Watch tutorial for this step</h3>
                  <div className="relative aspect-video bg-gray-900 dark:bg-black rounded-lg overflow-hidden w-1/2 m-auto">
                    <CustomVideoPlayer 
                      videoList={videoList}
                      initialVideo={videoList[0]}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {tab === 2 && (
          <section className="w-full py-12 md:py-24 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
              <div className='grid sm:grid-cols-2 gap-4'>
                <section className="w-full px-4 bg-gray-50 dark:bg-gray-900 md:px-6 order-2 sm:order-1">
                  <div className="flex space-x-2 mb-4">
                    <img src="/assets/images/icons/back-arrow.svg" alt="Back" className="cursor-pointer" onClick={handlePrevious} />
                    <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white">Make Payment</h2>
                  </div>
                  <form className="bg-white dark:bg-gray-900 p-6 rounded-lg ">
                    <h2 className="text-3xl font-bold mb-5 mt-5 text-gray-900 dark:text-white">Complete Checkout:</h2>
                    <div className='flex mt-7 mb-7'>
                      <img src="/assets/images/master.png" alt="Master Card" className="cursor-pointer mr-2" />
                      <img src="/assets/images/american.png" alt="American Express" className="cursor-pointer mr-2" />
                      <img src="/assets/images/visa.png" alt="Visa" className="cursor-pointer" />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 w-full">
                      <InputField label="Card Number" type="text" id="card-number" name="card-number" required />
                      <InputField label="MM/YY" type="text" id="expiry" name="expiry" required placeholder="Type here..." />

                      <InputField label="CSV" type="text" id="csv" name="csv" required />
                      <InputField label="Zip" type="text" id="zip" name="zip" required placeholder="Type here..." />
                    </div>
                    <div className="form-buttons flex justify-between mt-4">
                      <button type="button" onClick={handlePrevious} className="previous-button bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600">&nbsp;Previous&nbsp;</button>
                      <button type="button" onClick={() => setModal(true)} className="payment-button bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600">&nbsp;Payment&nbsp;</button>
                    </div>
                  </form>
                </section>
                <section className="w-full ppx-4 md:px-6 order-1 sm:order-2">
                  <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                    <div className="bg-white dark:bg-gray-900 p-6 rounded-lg ">
                      <h2 className="text-3xl font-bold mb-5 mt-5 text-gray-900 dark:text-white">Service Details:</h2>
                      <div className='mb-6'>
                        <ul>
                          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textAlign: 'left' }}>Service Plan:</span> <span style={{ textAlign: 'right' }}>{servicePlan}</span>
                          </li>
                          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textAlign: 'left' }}>Pre Service:</span> <span style={{ textAlign: 'right' }}>Instrumental (20 minutes)</span>
                          </li>
                          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textAlign: 'left' }}>Service Start:</span> <span style={{ textAlign: 'right' }}>Vocal</span>
                          </li>
                          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textAlign: 'left' }}>Reflection Piece 1:</span> <span style={{ textAlign: 'right' }}>Vocal</span>
                          </li>
                          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textAlign: 'left' }}>Pre Service:</span> <span style={{ textAlign: 'right' }}>Vocal 1</span>
                          </li>
                          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textAlign: 'left' }}>Service End:</span> <span style={{ textAlign: 'right' }}>Vocal</span>
                          </li>
                          <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ textAlign: 'left' }}>Price:</span> <span style={{ textAlign: 'right' }}>${servicePrice}.00</span>
                          </li>
                        </ul>
                      </div>
                      <h2 className="text-3xl font-bold mb-5 mt-5 text-gray-900 dark:text-white">Your Information:</h2>
                      <div>
                        <ul>
                          {userFormData.name && (
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ textAlign: 'left' }}>Name:</span> <span style={{ textAlign: 'right' }}>{userFormData.name}</span>
                            </li>
                          )}
                          {userFormData.email && (
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ textAlign: 'left' }}>Email:</span> <span style={{ textAlign: 'right' }}>{userFormData.email}</span>
                            </li>
                          )}
                          {userFormData.phone && (
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ textAlign: 'left' }}>Phone:</span> <span style={{ textAlign: 'right' }}>{userFormData.phone}</span>
                            </li>
                          )}
                          {userFormData.relation && (
                            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ textAlign: 'left' }}>Relation to Deceased:</span> <span style={{ textAlign: 'right' }}>{userFormData.relation}</span>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>

            <div className={`${modal === true ? 'block' : 'hidden'}`}>
              <div className='h-screen w-screen bg-black opacity-50 fixed top-0 right-0 left-0 z-10'></div>
              <div className="overflow-y-auto overflow-x-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="relative p-4 w-full max-w-2xl min-w-[450px] max-h-full">
                  <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Payment Successful
                      </h3>
                      <Link
                        href={"music/choose-preferred-service"}
                        className="text-blue-500 hover:underline hover:text-blue-600"
                      >
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                      </Link>
                    </div>
                    <div className="p-4 md:p-5 space-y-4">
                      <div className='flex items-center justify-center'>
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect width="44" height="44" rx="22" fill="#039E1C" />
                          <path d="M11.6638 22.6638L18.1121 29.1121L32.3362 14.8879" stroke="white" strokeWidth="3.7931" strokeLinecap="round" />
                        </svg>
                      </div>
                      <h3 className='text-3xl font-bold text-center'>Checkout completed <br /> successfully!</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
};

// Main component that wraps the client component with Suspense
export default function ServicesPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ServicesPageContent />
    </Suspense>
  );
}