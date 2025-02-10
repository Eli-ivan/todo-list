const app = require('./server-config.js');
const userRoutes = require('./routes/users.js');
const roleRoutes = require('./routes/roles.js');

app.use('/users', userRoutes);
app.use('/roles', roleRoutes);
