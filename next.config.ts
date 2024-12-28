import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    domains:[
      'images.pexels.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com'
    ]
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  
};

export default nextConfig;
