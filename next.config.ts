import type {NextConfig} from "next";
const nextConfig:NextConfig={
  output:"export",
  basePath:"/FitLog-2026",
  assetPrefix:"/FitLog-2026/",
  trailingSlash:true,
  images:{
    unoptimized:true,
  },
};
export default nextConfig;
