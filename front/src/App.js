import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [fixedExtensions, setFixedExtensions] = useState([]); // 서버에서 받아옴
  const [selectedFixed, setSelectedFixed] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [customTags, setCustomTags] = useState([]);
  const [note, setNote] = useState('');

  // ✅ 서버에서 확장자 데이터 불러오기
  useEffect(() => {
    axios
      .get('http://localhost:8000/extensions')
      .then((res) => {
        const fixed = res.data.fixed;
        setFixedExtensions(fixed);
        const checkedList = fixed
          .filter((ext) => ext.checked)
          .map((ext) => ext.extension);
        setSelectedFixed(checkedList);

        setCustomTags(res.data.custom.map((e) => e.extension));
      })
      .catch((err) => console.error('❌ 확장자 불러오기 실패:', err));
  }, []);

  // ✅ 체크박스 상태 변경
  const handleCheckboxChange = (ext) => {
    const updated = selectedFixed.includes(ext)
      ? selectedFixed.filter((e) => e !== ext)
      : [...selectedFixed, ext];
    setSelectedFixed(updated);

    // 서버에 변경사항 PATCH로 전송
    axios
      .patch('http://localhost:8000/extensions/fixed', { selected: updated })
      .then((res) => console.log(res.data))
      .catch((err) => console.error('❌ 상태 저장 실패:', err));
  };

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !customTags.includes(trimmed)) {
      axios
        .post('http://localhost:8000/extensions/custom', { extension: trimmed })
        .then(() => {
          setCustomTags((prev) => [...prev, trimmed]);
          setCustomInput('');
        })
        .catch((err) => console.error('❌ 커스텀 추가 실패:', err));
    }
  };

  const handleDeleteTag = (ext) => {
    axios
      .delete(`http://localhost:8000/extensions/custom/${ext}`)
      .then(() => {
        setCustomTags((prev) => prev.filter((e) => e !== ext));
      })
      .catch((err) => console.error('❌ 커스텀 삭제 실패:', err));
  };

  const handleSubmit = () => {
    const payload = {
      fixed: selectedFixed,
      custom: customTags,
      note,
    };
    console.log('🚀 전송할 데이터:', payload);
    // axios.post('/api/submit', payload)
  };

  return (
    <div className='app-container'>
      <h2>파일 확장자 차단</h2>

      <div className='section'>
        <label className='label'>고정 확장자</label>
        <div className='fixed-list'>
          {fixedExtensions.map((ext) => (
            <label className='checkbox' key={ext.id}>
              <input
                type='checkbox'
                checked={selectedFixed.includes(ext.extension)}
                onChange={() => handleCheckboxChange(ext.extension)}
              />
              {ext.extension}
            </label>
          ))}
        </div>
      </div>

      <div className='section'>
        <label className='label'>커스텀 확장자</label>
        <div className='custom-input-wrap'>
          <input
            type='text'
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder='확장자 입력'
            maxLength={20}
          />
          <button onClick={handleAddCustom}>+추가</button>
        </div>

        <div className='custom-tags'>
          {customTags.map((tag) => (
            <div className='tag' key={tag}>
              {tag}
              <button onClick={() => handleDeleteTag(tag)}>×</button>
            </div>
          ))}
        </div>
      </div>

      <div className='section'>
        <label className='label'>설명</label>
        <textarea
          placeholder='설명을 입력하세요 (200자 이내)'
          maxLength={200}
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className='submit-wrap'>
        <button className='submit-btn' onClick={handleSubmit}>
          전송
        </button>
      </div>
    </div>
  );
}

export default App;
