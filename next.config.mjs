/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "manyavar.scene7.com",
      },
      {
        protocol: "https",
        hostname: "theblockprintco.com",
      },
      {
        protocol: "https",
        hostname: "www.yourlibaas.com",
      },
      {
        protocol: "https",
        hostname: "poshakchikanstudio.com",
      },
      {
        protocol: "https",
        hostname: "shoplabelaishwaryrika.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.shopaccino.com",
      },
    ],
  },
};

export default nextConfig;