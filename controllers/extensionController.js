const db = require('../db');

exports.getAllExtensions = async (req, res) => {
  try {
    const fixed = await db.query('SELECT * FROM fixed_extensions ORDER BY id');
    const custom = await db.query(
      'SELECT * FROM custom_extensions ORDER BY id'
    );
    res.json({ fixed: fixed.rows, custom: custom.rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};

exports.addCustomExtension = async (req, res) => {
  const { extension } = req.body;
  if (!extension) return res.status(400).json({ message: '확장자 입력 필요' });

  try {
    const result = await db.query(
      'INSERT INTO custom_extensions (extension) VALUES ($1) RETURNING *',
      [extension]
    );
    res.status(201).json({ message: '추가 완료', extension: result.rows[0] });
  } catch (err) {
    if (err.code === '23505')
      return res.status(409).json({ message: '이미 존재함' });
    console.error(err);
    res.status(500).json({ message: '서버 오류' });
  }
};
