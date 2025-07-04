# File Extension Blocker

사용자가 특정 파일 확장자를 업로드하지 못하도록 차단하는 관리 프로그램입니다.

## 주요 기능

- **고정 확장자 차단**
  - 서버에 미리 정의된 확장자 목록 중 차단할 확장자를 선택 가능
  - 선택 상태는 서버에 저장되어 새로고침 후에도 유지됨

- **커스텀 확장자 관리**
  - 사용자가 직접 확장자를 추가하거나 삭제 가능
  - 중복/형식(영문 소문자 및 숫자, 1~20자) 검증 포함

- **파일 업로드 검사**
  - 업로드 시 확장자를 검사하여 차단된 경우 업로드 차단
  - 허용된 파일만 업로드 목록에 표시

- **업로드 시도 로그 기록**
  - 업로드 시도 결과(파일명, 확장자, 차단 여부, 시간)를 로그로 저장
  - 브라우저 LocalStorage에 저장되어 새로고침 후에도 유지
  - **모달창에서 테이블 형태로 확인 가능**

## UI 구성

- React 기반
- 클릭으로 다중 파일 선택

## 기술 스택

- **Frontend**: React, Axios, CSS
- **Backend**: Node.js (Express), PostgreSQL
- **기타**: LocalStorage, RESTful API, React Portal

## 실행 방법

```bash
# 백엔드 실행
cd back
npm install
npm start

# 프론트엔드 실행
cd front
npm install
npm start


# 로컬 개발용
REACT_APP_API_URL=http://localhost:8000

배포 주소
	•	프론트엔드: https://file-extension-blocker-front.onrender.com
	•	백엔드: https://file-extension-back.onrender.com
