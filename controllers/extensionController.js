const db = require('../db');

exports.getAllExtensions = async (req, res) => {
  try {
    const fixedResult = await db.query(
      'SELECT * FROM fixed_extensions ORDER BY id'
    );
    const customResult = await db.query(
      'SELECT * FROM custom_extensions ORDER BY id'
    );

    res.json({
      fixed: fixedResult.rows,
      custom: customResult.rows,
    });
  } catch (error) {
    console.error('확장자 조회 오류:', error);
    res.status(500).json({ error: '서버 오류' });
  }
};
