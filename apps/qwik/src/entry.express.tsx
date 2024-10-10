/*
 * WHAT IS THIS FILE?
 *
 * It's the entry point for the Express HTTP server when building for production.
 *
 * Learn more about Node.js server integrations here:
 * - https://qwik.builder.io/docs/deployments/node/
 *
 */
import {
  createQwikCity,
  type PlatformNode,
} from '@builder.io/qwik-city/middleware/node';
import 'dotenv/config';
import qwikCityPlan from '@qwik-city-plan';
import { manifest } from '@qwik-client-manifest';
import render from './entry.ssr';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import compression from 'compression';

declare global {
  type QwikCityPlatform = PlatformNode;
}

// Directories where the static assets are located
const clientDir = join(fileURLToPath(import.meta.url), '..', '..', 'client');
const buildDir = join(clientDir, 'build');
const assetsDir = join(clientDir, 'assets');

// Allow for dynamic port
const PORT = process.env.PORT ?? 5173;

// Create the Qwik City Node middleware
const { router, notFound } = createQwikCity({
  render,
  qwikCityPlan,
  manifest,
  getOrigin(req) {
    // If deploying under a proxy, you may need to build the origin from the request headers
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Proto
    const protocol = req.headers['x-forwarded-proto'] ?? 'http';
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-Host
    const host = req.headers['x-forwarded-host'] ?? req.headers.host;
    return `${protocol}://${host}`;
  },
});

// Create the express server
// https://expressjs.com/
const app = express();

// Enable gzip compression
app.use(compression());

// Static asset handlers
// https://expressjs.com/en/starter/static-files.html
app.use(`/build`, express.static(buildDir, { immutable: true, maxAge: '1y' }));
app.use(
  `/assets`,
  express.static(assetsDir, { immutable: true, maxAge: '1y' })
);
app.use(express.static(clientDir, { redirect: false }));

// Use Qwik City's page and endpoint request handler
app.use(router);

// Use Qwik City's 404 handler
app.use(notFound);

const buildNumber = process.env.BUILD_NUMBER ?? '-';

// Start the express server
app.listen(PORT, () => {
  /* eslint-disable */
  console.log(`[${buildNumber}]: Server started: http://localhost:${PORT}/`);
});