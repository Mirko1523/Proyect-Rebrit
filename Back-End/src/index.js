const express = require('express');
const app = express();
const userRoutes = require('./Routes/userRoutes');

app.use(express.json()); 

app.use('/api', userRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
