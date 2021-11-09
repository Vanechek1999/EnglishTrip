let allWordsInBase,
    yourSaveWords =[],
    voicelist = responsiveVoice.getVoices();
responsiveVoice.setDefaultVoice("UK English Male")
// Получаем из json все слова
async function getData(){
    const response = await fetch('./db1.json');
    const words    = await response.json();
    return allWordsInBase = words
}
getData().then(allWordsInBase=>{
    return allWordsInBase
})

// Функция воспроизведения слова

function sayWord(word){
    responsiveVoice.speak(word);
}
// Необходимые переменные
const allCardContent =  document.querySelector('.allCards'),
      closedMenu = document.querySelector('.closed'),
      showMenu   = document.querySelector('.show_menu'),
      menu       = document.querySelector('.menu'),
      allTrigger = document.querySelectorAll('.menu_inner-item')

// Получение всех карторчек
function getAllElements(startValue,endValue){
    menu.classList.add('menuClosed')
    showMenu.classList.remove('clicked')
    allCardContent.classList.remove('show_Cards');
    document.querySelector('.line').style.display = 'none';
    allCardContent.style.background = '';
    allCardContent.innerHTML = '';
    for(let i = startValue; i<endValue; i++){
        for(let y = 0; y< yourSaveWords.length; y++){
        }
        let rend = new Card(allWordsInBase[i].english, allWordsInBase[i].russian, '.allCards')
        rend.render()
    }
    const  btns = document.querySelectorAll('.sendAnswer'),
            addWordOrRepeat = document.querySelectorAll('.addThisWord'),
            sayThisWord = document.querySelectorAll('.sayWord')
    btns.forEach(btn=>{
        btn.addEventListener('click', checkRightAnswer)
    })
    sayThisWord.forEach(voice =>{
        voice.addEventListener('click', function(){
            sayWord(this.previousElementSibling.innerText)
        })
    })
    addWordOrRepeat.forEach(word => {
        word.addEventListener('click', function(){
            if(this.querySelector('span').innerText === 'Добавить в выученные слова'){
                let englishWord = this.parentNode.parentNode.querySelector('.header .word').innerText,
                    russianWord = this.parentNode.querySelector('.russian').innerText
                writeFile(englishWord,russianWord)
                setTimeout(()=>{
                    getData()
                },50)
            }else{
                this.parentNode.parentNode.parentNode.style.cssText = `
                -webkit-transform: rotateY(0deg);
                -moz-transform: rotateY(0deg);
                -ms-transform: rotateY(0deg);
                transform: rotateY(0deg);
            `
            }
        })
    })
    checkWords()
}

function checkWords(){
    let allCards = document.querySelectorAll('.allCards .container');
    for(let i = 0; i < allCards.length; i++){
        for(let y = 0; y < yourSaveWords.length; y++){
            if(yourSaveWords[y].english === allCards[i].querySelector('.word').innerText){
                allCards[i].querySelector('.front').style.background = 'linear-gradient(20deg, #B571FF 17%, #1301FF 84%)'
                allCards[i].classList.add('knowthisWord')
            }
        }
    }

}



// Шаблон для всех карточек
class Card{
    constructor(original, translation, parent){
        this.original = original;
        this.translation = translation;
        this.parent = document.querySelector(parent)
    }
    render(){
        const card = document.createElement('div');
        card.classList.add(`container`);
        card.innerHTML = `
        <div class="flipper">
            <div class="front">
                <div class="header">
                    <h3>English word</h3>
                    <div class="word">${this.original}</div>
                    <button class="sayWord"><span>Воспроизвести</span></button>
                    <input class="writeYourAnswer" placeholder="Напишите ваш ответ" type="text">
                    <button class="sendAnswer">Проверить ответ</button>
                    <div class="answer"></div>

                </div>
            </div>
          <div class="back">
              <h3>На русском</h3>
              <div class="russian">${this.translation}</div>
              <div class="trueFalse">
                <span>Ваш ответ верный</span>
                <div class="rightOrFalse"></div>
              </div>
              <div class="addThisWord"><span>Добавить в выученные слова</span></div>
          </div>
      </div>
    `;
        this.parent.append(card)
    }
}
// Проверка правильный ли ответ
function checkRightAnswer(){
    let thisCard = this.parentNode.parentNode.parentNode.parentNode;
    if(this.previousElementSibling.value.length !== 0){
        if(thisCard.querySelector('.russian').innerText.indexOf(this.previousElementSibling.value.toLowerCase()) !== -1){
            if(thisCard.classList.contains('knowthisWord')){
                thisCard.querySelector('.addThisWord span').innerHTML = 'Это слово уже добавлено';
            }else{
                thisCard.querySelector('.addThisWord span').innerHTML = 'Добавить в выученные слова';
            }
            thisCard.querySelector('.trueFalse span').innerHTML = 'Это правильный ответ';
            thisCard.querySelector('.rightOrFalse').style.background = 'url(./img/right.png) no-repeat center'

        }else{
            thisCard.querySelector('.trueFalse span').innerHTML = 'Это неправильный ответ';
            thisCard.querySelector('.addThisWord span').innerHTML = 'Повторить это слово';
            thisCard.querySelector('.rightOrFalse').style.background = 'url(./img/false.png) no-repeat center'
        }
        thisCard.style.cssText = `
        -webkit-transform: rotateY(180deg);
        -moz-transform: rotateY(180deg);
        -ms-transform: rotateY(180deg);
        transform: rotateY(180deg);
    `;
    }else{
        return
    }

}


