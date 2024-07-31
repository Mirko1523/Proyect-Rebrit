// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const userRoutes = require('./Routes/userRoutes');
// const authRoutes = require('./Routes/authRoutes')
// const morgan = require('morgan');

// app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
// app.use(bodyParser.json({ limit: '50mb' }));
// app.use(cookieParser());
// app.use(morgan('dev'));

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*'); 
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE,');
  
 
//   if (req.method === 'OPTIONS') {
//     return res.status(200).end();
//   }

//   next();
// });

// app.use(express.json());

// app.use('/api', userRoutes);
// app.use('/api', authRoutes);


// const PORT = 3001;
// app.listen(PORT, () => {
//     console.log(`Server listening on port ${PORT}`);
// });

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./Routes/userRoutes');
const authRoutes = require('./Routes/authRoutes');
const morgan = require('morgan');
require('dotenv').config(); 
const app = express();

app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));

const allowedOrigins = [ 'https://weath2b.netlify.app/','https://localhost:3001'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', '*'); 
  }

  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization'); 
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  next();
});
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 3001; 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
