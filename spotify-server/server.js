const express = require('express');
const cors = require('cors');
const spotifyRoutes = require('./routes/spotify');
require('dotenv').config();

const app = express();
app.use(cors());
app.use('/api', spotifyRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
// AQCOn8nutgg7OgdQtBZps48t2Q_z2Wm4RZ0qF6s4zuJtyy6DfYl5kSfPJa6HOds8pzE52k2MftG7JFKo1nzKztm11ajB4Iy3WYXRti0vIeuoT0mU_-nFXddaJ1I4vUdu0ssu97SUCsVpUs7gz0nTPnZIjNP5LE-7dXrigDrB_8o08e9zyuyp77-UN8euddZ1mECSuQZn2AinECbpKVYKG5SDpJXUjiuoxTIMMXXsGt6eOD8Ro-Y9jzaVTzdomFWAL6dC-w