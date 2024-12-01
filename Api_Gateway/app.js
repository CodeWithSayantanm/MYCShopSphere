const express = require('express');
const httpProxy = require('http-proxy');
const cors = require('cors');
require('dotenv').config();

const app  = express();
const PORT = process.env.Port;
const proxy = httpProxy.createProxyServer();


const whitelist = [
    'http://localhost:3001', // users
    'http://localhost:3002', // inventory
    'http://localhost:3003', // orders
    'http://localhost:3004', // sales
  ];
  
  // CORS configuration     
  const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || whitelist.includes(origin)) {
        callback(null, true); // Allow the request
      } else {
        callback(new Error('Not allowed by CORS')); // Block the request
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed HTTP methods
    credentials: true, // Allow cookies and credentials
  };
  

app.all('/users/*', (req, res) => {
    console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
    proxy.web(req, res, {
        target: "http://localhost:3001",
        changeOrigin: true
    }, (error) => {
        console.error('Proxy error:', error);
        res.status(500).send('Error forwarding request to users');
    });
});


app.all('/inventory/*', (req, res) => {
    console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
    proxy.web(req, res, {
        target: "http://localhost:3002",
        changeOrigin: true
    }, (error) => {
        console.error('Proxy error:', error);
        res.status(500).send('Error forwarding request to inventory');
    });
});


app.all('/orders/*', (req, res) => {
    console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
    proxy.web(req, res, {
        target: "http://localhost:3003",
        changeOrigin: true
    }, (error) => {
        console.error('Proxy error:', error);
        res.status(500).send('Error forwarding request orders');
    });
});


app.all('/sales/*', (req, res) => {
    console.log(`Proxying request: ${req.method} ${req.originalUrl}`);
    proxy.web(req, res, {
        target: "http://localhost:3004",
        changeOrigin: true
    }, (error) => {
        console.error('Proxy error:', error);
        res.status(500).send('Error forwarding request to slaes');
    });
});





app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`);
})