//Menu

showMenu.addEventListener('click', ()=>{
    if(menu.classList.contains('menuClosed')){
        menu.classList.remove('menuClosed');
        showMenu.classList.add('clicked')
    }else{
        menu.classList.add('menuClosed')
        showMenu.classList.remove('clicked')
    }
})

function homePage(){
    allCardContent.innerHTML = '';
    allCardContent.style.background = '';
    document.querySelector('.line').style.display = '';
    allCardContent.classList.remove('show_Cards')
    showMenu.classList.remove('clicked')
    menu.classList.add('menuClosed');
}
let showYourWords = false
allTrigger.forEach(trigger=>{
    trigger.addEventListener('click', function(){
        switch (this.getAttribute('data-trigger')) {
            case 'home':
                homePage()
                break;
            case 'showLearnWords':
                showYourWords = true;
                getYourWords()

                setTimeout(()=>{
                    const allBtn = document.querySelectorAll('.playThis');
                    allBtn.forEach(btn=>{
                        btn.addEventListener('click', function(){
                            sayWord(this.previousElementSibling.innerText)
                        })
                    })
                },50)
                break;
            case '100words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')));
                break;
            case '200words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
                break;
            case '300words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
                break;
            case '400words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
                break;
            case '500words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
                break;
            case '600words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
                break;
            case '700words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
                break;
            case '800words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
                break;
            case '900words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
                break;
            case '1000words':
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
                break;
            case 'challange':
                drawGame()
                break
            default:
                break;
        }
    })
})


// Запоминание слов

function writeFile(englishWord, translate) {    
    $.ajax({
        type: "post",
        url: "test.php",
        dataType: 'json',
        data: {
            textcontent: `{
                "english": "${englishWord}",
                "russian": "${translate}"
            };`,
        },
    });
};


function getYourWords(){
    menu.classList.add('menuClosed')
    showMenu.classList.remove('clicked')
    document.querySelector('.line').style.display = 'none';
    allCardContent.classList.remove('show_Cards')
    allCardContent.innerHTML = '';
    allCardContent.style.background = 'linear-gradient(-25deg, #616161 0%, #96B7C4 100%)';
    fetch('./yourWords.txt')
    .then((response)=>{
        return response.text()
    })
    .then(data=>{
        data = data.replace(/\s/g, '');
        data = data.split(/\s*;\s*/);
        let yourWords = JSON.parse(JSON.stringify(data));
        for(let i = 0; i<yourWords.length; i++){
            let a = eval('({obj:[' + yourWords[i] + ']})')
            if(yourWords[i].length !== 0){
                if(showYourWords){
                    let rend = new SaveWords(a.obj[0].english, a.obj[0].russian, '.allCards')
                    rend.render()
                }else{
                    yourSaveWords.push(a.obj[0]);
                }

            }else{
                return
            }
        }
    })
}
getYourWords() 
// шаблон для сохранённых слов
class SaveWords{
    constructor(original, translate, parent){
        this.original = original;
        this.translate = translate;
        this.parent = document.querySelector(parent);
    }
    render(){
        const word = document.createElement('div');
        word.classList.add('saveWord');
        word.innerHTML = `
            <p class="saveWord_english">${this.original}</p>
            <button class="playThis">Play</button>
            <p class="saveWord_translate">${this.translate}</p>
        `;
        this.parent.append(word)
    }
}




// Game

function drawGame(){
    menu.classList.add('menuClosed');
    showMenu.classList.remove('clicked');
    document.querySelector('.line').style.display = 'none';
    allCardContent.style.background = '';
    allCardContent.classList.add('show_Cards')
    allCardContent.innerHTML=`
    <div class="option">
    <h2>Добро пожаловать в игру</h2>
    <p>Выберите параметры игры</p>
        <div class="option_inner">
            Выберите количество слов: 
            <div class="countWords"><button class="decrement">-</button><input type="number" value="2"><button class="increment">+</button></div>
            Выберите уровень сложности: <select class="level">    
                                            <option value="30">Легкий</option>
                                            <option value="20">Средний</option>
                                            <option value="10">Сложный</option>
                                        </select>
            <button class="startThisGame">Start game</button>
        </div>
    </div>
    `;
    document.querySelector('.option_inner select').addEventListener('change', function(){
        console.log(this.value);
    })
    const decrement = document.querySelector('.decrement'),
          increment = document.querySelector('.increment');
    decrement.addEventListener('click', function(){
        console.log(this.nextElementSibling);
        if(this.nextElementSibling.value >2){
            
            this.nextElementSibling.value--
        }else{
            return
        }
        
    })
    increment.addEventListener('click', function(){
        if(this.previousElementSibling.value <500){
            this.previousElementSibling.value++
        }else{
            return
        }
        
    })
    document.querySelector('.startThisGame').addEventListener('click', ()=>{
        if(+document.querySelector('.option_inner input[type="number"]').value.length !== 0 && +document.querySelector('.option_inner input[type="number"]').value >= 2){
            startGame(+document.querySelector('.option_inner input[type="number"]').value, +document.querySelector('.option_inner select').value)
        }else{
            return
        }
        
    })
}

