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
function clearHomePage(param){
    document.querySelector('.showFunction').style.display = param
    document.querySelector('.line_home').style.display = param
    document.querySelector('.line').style.display = param
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
    clearHomePage('none')
}

function checkWords(){
    let allCards = document.querySelectorAll('.allCards .container');
    for(let i = 0; i < allCards.length; i++){
        for(let y = 0; y < yourSaveWords.length; y++){
            if(yourSaveWords[y].english === allCards[i].querySelector('.word').innerText){
                allCards[i].querySelector('.front').style.background = 'linear-gradient(20deg, rgb(181, 113, 255) 17%, transparent 84%)'
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
    clearHomePage('')
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
                            sayWord(this.parentNode.querySelector('.saveWord_english').innerText)
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
    allCardContent.classList.remove('show_Cards')
    allCardContent.innerHTML = '';
    // allCardContent.style.background = 'linear-gradient(-25deg, #616161 0%, #96B7C4 100%)';
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
                    clearHomePage('none')
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
            <p class="saveWord_translate">${this.translate}</p>
            <button class="playThis"><img src="./img/play.png"></button>
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

    const decrement = document.querySelector('.decrement'),
          increment = document.querySelector('.increment');
          inputNumber = document.querySelector('.countWords input')
    decrement.addEventListener('click', function(){
        if(this.nextElementSibling.value >2){
            this.nextElementSibling.value--
        }else{
            return
        }
        
    })
    inputNumber.addEventListener('change', function(){
        if(this.value > 100){
            this.value = 100
        }else if(this.value < 2){
            this.value = 2
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
    clearHomePage('none')
}

function clearOption(){
    document.querySelector('.option').style.opacity = '0';
    setTimeout(()=>{
        document.querySelector('.option').remove()
    }, 600)

}

function startGame(countOfWords, level){
    const arr = [];
    function getYourAnswers(answer, translate, right){
        obj = {
            yourAnswer:answer,
            rightAnswer: translate,
            trueOrfalse: right
        }
        arr.push(obj)
    };
    function getResultGame(yourPoints, emptyArr){
        setTimeout(()=>{
            let resArr = []
            arr.filter(function(item){
                var i = resArr.findIndex(x => (x.yourAnswer == item.yourAnswer && x.rightAnswer == item.rightAnswer && x.trueOrfalse == item.trueOrfalse));
                if(i <= -1){
                      resArr.push(item);
                }
                return null;
              });
              allCardContent.innerHTML = '';
              allCardContent.style.cssText = `
              flex-direction: column;
              margin: 0 auto;
              align-items: center;
          `
              allCardContent.innerHTML= `
              <div class="result">
                <p>Вы ответили на ${yourPoints}% из 100%</p>
                <div class="allYourAnswers"></div>
                <button class="closeGame">На главную</button>
              </div>
              `;
              if(resArr.length > 0){
                for(let i = 0; i < resArr.length; i++){
                    let rend = new cardForResult(i+1 ,resArr[i].yourAnswer, resArr[i].rightAnswer, resArr[i].trueOrfalse ?'./img/right.png': './img/false.png', '.allYourAnswers')
                    rend.render()
                }
              }else{
                for(let y = 0; y < emptyArr.length; y++){
                    let rend = new cardForResult(y+1 , 'Вы не ответили', emptyArr[y].querySelector('.englishWord').innerText, './img/false.png', '.allYourAnswers')
                    rend.render()
                }
              }


            closeGame()
        }, 500)
    }

    clearOption()
    let countOptionWords;
    if(Math.floor(Math.random() * allWordsInBase.length) -countOfWords < 0){
        countOptionWords = 0
    }else if(Math.floor(Math.random() * allWordsInBase.length) -countOfWords > 1000){
        countOptionWords = 1000 - (Math.floor(Math.random() * allWordsInBase.length) -countOfWords)
    }else{
        countOptionWords = Math.floor(Math.random() * allWordsInBase.length)- countOfWords;
    }
    let interval = countOptionWords + countOfWords;
    for(let i= countOptionWords; i< interval; i++){
        let countOfCards = interval-countOptionWords;
        rend = new CardForGame(0,countOfCards ,allWordsInBase[i].english, allWordsInBase[i].russian, '.allCards');
        rend.render()
        const nextCard = document.querySelectorAll('.nextCard'),
              arrOfCardGame =  document.querySelectorAll('.cardForGame');
        let allCardForGame = document.querySelectorAll('.cardForGame .numberOfCard');
        
        for(let y = 0; y < allCardForGame.length; y++){

            allCardForGame[y].innerHTML = Math.abs(y-allCardForGame.length);
        }
        // Таймер
        let timer;
        let x =countOfWords * level;

        countdown(); 
        function countdown(){ 
            x--;
            seconds = x%60;
            minutes = x/60%60
            document.querySelectorAll('.timer').forEach(item=>{
                item.innerHTML = `Осталось времени ${Math.trunc(minutes)}мин ${seconds}сек`;
            })
            if (x<=0){
                clearTimeout(timer);
                getResultGame(((counter/(interval-countOptionWords))*100).toFixed(2), arrOfCardGame)
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
                function checkAnswer(checkBG, rightOpacity, checkOpacity){
                    check.style.background = checkBG
                    rightAnswer.style.opacity = rightOpacity
                    setTimeout(()=>{
                        check.style.opacity = checkOpacity;
                    }, 100)
                }
                if(this.innerText.toLowerCase() !== 'закончить тестирование'){
                    if(find.querySelector('input[type="text"]').value.length !==0){
                        if(rightAnswer.innerText.indexOf(find.querySelector('input[type="text"]').value.toLowerCase()) !== -1){
                            counter++;
                            getYourAnswers(find.querySelector('input[type="text"]').value,rightAnswer.innerText,true)
                            checkAnswer('','1','1')
                        }else{
                            getYourAnswers(find.querySelector('input[type="text"]').value,rightAnswer.innerText,false)
                            checkAnswer('url(./img/false.png) no-repeat center','1','1')
                        }
                        --countOfCards;
                        if(countOfCards <= 1){
                            find.previousElementSibling.querySelector('.nextCard').innerText="Закончить тестирование"
                            setTimeout(()=>{
                                find.previousElementSibling.style.left = "50%"
                                find.style.setProperty("left", "200%", "important");
                                
                            }, 500)
                            
                        }else{
                            setTimeout(()=>{
                                find.previousElementSibling.style.left = "50%"
                                find.style.setProperty("left", "200%", "important");
                            }, 500)
                        }
                    }else{
                        return
                    }
                }else{
                    if(rightAnswer.innerText.indexOf(find.querySelector('input[type="text"]').value.toLowerCase()) !== -1){
                        counter++;
                        getYourAnswers(find.querySelector('input[type="text"]').value,rightAnswer.innerText,true);
                        checkAnswer('','1','1')
                    }else{
                        getYourAnswers(find.querySelector('input[type="text"]').value,rightAnswer.innerText,false);
                        checkAnswer('url(./img/false.png) no-repeat center','1','1')
                    }
                    clearTimeout(timer);
                    getResultGame(((counter/(interval-countOptionWords))*100).toFixed(2))

                }


            })
        })

    }


  
}
function closeGame(){
    document.querySelector('.closeGame').addEventListener('click', function(){
        allCardContent.style.cssText = `
        flex-direction: ;
        margin: ;
        align-items: ;
    `
        allCardContent.innerText=''
        allCardContent.classList.remove('show_Cards')
    })
}
// Шаблон карточек для игры
class CardForGame{
    constructor(countOfCards, allCards, cardEnglish, cardRussian, parent){
        this.countOfCards = countOfCards;
        this.allCards     = allCards;
        this.cardEnglish  = cardEnglish;
        this.cardRussian  = cardRussian;
        this.parent       =  document.querySelector(parent);
    }
    render(){
        const game = document.createElement('div');
        game.classList.add('cardForGame');
        game.innerHTML = `
        <p class="timer"></p>
        <p class="countOfCard">Карта №<span class="numberOfCard"></span>/${this.allCards}</p>
        <h2 class="englishWord">${this.cardEnglish}</h2>
        <span class="input">
            <input type="text" placeholder="Write your answer">
            <span></span>	
	    </span>
        <h2  class="rightAnswer">${this.cardRussian}</h2>
        <div class="checkTrueOrFalse"></div>
        <button class="nextCard">Следующая карта</button>
        `;
        this.parent.append(game)
    }
}

class cardForResult{
    constructor(count, yourAnswer, rightAnswer, trueOrfalse, parent){
        this.count       = count
        this.yourAnswer  = yourAnswer;
        this.rightAnswer = rightAnswer;
        this.trueOrfalse = trueOrfalse
        this.parent      = document.querySelector(parent)
    }
    render(){
        const answers = document.createElement('div');
        answers.classList.add('yourAnswer');
        answers.innerHTML = `
            <p class="countAnswer">${this.count}</p>
            <p class="asnswer">${this.yourAnswer}</p>
            <p class="yourRightAnswer">${this.rightAnswer}</p>
            <div><img src=${this.trueOrfalse}></div>
            
        `;
        this.parent.append(answers)
    }
}
// Game


// homePage
function animateHomePage(){
    const startValue = Math.floor(Math.random() * allWordsInBase.length) -3 < 0 ? 0 : Math.floor(Math.random() * allWordsInBase.length)- 3,
          stopValue  = startValue+3;
    for(let i = startValue; i < stopValue; i++){
        let rend = new CardForHomePage(allWordsInBase[i].english, allWordsInBase[i].russian, '.showFunction');
        rend.render()
    }
    showCard()
}
function showCard(){
  const allCards =  document.querySelectorAll('.cardHome');
  let counter = 0;
  let animateCards = setInterval(()=>{
    if(counter >= 3){
        clearInterval(animateCards)
    }else{
        let wrapper = allCards[counter].querySelector(".font_answer");
        let text = wrapper.querySelector("p");
        let textCont = text.textContent;
        text.style.display = "none";
        allCards[counter].classList.add('showCard') 
        function animateText(){
            for (let y = 0; y < textCont.length; y++) {
                (function(y) {
                  setTimeout(function() {
                    let texts = document.createTextNode(textCont[y])
                    let span = document.createElement('span');
                    span.appendChild(texts);
                    span.classList.add("wave");
                    wrapper.appendChild(span);
              
                  }, 75 * y);
                }(y));
            }
            setTimeout(clickBtn, 600)
        }

        function clickBtn(){
            allCards[counter].querySelector('.font_button').classList.add('font_button-click');
            setTimeout(rotateCard, 200)
        }
        function rotateCard(){
                allCards[counter].style.cssText = `
                -webkit-transform: rotateY(180deg);
                -moz-transform: rotateY(180deg);
                -ms-transform: rotateY(180deg);
                transform: rotateY(180deg);
            `;
            counter++;
        }
        setTimeout(animateText, 1000)
    }
  }, 2000)
}
setTimeout(()=>{
    animateHomePage()
},500)


class CardForHomePage{
    constructor(english, russian, parent){
        this.russian = russian;
        this.english = english;
        this.parent  = document.querySelector(parent);
    };
    render(){
        const cardHome = document.createElement('div');
        cardHome.classList.add('cardHome');
        cardHome.classList.add('hide_card');
        cardHome.innerHTML = `
            <div class="cardHome_inner">
                <div class="cardHome_inner-font">
                    <div class="font_title">${this.russian}</div>
                    <div class="font_answer"><p>${this.english}</p></div>
                    <button class="font_button">Проверить ответ</button>
                </div>
                <div class="cardHome_inner-back">
                    <div class="font_title">${this.russian}</div>
                    <div class="back_rightAnswer">${this.english}</div>
                    <div class="back_right">
                        <span class="back_right-text">Это правильный ответ</span>
                        <div class="back_right-img"></div>
                    </div>

                </div>
            </div>
        `;
        this.parent.append(cardHome)
    }
}
// homePage