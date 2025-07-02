const db = require('../db');

// 전체 확장자 목록(고정 + 커스텀) 조회
exports.getAllExtensions = async (req, res) => {
  try {
    const fixed = await db.query('SELECT * FROM fixed_extensions ORDER BY id');
    const custom = await db.query(
      'SELECT * FROM custom_extensions ORDER BY id'
    );
    res.json({ fixed: fixed.rows, custom: custom.rows });
  } catch (err) {
    console.error('Error fetching extensions:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 커스텀 확장자 추가
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
    if (err.code === '23505') {
      // 중복 확장자
      return res.status(409).json({ message: '이미 존재함' });
    }
    console.error('Error adding custom extension:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 고정 확장자 체크 상태 업데이트
exports.updateFixedExtensions = async (req, res) => {
  const { selected } = req.body;

  if (!Array.isArray(selected)) {
    return res.status(400).json({ message: 'selected는 배열이어야 합니다.' });
  }

  try {
    // 모든 확장자의 checked를 false로 초기화
    await db.query('UPDATE fixed_extensions SET checked = false');

    // 선택된 확장자만 true로 설정
    for (const ext of selected) {
      await db.query(
        'UPDATE fixed_extensions SET checked = true WHERE extension = $1',
        [ext]
      );
    }

    res.status(200).json({ message: '상태 저장 완료' });
  } catch (err) {
    console.error('Error updating fixed extensions:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 체크 상태와 관계없이 전체 고정 확장자 조회
exports.getFixedExtensions = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM fixed_extensions ORDER BY id');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching fixed extensions:', err);
    res.status(500).json({ message: '서버 오류' });
  }
};

// 커스텀 확장자 삭제
exports.deleteCustomExtension = async (req, res) => {
  const { extension } = req.params;
  try {
    await db.query('DELETE FROM custom_extensions WHERE extension = $1', [
      extension,
    ]);
    res.status(200).json({ message: '삭제 완료' });
  } catch (err) {
    console.error('Error deleting custom extension:', err);
    res.status(500).json({ error: '서버 에러' });
  }
};
