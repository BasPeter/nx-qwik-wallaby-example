import { nodeServerAdapter } from '@builder.io/qwik-city/adapters/node-server/vite';
import { extendConfig } from '@builder.io/qwik-city/vite';
import baseConfig from '../../vite.config';

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['apps/qwik/src/entry.express.tsx', '@qwik-city-plan'],
        external: ['compression'],
      },
    },
    plugins: [
      nodeServerAdapter({
        name: 'express',
        ssg: { include: [], sitemapOutFile: null },
      }),
    ],
  };
});
