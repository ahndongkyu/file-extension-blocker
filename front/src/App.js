import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [fixedExtensions, setFixedExtensions] = useState([]);
  const [selectedFixed, setSelectedFixed] = useState([]);
  const [customInput, setCustomInput] = useState('');
  const [customTags, setCustomTags] = useState([]);
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // ✅ 고정 + 커스텀 확장자 모두 불러오기 (한 번만)
  useEffect(() => {
    axios
      .get('http://localhost:8000/extensions')
      .then((res) => {
        const fixed = res.data.fixed;
        const custom = res.data.custom;

        setFixedExtensions(fixed);
        setSelectedFixed(
          fixed.filter((ext) => ext.checked).map((ext) => ext.extension)
        );
        setCustomTags(custom.map((ext) => ext.extension));
      })
      .catch((err) => console.error('❌ 확장자 불러오기 실패:', err));
  }, []);

  // ✅ 체크박스 상태 변경
  const handleCheckboxChange = (ext) => {
    const updated = selectedFixed.includes(ext)
      ? selectedFixed.filter((e) => e !== ext)
      : [...selectedFixed, ext];

    setSelectedFixed(updated);

    axios
      .patch('http://localhost:8000/extensions/fixed', { selected: updated })
      .then(() => {
        const msg = selectedFixed.includes(ext)
          ? `"${ext}" 확장자 차단이 해제되었습니다.`
          : `"${ext}" 확장자가 차단 목록에 추가되었습니다.`;
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000); // 3초 후 메시지 제거
      })
      .catch((err) => {
        console.error('❌ 상태 저장 실패:', err);
        setMessage('⚠️ 서버와의 통신 중 오류가 발생했습니다.');
        setTimeout(() => setMessage(''), 3000);
      });
  };

  const handleAddCustom = () => {
    const trimmed = customInput.trim().toLowerCase(); // 소문자 통일
    const isValid = /^[a-z0-9]{1,20}$/.test(trimmed); // 영문 소문자+숫자만, 최대 20자

    if (!trimmed) return;

    if (!isValid) {
      alert('확장자는 영문 소문자와 숫자만 입력할 수 있습니다. (1~20자)');
      return;
    }

    if (customTags.includes(trimmed)) {
      alert('이미 추가된 확장자입니다.');
      return;
    }

    if (customTags.length >= 200) {
      alert('최대 200개의 확장자까지만 추가할 수 있습니다.');
      return;
    }

    axios
      .post('http://localhost:8000/extensions/custom', { extension: trimmed })
      .then(() => {
        setCustomTags((prev) => [...prev, trimmed]);
        setCustomInput('');
      })
      .catch((err) => {
        console.error('❌ 커스텀 추가 실패:', err);
        alert('커스텀 확장자 추가 실패');
      });
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
    };
    console.log('🚀 전송할 데이터:', payload);
    // axios.post('/api/submit', payload)
  };

  // const handleFileUpload = (e) => {
  //   const files = Array.from(e.target.files);
  //   const allBlocked = [...selectedFixed, ...customTags].map((ext) =>
  //     ext.toLowerCase()
  //   );

  //   const blockedFiles = files.filter((file) => {
  //     const ext = file.name.split('.').pop().toLowerCase();
  //     return allBlocked.includes(ext);
  //   });

  //   if (blockedFiles.length > 0) {
  //     alert(
  //       `❌ 차단된 확장자 파일이 포함되어 있습니다: ${blockedFiles
  //         .map((f) => f.name)
  //         .join(', ')}`
  //     );
  //     return;
  //   }

  //   alert(`✅ ${files.length}개의 파일 업로드 준비 완료`);
  //   // 실제 업로드 처리 로직 추가 가능
  // };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const filtered = files.filter((file) => {
      const ext = file.name.split('.').pop().toLowerCase();
      const isBlocked = selectedFixed.includes(ext) || customTags.includes(ext);
      if (isBlocked) {
        alert(`🚫 차단된 확장자입니다: .${ext}`);
        return false;
      }
      return true;
    });
    setUploadedFiles((prev) => [...prev, ...filtered]);
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className='app-container'>
      <div className='message-placeholder'>
        {message && <div className='message'>{message}</div>}
      </div>
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
        <label className='label'>파일 업로드</label>
        <input type='file' multiple onChange={handleFileChange} />

        {uploadedFiles.length > 0 && (
          <ul className='upload-list'>
            {uploadedFiles.map((file, idx) => (
              <li key={idx}>
                {file.name}
                <button onClick={() => handleRemoveFile(idx)}>삭제</button>
              </li>
            ))}
          </ul>
        )}
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
