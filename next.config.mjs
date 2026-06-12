/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ['13.51.252.239'], // Xatolikda ko'rsatilgan IP-manzilni qo'shdim
}

export default nextConfig