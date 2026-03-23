/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/matzg.dev' : '';

const nextConfig = {
  output: 'export',
  reactCompiler: true,

  basePath: basePath,

  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;