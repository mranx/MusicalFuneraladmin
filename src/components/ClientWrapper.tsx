'use client';

import React, { Suspense } from 'react';

// Simple loading component
const Loading = () => <div className="p-4">Loading...</div>;

// Wrapper component to handle client-side components with suspense boundary
export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}

export default ClientWrapper;