# File Extension Blocker

사용자가 특정 파일 확장자를 업로드하지 못하도록 차단하고, 업로드 시도 기록을 모달창으로 확인할 수 있는 확장자 관리 도구입니다.

## 기능 정리

- **고정 확장자 차단**  
  - 서버에 미리 정의된 확장자 목록에서 사용자가 차단할 확장자를 체크 가능  
  - 상태는 서버에 저장되어 새로고침 후에도 유지

- **커스텀 확장자 추가/삭제**  
  - 사용자가 직접 추가/삭제 가능 (중복, 형식 제한 등 검증 포함)

- **파일 업로드 시 확장자 검사**  
  - 차단된 확장자는 업로드 불가 처리  
  - 선택한 파일 목록에 표시

- **업로드 시도 로그 기록**  
  - 차단/허용 여부와 함께 시간 기록  
  - 브라우저 로컬스토리지에 저장되어 새로고침 후에도 유지  
  - **모달창에서 테이블 형태로 로그 확인**  

## UI 구성

- React 기반 단일 페이지
- 드래그 앤 드롭 파일 업로드 지원 (또는 클릭 선택 가능)

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
