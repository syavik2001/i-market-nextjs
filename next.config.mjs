/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Исключаем API-роуты из статической генерации
  experimental: {
    // Отключаем автоматическую статическую оптимизацию для API-роутов
    workerThreads: false,
    cpus: 1
  },
  // Настройки для изображений
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
