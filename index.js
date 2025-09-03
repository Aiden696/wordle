let body = document.getElementById('body')
let sectionTable = document.getElementById('sectionTable')
let inputWord = document.getElementById('inputWord');
let btn = document.getElementById('btn')


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

btn.addEventListener('click', function() {
    let inputWordArr = [...inputWord.value];
    let wordArr = [...'булка'];

    let rows = document.querySelectorAll('tr')
    let currentRow = rows[countAttempt];
    let cells = currentRow.querySelectorAll('.td')

    let countLetter = compareLetters(wordArr,inputWordArr,cells);

    if (countLetter === inputWordArr.length) {
        setTimeout(() => alert('Вы выиграли!'), 1000)
    }

    countAttempt++
    if (countAttempt === 6) {
        setTimeout(() => alert('Закончились попытки'), 1000)
    }
})

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




