import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        environment: 'jsdom',
        globals: true,
        setupFiles: "./vitest.setup.ts",
        include: ["src/test/**/*.{test,spec}.{js,jsx,ts,tsx}"],
        coverage: {
            include: ['src/core/**', 'src/app/actions/**'],
            exclude: ['src/test/**', 'src/core/lib/db.ts',
                '**/*.d.ts', "src/core/entities/**",
                "src/core/validations/**"],
            provider: "v8",
            reporter: ['text', 'json', 'html'],
            thresholds: {
                lines: 80,
                functions: 80,
                branches: 70,
                statements: 80
            }
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
            "@test": path.resolve(__dirname, "src/test"),
        }
    }
})