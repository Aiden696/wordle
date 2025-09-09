let body = document.getElementById('body')
let sectionTable = document.getElementById('sectionTable')
let sectionKeyboard = document.getElementById('keyboard')

let keys = document.querySelectorAll('.key');
let deleteBtn = document.querySelector('.delete');
let submitBtn = document.querySelector('.submit');

let wordArr = [...'ветка'];

let table = document.getElementById('table');
table.classList.add('table')
let allRow = document.querySelectorAll('tr');
for (let tr of allRow) {
    tr.classList.add('tr')
    for (let j = 0; j <= 4; j++) {
        let td = document.createElement('td');
        td.classList.add('td')
        td.textContent = '';
        tr.append(td);
    }
}

let countAttempt = 0; //попытка

let rows = document.querySelectorAll('tr')
let currentRow = rows[countAttempt];
let cells = currentRow.querySelectorAll('.td')

function clickDelete() { //клик по клавише delete
    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].textContent !== '') {
            cells[i].textContent = '';
            break;
        }
    }
}

function clickLetter(letter) { //клик по клавише с буквой
    for (let cell of cells) {
        if (cell.textContent === '') {
            cell.textContent = letter;
            break;
        }
    }
}

function keyboard() {
    sectionKeyboard.addEventListener('mousedown', function(event) { //mousedown для предотвращения ввода всей строки виртуальной клавиатуры
        if (!event.target.classList.contains('key')) return; //чтобы не срабатывал клик вне клавиши
        if (event.target.classList.contains('delete')) {
            clickDelete();
        } else if (event.target.classList.contains('submit')) {
            checkWord();
        } else {
            clickLetter(event.target.textContent);
        }
    })
}

function keyboardOff() { //отключение клавиатуры после завершения игры
    let keys = document.querySelectorAll(".key")
    for (let key of keys) {
        key.disabled = true;
    }
}

keyboard()

function checkWord() { //сравнение слов + итог
    let userWord = '';

    for (let cell of cells) {
        userWord += cell.textContent;
    }

    let userWordArr = [...userWord];
    
    if (userWord.length < 5) {
        alert('введите 5 букв')
        return
    }

    let countLetter = compareLetters(wordArr, userWordArr, cells);

    if (countLetter === userWordArr.length) {
        setTimeout(() => alert('Вы выиграли!'), 1000)
        keyboardOff()
    } 

    countAttempt++;

    if (countAttempt < 6) {
        currentRow = rows[countAttempt];
        cells = currentRow.querySelectorAll('.td')
    }
    if (countAttempt === 6) {
        setTimeout(() => alert('Закончились попытки, попробуйте еще раз!'), 1000)
        keyboardOff()
    }
    return
}

function compareLetters(word1,word2,cells) { //сравнение букв в словах
    let countLetter = 0;
    let copyWordArr = [...word1];

    for (let i = 0; i < word1.length; i++) { //сравнение для верной буквы
        if (word1[i] === word2[i]) {
            cells[i].classList.add('right')
            countLetter++;
            copyWordArr[i] = null; 

            colorKey(word2[i],'right')
        } 
    }

    for (let i = 0; i < word1.length; i++) { //сравнение для буквы не на своем месте и неверной буквы
        if (word1[i] !== word2[i]) {
            let letterIndex = copyWordArr.indexOf(word2[i]);
            if (letterIndex > -1) {
                cells[i].classList.add('almost');
                copyWordArr[letterIndex] = null;

                colorKey(word2[i],'almost')
            } else {
                cells[i].classList.add('wrong');

                colorKey(word2[i],'wrong')
            }
            cells[i].textContent = word2[i];
        }
    }
    return countLetter;
} 

function colorKey(letter,color) { //цвет клавиш клавиатуры
    keys.forEach(key => {
        if (key.textContent === letter) {

            let currentRight = key.classList.contains('right')
            let currentAlmost = key.classList.contains('almost')

            if (color === 'right') {
                key.classList.remove('almost','wrong')
                key.classList.add('right')
            } else if (color === 'almost' && !currentRight) {
                key.classList.remove('wrong')
                key.classList.add('almost')
            } else if (color === 'wrong' && !currentRight && !currentAlmost) {
                key.classList.add('wrong')
            }
        }
    })
}

/*function colorKey(cell, letter) {
    keys.forEach(key => {
        if (key.textContent === letter) {           
            if (cell.classList.contains('right')) {
                key.classList.remove('almost','wrong')
                key.classList.add('right')
            } else if (cell.classList.contains('almost')) {
                key.classList.remove('wrong')
                key.classList.add('almost')
            } else {
                key.classList.add('wrong')
            }
        }
    })
}*/

