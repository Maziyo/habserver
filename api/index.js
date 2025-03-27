// api/texts.js
const { createClient } = require('@supabase/supabase-js');

// Supabase 클라이언트 설정
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('texts') // 'texts' 테이블에서 데이터를 조회
        .select('*');

      if (error) {
        throw error;
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching texts:', error);
      return res.status(500).send('Internal Server Error');
    }
  }

  if (req.method === 'POST') {
    try {
      const { text } = req.body;

      const { data, error } = await supabase
        .from('texts')
        .insert([{ text }]);

      if (error) {
        throw error;
      }

      return res.status(200).json(data[0]);
    } catch (error) {
      console.error('Error adding text:', error);
      return res.status(500).send('Internal Server Error');
    }
  }

  // Method Not Allowed
  return res.status(405).send('Method Not Allowed');
};
