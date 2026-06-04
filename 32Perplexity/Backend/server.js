import 'dotenv/config';
import app from './src/app.js';
import connectToDB from './src/config/database.js';
import { testAI } from './src/services/ai.service.js';
import searchInternet from './src/services/internet.sevices.js'

testAI()
connectToDB();
app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT}`);
});
