
import express from 'express';
import axios from 'axios';

const app = express();
const port = process.env.PORT || 3000;

// Set up your OpenWeather API key
const apiKey =  'YOUR_API_KEY';

app.set('view engine', 'ejs');
app.use(express.static('public'));
// Route for the root URL
app.get('/', async (req, res) => {
    try {
        const city = req.query.city || 'delhi';// Default to London if city parameter is not provided
        const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await axios.get(apiUrl);
        const weatherData = response.data;
        res.render('index', { weatherData, city });
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).send('Error fetching weather data');
    }
    
});

// Route to handle weather data for a specific city
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


