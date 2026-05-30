import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  server: {
    allowedHosts: ["ulises-entomophagous-catarrhally.ngrok-free.dev"]
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        servicios: resolve(__dirname, 'servicios.html'),
        padres: resolve(__dirname, 'padres.html'),
        contacto: resolve(__dirname, 'contacto.html'),
        neurodivergentes: resolve(__dirname, 'neurodivergentes.html'),
        club: resolve(__dirname, 'club-sonrisas-magicas.html'),
      }
    }
  }
})
