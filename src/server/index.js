import fs from 'fs';
import os from 'os';
import path from 'path';

import express from 'express';

import React from 'react';
import { renderToString } from 'react-dom/server';

import { Welcome } from '../client/components/App';

const app = express();
require('dotenv').config();

app.use(express.static('dist'));

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.get('/ssr', (req, res) => {
  const pathToHtml = path.join(__dirname, '../../public/index.html');
  const template = fs.readFileSync(pathToHtml, 'utf8');

  // Inserts a rendered react component to the loaded template (server-side rendering).
  const renderedHelloWorld = renderToString(<Welcome username={os.userInfo().username} />);
  const page = template.replace('<!-- CONTENT -->', renderedHelloWorld);

  res.status(200).send(page);
});

app.listen(process.env.PORT || '8080', () => console.log(`Listening on port ${process.env.PORT}!`));
