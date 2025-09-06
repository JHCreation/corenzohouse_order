import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path-browserify'
import strip from "@rollup/plugin-strip";
import tailwindcss from '@tailwindcss/vite'

const isProduction = process.env.NODE_ENV === 'production';

// https://vite.dev/config/
export default defineConfig({
  plugins: [svelte(),
    tailwindcss(),
    isProduction && strip({
      include: "**/*.(svelte|js|ts)",
      functions: ["console.*", "assert.*"]
    }),
  ],
  resolve: {
    alias: {
      '~': path.resolve('./src'),
      $lib: path.resolve("./src/lib"),
    },
  },
  server: {
        proxy: {
            // '/api'로 시작하는 요청을 백엔드 서버로 프록시
            '/corenzo': {
                target: 'http://127.0.0.1:8000',
                changeOrigin: true, // 백엔드 서버의 가상 호스트를 사용하도록 설정
                // '/api' 접두사를 실제 요청에서는 제거하려면 아래와 같이 설정
                // rewrite: (path) => path.replace(/^\/api/, ''), 
            },
        },
    },
})
