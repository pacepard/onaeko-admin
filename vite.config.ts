import path from 'node:path';
import { fileURLToPath } from 'node:url';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const rootDir = path.dirname(fileURLToPath(import.meta.url));

const onaekoUiShim = () => {
    const target = path.resolve(rootDir, '../onaeko-ui/shims/catchall.tsx');
    return {
        name: 'onaeko-ui-shim',
        enforce: 'pre' as const,
        resolveId(id: string) {
            if (id === '@onaeko/ui' || id.startsWith('@onaeko/ui/')) {
                return target;
            }
            return null;
        },
    };
};

export default defineConfig({
    plugins: [onaekoUiShim(), react(), tailwindcss()],
    resolve: {
        alias: {
            '@': path.resolve(rootDir, 'src'),
        },
        dedupe: ['react', 'react-dom'],
    },
    server: {
        port: 5403,
        strictPort: true,
        fs: {
            allow: [rootDir, path.resolve(rootDir, '../onaeko-ui')],
        },
    },
    preview: {
        port: 5403,
        strictPort: true,
    },
});
