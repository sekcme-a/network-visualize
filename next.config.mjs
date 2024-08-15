/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://깃허브아이디.github.io/레파지토리이름"
      : "",
};

export default nextConfig;
