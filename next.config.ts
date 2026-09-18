import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/aigc-portfolio" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/aigc-portfolio/" : "",
  trailingSlash: true,
  typescript: {
    ignoreBuildErrors: Boolean(process.env.GITHUB_ACTIONS),
  },
};

export default nextConfig;
