import express from 'express';

//initialize express application
const app = express();

//API endpoints
app.get('/', (req, res) =>
  res.send('http get request sent to root api endpoint')
);

//connection listener
app.listen(9000, () => console.log('Express server running on port 3000'));
