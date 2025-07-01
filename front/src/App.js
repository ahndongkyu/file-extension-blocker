import React, { useState } from 'react';
import './App.css';

function App() {
  const fixedExtensions = ['bat', 'cmd', 'com', 'cpl', 'exe', 'scr', 'js'];
  const [selectedFixed, setSelectedFixed] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [customTags, setCustomTags] = useState([]);
  const [note, setNote] = useState('');

  const handleCheckboxChange = (ext) => {
    setSelectedFixed((prev) =>
      prev.includes(ext) ? prev.filter((e) => e !== ext) : [...prev, ext]
    );
  };

  const handleAddCustom = () => {
    const trimmed = customInput.trim();
    if (trimmed && !customTags.includes(trimmed)) {
      setCustomTags((prev) => [...prev, trimmed]);
      setCustomInput('');
    }
  };

  const handleDeleteTag = (ext) => {
    setCustomTags((prev) => prev.filter((e) => e !== ext));
  };

  const handleSubmit = () => {
    const payload = {
      fixed: selectedFixed,
      custom: customTags,
      note,
    };
    console.log('🚀 전송할 데이터:', payload);
    // TODO: axios.post('/api/submit', payload)
  };

  return (
    <div className='app-container'>
      <h2>파일 확장자 차단</h2>

      <div className='section'>
        <label className='label'>고정 확장자</label>
        <div className='fixed-list'>
          {fixedExtensions.map((ext) => (
            <label className='checkbox' key={ext}>
              <input
                type='checkbox'
                checked={selectedFixed.includes(ext)}
                onChange={() => handleCheckboxChange(ext)}
              />
              {ext}
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
