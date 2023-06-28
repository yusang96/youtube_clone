# youtube clone 

## 설치 방법 및 실행

- git clone https://github.com/owen970517/youtube_clone.git
- npm install
- npm start

## 사용한 라이브러리

- ReactJS
- TypeScript 
    - 좋은 자동완성과 안전한 개발을 위해 사용
- styled-components
    - UI 컴포넌트를 작성하기 위해 사용
- React-Player 
    - 유튜브 동영상을 음악 플레이어처럼 만들기 위해 사용
- react-router-dom
    - 페이지 이동을 위해 사용
- useNavigate
    - 페이지 전환 시 파라미터를 전달하기 위해 사용 
- useParams
    - query string의 매개변수 값을 받아오기 위해 사용 
- redux toolkit
    - 상태관리를 위해 사용 
- react-slick 
    - 슬라이더 기능을 구현하기 위해 사용

## 기능

- 메인페이지 
    - 커버곡과 라이브 클립을 각각 내림차순으로 정렬하여 보여줌 
    - 최근에 업로드 된 10곡을 react-slick을 사용하여 슬라이더 형식으로 보여줌 

- 차트페이지 
    - 커버곡, 라이브 클립을 합친 후 내림차순으로 보여줌
    - 전체곡을 재생할 수 있는 버튼을 만듦
    - checkbox를 사용하여 자신이 원하는 곡만 들을 수 있도록 만듦

- 플레이리스트
    - react-player를 사용하여 만듦
    - 재생,멈춤,다음곡,이전곡,랜덤재생, 반복재생,볼륨 조절 기능을 구현
    - 필터 버튼을 만들어 해당 값이 포함된 곡만 보여주도록 구현




