const body = document.querySelector('body');

//배경화면 가짓수 선언
const IMG_NUMBER = 3;

//배경화면에 이미지 표시하는 함수
function paintImage(imgNumber) {
  //새로운 이미지 선언
  const image = new Image();
  //이미지파일 불러오기
  image.src = `/images/${imgNumber + 1}.jpg`;
  //이미지 파일에 class부여해서 css 속성 부여
  image.classList.add('bgImage');
  //body안에 image 집어넣는다.
  body.appendChild(image);
}

//배경화면 가짓수 중 임의의 정수 가져온다.
function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();
