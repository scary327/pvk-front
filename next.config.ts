import type { NextConfig } from "next";

const config: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  devIndicators: {
    position: "bottom-right",
  },
};

export default config;
