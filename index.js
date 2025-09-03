let body = document.getElementById('body')
let sectionTable = document.getElementById('sectionTable')
let inputWord = document.getElementById('inputWord');
let btn = document.getElementById('btn')



let table = document.getElementById('table');
table.classList.add('table')
let trAll = document.querySelectorAll('tr');
for (let tr of trAll) {
    tr.classList.add('tr')
    for (let j = 0; j <= 4; j++) {
        let td = document.createElement('td');
        td.classList.add('td')
        td.textContent = '';
        
        tr.append(td);
    }
}

function findWord (cells) {
    btn.addEventListener('click', function() {
        let inputWordArr = [...inputWord.value];
        let wordArr = [...'булка'];

        let count = 0;
        for (let i = 0; i < wordArr.length; i++) {
            if (wordArr[i] === inputWordArr[i]) {
                cells[i].textContent = wordArr[i]
                cells[i].classList.add('right')
                count++;
            } else {
                cells[i].textContent = inputWordArr[i]
                cells[i].classList.add('wrong')
            }
        }
        
        if (count === inputWordArr.length) {
            setTimeout(() => alert('Вы выиграли!'), 1000)
        }
    })
}

let firstRow = document.querySelector('.tr1');
let firstCells = firstRow.children;

findWord (firstCells)

