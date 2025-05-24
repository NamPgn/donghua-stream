module.exports = async (phase, { defaultConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    images: {
      domains: [
        "firebasestorage.googleapis.com",
        "res.cloudinary.com",
        "hhanime3d.com",
      ],
    },
 
  };

  return nextConfig;
};
