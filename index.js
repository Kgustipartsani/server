const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(cors({
  origin: 'https://food-ordering-k1hg.vercel.app/', // Ganti dengan URL frontend Anda
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Buat koneksi ke Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("ERROR: Supabase URL atau KEY tidak ditemukan di .env");
  process.exit(1); // Stop server jika variabel env tidak ditemukan
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Endpoint uji coba
app.get('/', async (req, res) => {
  res.send('Server berjalan dengan baik.');
});

app.get('/menus', async (req, res) => {
  console.log('GET /menus hit'); // Log untuk debug
  try {
    const { data, error } = await supabase.from('menus').select('*');
    if (error) throw error;
    console.log('Data dari Supabase:', data); // Log data yang diterima
    res.json(data);
  } catch (err) {
    console.error('Error fetching menus:', err.message);
    res.status(500).send('Supabase Error');
  }
});



// Start server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
