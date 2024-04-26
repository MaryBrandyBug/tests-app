/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://interns-test-fe.snp.agency/api/v1/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
