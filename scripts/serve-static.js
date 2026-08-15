#!/usr/bin/env node
/*
 * A minimal, dependency-free static file server for the E2E suite
 * (see playwright.config.js's webServer). Deliberately not `serve` or
 * `http-server` from npm -- both of those make an outbound call on
 * startup (an update check) that can hang for a long time in network-
 * restricted environments with no allowlisted egress for it, which is
 * exactly the failure mode this replaced. This only touches the local
 * filesystem and a socket, so it starts instantly anywhere Node runs.
 *
 * Usage: node scripts/serve-static.js <dir> <port>
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.argv[2] || 'out');
const port = Number(process.argv[3] || 4174);

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml',
};

function resolveFile(urlPath) {
  const clean = urlPath.split('?')[0].split('#')[0];
  let filePath = path.join(dir, decodeURIComponent(clean));

  // Directory / extensionless route -> that route's own index.html, same
  // as what static hosts (and `next export`) serve for clean URLs.
  const candidates = [
    filePath,
    path.join(filePath, 'index.html'),
    `${filePath}.html`,
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) return candidate;
  }
  return null;
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url || '/');
  if (!filePath) {
    const notFound = path.join(dir, '404.html');
    if (fs.existsSync(notFound)) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      fs.createReadStream(notFound).pipe(res);
      return;
    }
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not found');
    return;
  }
  const ext = path.extname(filePath);
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(port, () => {
  console.log(`Serving ${dir} at http://localhost:${port}`);
});
