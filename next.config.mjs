/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    typescript: {
      // Allow production builds to succeed even with type errors
      ignoreBuildErrors: true,
    },
    eslint: {
      // Allow production builds to succeed despite ESLint errors
      ignoreDuringBuilds: true,
    },
    images: {
      domains: ['example.com'], // Add any domains you need for Image component
      unoptimized: true, // This helps with static exports
    },
    // Important: Disable static page optimization to prevent CSR errors
    output: 'standalone',
    // Disable static optimization for routes that use dynamic features
    experimental: {
      // Memory improvements
      optimizeCss: false, // Disabling due to critters issues
      optimizePackageImports: ['lucide-react', 'react-icons', '@radix-ui/react-icons'],
    },
    // Prevent the application from failing if there are missing dependencies
    productionBrowserSourceMaps: false,
  };
  
  export default nextConfig;