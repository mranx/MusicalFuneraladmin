'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  relation: string;
  directorName?: string;
  directorCompany?: string;
  directorEmail?: string;
  deceasedName: string;
  dateOfBirth: string;
  dateOfPassing: string;
  specialRequests?: string;
  servicePlan: string;
  servicePrice: number;
  createdAt: string;
}

export default function Dashboard() {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    // We don't need to check authentication status here anymore
    // since the middleware and layout will handle that
    fetchUserData();
  }, []);
  
  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile');
      
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError('Error loading your data. Please try again later.');
      console.error('Error fetching user data:', err);
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#4A77B5]"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-md">
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  if (!userData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative max-w-md">
          <p>No user data found. Please try logging in again.</p>
        </div>
      </div>
    );
  }
  
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-white">Welcome, {userData.name}</h1>
      
      <Tabs defaultValue="service" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="service">Service Details</TabsTrigger>
          <TabsTrigger value="profile">Your Information</TabsTrigger>
          <TabsTrigger value="deceased">Deceased Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="service" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Service Plan</CardTitle>
              <CardDescription>Details of your selected service package</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-[#4A77B5] text-white p-4 rounded-lg">
                  <h3 className="text-xl font-semibold">Selected Service: {userData.servicePlan}</h3>
                  <p className="text-lg">Price: ${userData.servicePrice}</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3 mt-4">
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Pre Service:</span>
                    <span>Instrumental (20 minutes)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Service Start:</span>
                    <span>Vocal</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Reflection Piece 1:</span>
                    <span>Vocal</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Service End:</span>
                    <span>Vocal</span>
                  </div>
                  <div className="flex justify-between py-2 border-b">
                    <span className="font-medium">Order Date:</span>
                    <span>{formatDate(userData.createdAt)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>Personal details you provided</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Name</h3>
                    <p className="font-medium">{userData.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Email</h3>
                    <p className="font-medium">{userData.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Phone</h3>
                    <p className="font-medium">{userData.phone}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Relation to Deceased</h3>
                    <p className="font-medium">{userData.relation}</p>
                  </div>
                  {userData.specialRequests && (
                    <div>
                      <h3 className="text-sm text-gray-500 dark:text-gray-400">Special Requests</h3>
                      <p className="font-medium">{userData.specialRequests}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="deceased" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Deceased Information</CardTitle>
              <CardDescription>Details of the deceased</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Name</h3>
                    <p className="font-medium">{userData.deceasedName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Date of Birth</h3>
                    <p className="font-medium">{formatDate(userData.dateOfBirth)}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="text-sm text-gray-500 dark:text-gray-400">Date of Passing</h3>
                    <p className="font-medium">{formatDate(userData.dateOfPassing)}</p>
                  </div>
                  {userData.directorName && (
                    <div>
                      <h3 className="text-sm text-gray-500 dark:text-gray-400">Funeral Director</h3>
                      <p className="font-medium">{userData.directorName}</p>
                      {userData.directorCompany && <p className="text-sm">{userData.directorCompany}</p>}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}