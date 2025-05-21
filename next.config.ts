import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "firebasestorage.googleapis.com",
      "res.cloudinary.com",
      "hhanime3d.com",
      'wx1.sinaimg.cn',
      'wx2.sinaimg.cn'
    ],
  },
};

export default nextConfig;
