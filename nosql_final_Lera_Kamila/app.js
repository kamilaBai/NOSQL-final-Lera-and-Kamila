const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/userDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Подключено к MongoDB'))
    .catch((err) => console.log('Ошибка подключения:', err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// Схемы для пользователя и товара
const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const seasonSchema = new mongoose.Schema({
    id_season: Number,
    season_type: String
});

const sizeSchema = new mongoose.Schema({
    idSize: Number,
    sizes: [Number]  // Массив размеров (пример: [36, 37, 38, 39])
});


const productSchema = new mongoose.Schema({
    name: String,
    product_id: String,
    price: String,
    old_price: String,
    image_url: String,
    id_season: { type: Number, ref: 'Season' },
    id_size: { type: Number, ref: 'Size' }  // Новое поле
});

const User = mongoose.model('User', userSchema);
const Season = mongoose.model('Season', seasonSchema);
const Size = mongoose.model('Size', sizeSchema);
const Product = mongoose.model('Product', productSchema);

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            password: hashedPassword
        });
        await newUser.save();
        res.send('Пользователь зарегистрирован!');
    } catch (err) {
        res.status(500).send('Ошибка регистрации');
    }
});

// Маршрут для логина
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).send('Пользователь не найден');
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.redirect('/main');
        } else {
            res.status(400).send('Неверный пароль');
        }
    } catch (err) {
        res.status(500).send('Ошибка при логине');
    }
});

// Статические HTML-страницы
app.get('/', (req, res) => {
    res.render('index');
});
// Route to show the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Route to handle login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(400).send('User not found');
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.redirect('/main');
        } else {
            res.status(400).send('Invalid password');
        }
    } catch (err) {
        res.status(500).send('Error logging in');
    }
});


app.get('/main', async (req, res) => {
    try {
        const products = await Product.find().lean();
        const seasons = await Season.find().lean();
        const sizes = await Size.find().lean();

        // Добавляем название сезона и размеры к продуктам
        products.forEach(product => {
            const season = seasons.find(s => s.id_season === product.id_season);
            product.season_type = season ? season.season_type : "Unknown";

            const sizeData = sizes.find(s => s.idSize === product.id_size);
            product.available_sizes = sizeData ? sizeData.sizes.join(", ") : "No sizes available";
        });

        res.render('main', { products, seasons, sizes });
    } catch (err) {
        res.status(500).send('Ошибка при загрузке товаров');
    }
});



// Маршрут для добавления нового товара
app.post('/addProduct', async (req, res) => {
    const { name, product_id, price, old_price, image_url, id_season, id_size } = req.body;
    try {
        const newProduct = new Product({ name, product_id, price, old_price, image_url, id_season, id_size });
        await newProduct.save();
        res.redirect('/main');
    } catch (err) {
        res.status(500).send('Ошибка при добавлении товара');
    }
});



// Маршрут для удаления товара
app.post('/deleteProduct', async (req, res) => {
    const { id } = req.body;
    try {
        await Product.findByIdAndDelete(id);
        res.redirect('/main');
    } catch (err) {
        res.status(500).send('Ошибка при удалении товара');
    }
});

// Маршрут для обновления товара по product_id
app.post('/updateProduct', async (req, res) => {
    const { update_product_id, new_name, new_price, new_old_price, new_image_url, new_id_season, new_id_size } = req.body;

    try {
        const updatedProduct = await Product.findOneAndUpdate(
            { product_id: update_product_id },
            { name: new_name, price: new_price, old_price: new_old_price, image_url: new_image_url, id_season: new_id_season, id_size: new_id_size },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).send('Товар не найден');
        }

        res.redirect('/main');
    } catch (err) {
        res.status(500).send('Ошибка при обновлении товара');
    }
});


// Запуск сервера
app.listen(3000, () => {
    console.log('Сервер запущен на порту 3000');
});
