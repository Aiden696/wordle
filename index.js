let body = document.getElementById('body')
let sectionTable = document.getElementById('sectionTable')
let sectionKeyboard = document.getElementById('keyboard')

let keys = document.querySelectorAll('.key');
let deleteBtn = document.querySelector('.delete');
let submitBtn = document.querySelector('.submit');

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

function clickDelete() {
    for (let i = cells.length - 1; i >= 0; i--) {
        if (cells[i].textContent !== '') {
            cells[i].textContent = '';
            break;
        }
    }
}

function clickLetter(letter) {
    for (let cell of cells) {
        if (cell.textContent === '') {
            cell.textContent = letter;
            break;
        }
        
    }
}

function keyboard() {
    sectionKeyboard.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete')) {
            clickDelete();
        } else if (event.target.classList.contains('submit')) {
            checkWord();
        } else {
            clickLetter(event.target.textContent);
        }
    })
}

function keyboardOff() {
    let keys = document.querySelectorAll(".key")
    for (let key of keys) {
        key.disabled = true;
    }
}

keyboard()

function checkWord() {
    let wordArr = [...'ветка'];
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

function compareLetters(word1,word2,cells) {
    let countLetter = 0;
    let copyWordArr = [...word1];

    for (let i = 0; i < word1.length; i++) {
        if (word1[i] === word2[i]) {
            cells[i].classList.add('right')
            countLetter++;
            copyWordArr[i] = null; 
        } 
    }

    for (let i = 0; i < word1.length; i++) {
        if (word1[i] !== word2[i]) {
            let letterIndex = copyWordArr.indexOf(word2[i]);
            console.log(letterIndex)
            if (letterIndex > -1) {
                cells[i].classList.add('almost');
                copyWordArr[letterIndex] = null;
            } else {
                cells[i].classList.add('wrong');
            }
            cells[i].textContent = word2[i];
        }
    }
    return countLetter;
} 