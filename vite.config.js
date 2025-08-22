import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Removing a hard‑coded IP host binding which can cause EADDRNOTAVAIL on machines
// that don't own that address. If you need LAN access later, use: host: true
// or specify an IP that actually exists on your current network adapter.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true, // enables listening on 0.0.0.0 (accessible via localhost & LAN)
  },
});
