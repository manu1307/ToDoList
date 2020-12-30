//Form, input, list 선언
const toDoForm = document.querySelector('.js-toDoForm'),
  toDoInput = toDoForm.querySelector('input'),
  toDoList = document.querySelector('.js-toDoList');

//localstorage에 들어갈 키 값 선언
const TODOS_LS = 'toDos';

//localstorage에서 활용할 빈 배열 선언
let toDos = [];

function deleteToDo(event) {
  //클릭할 대상을 btn에 대입
  const btn = event.target;
  //삭제 대상의 부모를 변수 선언
  const li = btn.parentNode;
  //부모인 toDoList에서 자식인 해당 li를 삭제
  toDoList.removeChild(li);
  //삭제대상의 id값과 다른 todo들을 걸러내서 cleanToDos라는 새로운 배열 생성
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id != parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

//toDos 배열에 들어간 값들을 localstorage에 저장
function saveToDos() {
  //JSON.stringify를 이용하여 배열을 문자열로 바꿔준 후
  //todos는 키값, 문자열은 value값으로 넣는다.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  //새롭게 만들 html 태그들을 선언
  const li = document.createElement('li');
  const delBtn = document.createElement('button');
  const span = document.createElement('span');
  const newId = toDos.length + 1;
  delBtn.innerText = '❌';
  delBtn.addEventListener('click', deleteToDo);
  span.innerText = text;
  //li 태그 안에 span 과 button을 넣는다
  li.appendChild(span);
  li.appendChild(delBtn);
  //li 태그에 id 부여
  li.id = newId;
  //toDoList에 li를 넣는다
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: toDos.length + 1,
  };
  //text와 id를 부여한 object를 array에 넣는다
  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  //input에 내용을 입력하면 그것을 받고 출력하는 paintToDo()실행
  //그리고 input은 비운다.
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = '';
}

//todo로 등록해놓은 것들을 불러온다.
function loadToDos() {
  const loadToDos = localStorage.getItem(TODOS_LS);
  if (loadToDos !== null) {
    //loadToDOs라는 문자열을 parsedToDos라는 배열로 변환
    const parsedToDos = JSON.parse(loadToDos);
    //parsedToDos배열의 각 값에 대하여 paintToDo를 실행
    parsedToDos.forEach(function (toDo) {
      //배열에 들어있는 text를 따로 가져와서 html로 출력
      paintToDo(toDo.text);
    });
  }
}

//Form에 값을 입력하면 list로 출력하도록 함
function init() {
  loadToDos();
  toDoForm.addEventListener('submit', handleSubmit);
}

init();