function clearOption(){
    document.querySelector('.option').style.opacity = '0';
    setTimeout(()=>{
        document.querySelector('.option').remove()
    }, 600)

}

function startGame(countOfWords, level){
    clearOption()
    let countOptionWords = Math.floor(Math.random() * allWordsInBase.length) -countOfWords < 0 ? 0 : Math.floor(Math.random() * allWordsInBase.length)- countOfWords,
        interval         = countOptionWords + countOfWords;

    for(let i= countOptionWords; i< interval; i++){
        let countOfCards = interval-countOptionWords;
        rend = new CardForGame(allWordsInBase[i].english, allWordsInBase[i].russian, '.allCards');
        rend.render()
        const nextCard = document.querySelectorAll('.nextCard');
        // Таймер
        let timer;
       
        let x =countOfWords * level;
        
        countdown(); 
        function countdown(){ 
            document.querySelectorAll('.timer').forEach(item=>{
                item.innerHTML = `Осталось времени ${x}сек`;
            })
            x--;
            if (x<0){
                clearTimeout(timer);
                setTimeout(()=>{
                    allCardContent.innerHTML= `
                    <p>Вы ответили на ${(counter/(interval-countOptionWords))*100}% из 100%</p>
                    <button class="closeGame">На главную</button>
                    `;
                    allCardContent.style.cssText = `
                        flex-direction: column;
                        margin: 0 auto;
                        align-items: center;
                    `
                    closeGame()
                }, 500)
            }
            else {
                timer = setTimeout(countdown, 1000);
            }
        }
       // Таймер
        let counter = 0;
        nextCard.forEach(next =>{
            next.addEventListener('click', function(){
                let find = this.parentNode;
                let check = find.querySelector('.checkTrueOrFalse');
                let rightAnswer = find.querySelector('.rightAnswer');
                if(this.innerText !== 'Закончить тестирование'){

                    if(find.querySelector('input[type="text"]').value.length !==0){
                        if(rightAnswer.innerText.indexOf(find.querySelector('input[type="text"]').value) !== -1){
                            counter++;
                            check.style.background = ''
                            rightAnswer.style.opacity = '1'
                            setTimeout(()=>{
                                check.style.opacity = '1';
                            }, 100)
                        }else{
                            check.style.background = 'url(./img/false.png) no-repeat center'
                            rightAnswer.style.opacity = '1'
                            setTimeout(()=>{
                                check.style.opacity = '1';
                            }, 100)
                        }
                        --countOfCards;
                        console.log(countOfCards);
                        if(countOfCards <= 1){
                           
                            find.previousElementSibling.querySelector('.nextCard').innerText="Закончить тестирование"
                            setTimeout(()=>{
                                find.style.left="200%"   
                            }, 500)
                            
                        }else{
                            setTimeout(()=>{
                                find.style.left="200%"
                            }, 500)
                        }
                    }else{
                        return
                    }
                }else{
                    if(rightAnswer.innerText.indexOf(find.querySelector('input[type="text"]').value) !== -1){
                        counter++;
                        check.style.background = ''
                        setTimeout(()=>{
                            check.style.opacity = '1';
                        }, 100)
                    }else{
                        check.style.background = 'url(./img/false.png) no-repeat center'
                        setTimeout(()=>{
                            check.style.opacity = '1';
                        }, 100)
                    }
                    setTimeout(()=>{
                        clearTimeout(timer);
                        find.innerHTML= `
                        <p>Вы ответили на ${(counter/(interval-countOptionWords))*100}% из 100%</p>
                        <button class="closeGame">На главную</button>
                        `;
                        closeGame()
                    }, 500)

                }


            })
        })

    }


  
}
function closeGame(){
    document.querySelector('.closeGame').addEventListener('click', function(){
        allCardContent.innerText=''
        allCardContent.classList.remove('show_Cards')
    })
}
// Шаблон карточек для игры
class CardForGame{
    constructor(cardEnglish, cardRussian, parent){
        this.cardEnglish = cardEnglish;
        this.cardRussian = cardRussian;
        this.parent      =  document.querySelector(parent);
    }
    render(){
        const game = document.createElement('div');
        game.classList.add('cardForGame');
        game.innerHTML = `
        <p class="timer"></p>
        <h2>${this.cardEnglish}</h2>
        <input type="text" placeholder="Ваш ответ">
        <h2  class="rightAnswer">${this.cardRussian}</h2>
        <div class="checkTrueOrFalse"></div>
        <button class="nextCard">Следующая карта</button>
        `;
        this.parent.append(game)
    }
}
// Game