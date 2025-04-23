/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['placeholder.com'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '**',
        },
      ],
    },
    // Completely disable TypeScript type checking during builds
    typescript: {
      ignoreBuildErrors: true,
    },
    // Disable ESLint during builds
    eslint: {
      ignoreDuringBuilds: true,
    },
    // Disable strict mode for now to avoid potential issues
    reactStrictMode: false,
  };
  
  export default nextConfig;
  