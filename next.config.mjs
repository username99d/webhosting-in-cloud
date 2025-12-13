/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactStrictMode: true,
  output: "standalone",
  images: {
    domains: ["placehold.co"],
  },
};

export default nextConfig;
