/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['imgs-app-picture-bucket.s3.amazonaws.com'],
    },
};

export default nextConfig;
