// server/middleware/proxy.js
import { createProxyMiddleware } from 'http-proxy-middleware'

const proxy = createProxyMiddleware('/api', {
    target: 'https://json.api-postcode.nl',
    changeOrigin: true,
    pathRewrite: { '^/api/': '' }, // Remove '/api/' from the path
    onProxyReq: (proxyReq, req) => {
        // Add headers if needed
        proxyReq.setHeader('token', '30c451a0-9e13-4298-96bf-a34c13f6df5f')
    },
})

export default defineEventHandler((event) => {
    return new Promise((resolve, reject) => {
        proxy(event.node.req, event.node.res, (err) => {
            if (err) reject(err)
            resolve()
        })
    })
})