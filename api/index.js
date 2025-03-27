const { createClient } = require('@supabase/supabase-js');
const express = require('express');
const cors = require('cors');

const app = express();

// Supabase 클라이언트 설정
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(express.json());
app.use(cors());

// 텍스트 목록 조회
app.get('/texts', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('texts') // 'texts' 테이블에서 데이터를 조회
      .select('*');

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching texts:', error);
    res.status(500).send('Internal Server Error');
  }
});

// 텍스트 추가
app.post('/texts', async (req, res) => {
  try {
    const { text } = req.body;

    const { data, error } = await supabase
      .from('texts')
      .insert([{ text }]);

    if (error) {
      throw error;
    }

    res.json(data[0]);
  } catch (error) {
    console.error('Error adding text:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = app;
