let inputWord = document.getElementById('inputWord');
let btn = document.getElementById('btn')

let wordArr = [...'булка'];

btn.addEventListener('click', function() {
    let inputWordArr = [...inputWord.value];
    for (let i = 0; i < wordArr.length; i++) {
        if (wordArr[i] === inputWordArr[i]) {
            console.log(wordArr[i])
        } else {
            console.log('*')
        }
    }
})


