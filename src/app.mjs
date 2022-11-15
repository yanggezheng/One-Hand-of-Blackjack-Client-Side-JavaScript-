// app.js
import * as card from './public/javascripts/card.mjs'
import express from 'express';
import path from 'path';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);