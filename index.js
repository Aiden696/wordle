let body = document.getElementById('body')
let sectionTable = document.getElementById('sectionTable')
let sectionKeyboard = document.getElementById('keyboard')

/*клавиатура*/
let keys = document.querySelectorAll('.key');
let deleteBtn = document.querySelector('.delete');
let submitBtn = document.querySelector('.submit');

/*<dialog>*/
let gameDialog = document.getElementById('gameDialog')
let titleDialog = document.getElementById('titleDialog')
let wordDialog = document.getElementById('wordDialog')
let buttons = document.querySelectorAll('#choiceBtns button')
let continueDialog = document.getElementById('continueDialog')
let overGameBtn = document.getElementById('overGameBtn')

let wordsArr = RUWORDS;
let wordsArrCopy = [...wordsArr]
let usedWords = [];

let randomIndex = Math.floor(Math.random() * wordsArrCopy.length)
let randomWord = wordsArrCopy[randomIndex]
let wordArr = [...randomWord]

wordsArrCopy.splice(randomIndex,1)
usedWords.push(randomWord)

console.log(wordsArrCopy)
console.log(usedWords)
console.log(wordArr)

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

function realKeyboard() { //физическая клавиатура
    document.addEventListener('keydown', function(event) {
        if (!gameDialog.open) {
            if (event.key === 'Backspace') {
                event.preventDefault();
                clickDelete()
                return;
            }    
            if (event.key.length === 1 && event.key.match(/[a-zA-Zа-яА-Я]/)) {
                event.preventDefault();
                clickLetter(event.key.toLowerCase())
            }
            if (event.key === 'Enter') {
                event.preventDefault();
                checkWord();
                return;
            }
        } else {
            let currentIndex = 0;
            if (event.key === 'ArrowLeft') {
                currentIndex = 0;
                buttons[0].focus();
                buttons[0].classList.add('choiceBtn')
            } else if (event.key === 'ArrowRight') {
                currentIndex = 1;
                buttons[1].focus();
                buttons[1].classList.add('choiceBtn')
            } else if (event.key === 'Enter') {
                event.preventDefault();
                gameDialog.close();
            }
        }
    });
}

realKeyboard()

function keyboard() { //виртуальная клавиатура
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

keyboard()

function keyboardOff() { //отключение клавиатуры после завершения игры
    let keys = document.querySelectorAll(".key")
    for (let key of keys) {
        key.disabled = true;
    }
}

function overGame() {
    gameDialog.close();
    //что будет после закрытия диалога
}

function continueGame() {
    //что будет если продолжить игру НОВАЯ ИГРА/ПОВТОРИТЬ ПОПЫТКУ
    gameDialog.close();

    let tds = document.querySelectorAll('.td')
    for (let td of tds) { //сброс букв и стилей ячеек
        td.textContent = '';
        td.classList = 'td'  
    }

    keys.forEach(key => {
        key.classList.remove('right', 'almost', 'wrong');
    });

    countAttempt = 0; //сброс счетчика прошлого слова
    currentRow = rows[countAttempt];
    cells = currentRow.querySelectorAll('.td')

    randomIndex = Math.floor(Math.random() * wordsArrCopy.length)
    randomWord = wordsArrCopy[randomIndex]
    wordArr = [...randomWord]

    wordsArrCopy.splice(randomIndex, 1);
    usedWords.push(randomWord);
    wordDialog.textContent = `Загаданное слово: ${randomWord}`

    console.log(wordsArrCopy)
    console.log(usedWords)
    console.log(wordArr)
}

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
        //keyboardOff()
        gameDialog.showModal() // DIALOG
        titleDialog.textContent = 'Вы выйграли!';
        wordDialog.textContent = `Загаданное слово: ${randomWord}`
        continueDialog.textContent = 'Следущее слово?';
        return;
    }

    countAttempt++;

    if (countAttempt < 6) {
        currentRow = rows[countAttempt];
        cells = currentRow.querySelectorAll('.td')
    } else if (countAttempt === 6) {
        gameDialog.showModal() // DIALOG
        titleDialog.textContent = 'Вы проиграли';
        wordDialog.textContent = `Загаданное слово: ${randomWord}`
        continueDialog.textContent = 'Попробовать еще раз?';
        //keyboardOff()
    }
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