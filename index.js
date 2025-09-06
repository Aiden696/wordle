let body = document.getElementById('body')
let sectionTable = document.getElementById('sectionTable')

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

function keyboard() {
    for (let key of keys) {
        key.addEventListener('click', function() {
            if (this.classList.contains('delete')) {
                for (let i = cells.length - 1; i >= 0; i--) {
                    if (cells[i].textContent !== '') {
                        cells[i].textContent = '';
                        break;
                    }
                }
            } else if (this.classList.contains('submit')) {
                checkWord();
            } else {
                for (let cell of cells) {
                    if (cell.textContent === '') {
                        cell.textContent = key.textContent;
                        break;
                    }
                }
            }
        });
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
    
    let countLetter = compareLetters(wordArr, userWordArr, cells);

    if (countLetter === userWordArr.length) {
        setTimeout(() => alert('Вы выиграли!'), 1000)
    } 

    countAttempt++;

    if (countAttempt < 6) {
        currentRow = rows[countAttempt];
        cells = currentRow.querySelectorAll('.td')
    }
    if (countAttempt === 6) {
        setTimeout(() => alert('Закончились попытки'), 1000)
    }
    return
}

function compareLetters(word1,word2,cells) {
    let countLetter = 0;
    for (let i = 0; i < word1.length; i++) {
        if (word1[i] === word2[i]) {
            cells[i].textContent = word1[i]
            cells[i].classList.add('right')
            countLetter++;
        } else {
            cells[i].textContent = word2[i]
            cells[i].classList.add('wrong')
        }
    }
    return countLetter;
} 