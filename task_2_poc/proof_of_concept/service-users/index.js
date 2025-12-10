require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 8002;

app.listen(PORT, () => {
  console.log(`Users service running on port ${PORT}`);
});