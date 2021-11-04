let allWordsInBase,
    yourSaveWords =[]
// Получаем из json все слова
async function getData(){
    const response = await fetch('./db1.json');
    const words    = await response.json();
    return allWordsInBase = words
}
getData().then(allWordsInBase=>{
    return allWordsInBase
})





function getAllElements(startValue,endValue){
    menu.classList.add('menuClosed')
    if(document.querySelectorAll('.flipper').length !== 0){
        document.querySelector('.allCards').innerHTML = '';
    }
    for(let i = startValue; i<endValue; i++){
        for(let y = 0; y< yourSaveWords.length; y++){
        }
        let rend = new Card(allWordsInBase[i].english, allWordsInBase[i].russian, '.allCards')
        rend.render()
    }
    const  btns = document.querySelectorAll('.sendAnswer'),
            addWordOrRepeat = document.querySelectorAll('.addThisWord');
    btns.forEach(btn=>{
        btn.addEventListener('click', checkRightAnswer)
    })
    addWordOrRepeat.forEach(word => {
        word.addEventListener('click', function(){
            if(this.querySelector('span').innerText === 'Добавить в выученные слова'){
                let englishWord = this.parentNode.parentNode.querySelector('.header .word').innerText,
                    russianWord = this.parentNode.querySelector('.russian').innerText
                writeFile(englishWord,russianWord)
                console.log('Добавляем слово в базу');
            }else{
                console.log( this.parentNode.parentNode);
                this.parentNode.parentNode.style.cssText = `
                -webkit-transform: rotateY(0deg);
                -moz-transform: rotateY(0deg);
                -ms-transform: rotateY(0deg);
                transform: rotateY(0deg);
            `
                console.log('Необходимо повторить');
            }
        })
    })
    checkWords()
}

function checkWords(){
    let allCards = document.querySelectorAll('.allCards .container');
    console.log(yourSaveWords);
    for(let i = 0; i < allCards.length; i++){
        for(let y = 0; y < yourSaveWords.length; y++){
            console.log( yourSaveWords[y]);
            if(yourSaveWords[y].english === allCards[i].querySelector('.word').innerText){
                allCards[i].classList.add('NewCLass')
            }
        }
    }

}



class Card{
    constructor(original, translation, parent){
        this.original = original;
        this.translation = translation;
        this.parent = document.querySelector(parent)
    }
    render(){
        const card = document.createElement('div');
        card.classList.add('container');
        card.innerHTML = `
        <div class="flipper">
            <div class="front">
                <div class="header">
                    <h3>English word</h3>
                    <div class="word">${this.original}</div>
                    <div class="answer">
                        <input type="text">
                        <button class="sendAnswer" ></button>
                    </div>
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
function checkRightAnswer(){
    let thisCard = this.parentNode.parentNode.parentNode.parentNode;
    if(this.previousElementSibling.value.length !== 0){
        if(this.previousElementSibling.value.toLowerCase() == thisCard.querySelector('.russian').innerText){
            thisCard.querySelector('.trueFalse span').innerHTML = 'Это правильный ответ';
            thisCard.querySelector('.addThisWord span').innerHTML = 'Добавить в выученные слова';
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
    // setTimeout(()=>{
    //     thisCard.style.cssText = `
    //     -webkit-transform: rotateY(00deg);
    //     -moz-transform: rotateY(00deg);
    //     -ms-transform: rotateY(00deg);
    //     transform: rotateY(00deg);
    // `;
    // this.previousElementSibling.value = '';
    // }, 2000)
    }else{
        return
    }

}


//Menu

const closedMenu = document.querySelector('.closed');
const showMenu   = document.querySelector('.show_menu');
const menu       = document.querySelector('.menu');
const allTrigger = document.querySelectorAll('.menu_inner-item')
showMenu.addEventListener('click', ()=>{
    if(menu.classList.contains('menuClosed')){
        menu.classList.remove('menuClosed')
    }
})
closedMenu.addEventListener('click', ()=>{
    if(!menu.classList.contains('menuClosed')){
        menu.classList.add('menuClosed')
    }

})
function homePage(){
    document.querySelector('.allCards').innerHTML = '';
    menu.classList.add('menuClosed');
}
let showYourWords = false
allTrigger.forEach(trigger=>{
    trigger.addEventListener('click', function(){
        switch (this.getAttribute('data-trigger')) {
            case 'home':
                homePage()
                console.log('Выученные слова')
                break;
            case 'showLearnWords':
                showYourWords = true;
                getYourWords()
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


// Запоминание слова

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
        success: function(response) {
            console.log(this.data);
            $("#ajax-area").html(response);
        }
    });
};


function getYourWords(){
    menu.classList.add('menuClosed')
    fetch('./yourWords.txt')
    .then((response)=>{
        return response.text()
    })
    .then(data=>{
        data = data.replace(/\s/g, '');
        data = data.split(/\s*;\s*/);
        let yourWords = JSON.parse(JSON.stringify(data));
        if(document.querySelectorAll('.flipper').length !== 0){
            document.querySelector('.allCards').innerHTML = '';
        }
        for(let i = 0; i<yourWords.length; i++){
            let a = eval('({obj:[' + yourWords[i] + ']})')
            if(yourWords[i].length !== 0){
                if(showYourWords){
                    let rend = new Card(a.obj[0].english, a.obj[0].russian, '.allCards')
                    rend.render()
                }else{
                    yourSaveWords.push(a.obj[0]);
                    // console.log(a.obj[0]);
                    // console.log(i+1, a.obj[0].english, a.obj[0].russian,);
                }

            }else{
                return
            }

        }
    })
}
getYourWords() 


// Game

function drawGame(){
    menu.classList.add('menuClosed');
    document.querySelector('.allCards').classList.add('show_Cards')
    document.querySelector('.allCards').innerHTML=`
    <div class="option">
    <h2>Добро пожаловать в игру</h2>
    <p>Выбирите параметры игры</p>
        <div class="option_inner">
            Выберите количество слов: <input type="number">
            Выберите уровень сложности: <select>    
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
    document.querySelector('.startThisGame').addEventListener('click', ()=>{
        if(+document.querySelector('.option_inner input[type="number"]').value.length !== 0){
            startGame(+document.querySelector('.option_inner input[type="number"]').value)
        }else{
            console.log('Поле пустое');
        }
        
    })
}

function startGame(countOfWords){
    clearOption()
    for(let i=0; i<countOfWords; i++){
        rend = new CardForGame(allWordsInBase[i].english, allWordsInBase[i].russian, '.allCards');
        rend.render()
        const nextCard = document.querySelectorAll('.nextCard');
        let countOfCards = i+1;
        let counter = 0;
        nextCard.forEach(next =>{
            next.addEventListener('click', function(){
                let find = this.parentNode;
                let check = find.querySelector('.checkTrueOrFalse');
                if(this.innerText !== 'Закончить тестирование'){
                    if(find.querySelector('input[type="text"]').value.length !==0){
                        if(find.querySelector('.rightAnswer').innerText.indexOf(find.querySelector('input[type="text"]').value) !== -1){
                            counter++;
                            console.log(counter);
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
                        countOfCards--;
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
                    if(find.querySelector('.rightAnswer').innerText.indexOf(find.querySelector('input[type="text"]').value) !== -1){
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
                        find.innerHTML= `
                        <p>Вы ответили на ${(counter/(i+1))*100}% из 100%</p>
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
        document.querySelector('.allCards').innerText=''
        document.querySelector('.allCards').classList.remove('show_Cards')
    })
}
function clearOption(){
    document.querySelector('.option').style.opacity = '0';
    setTimeout(()=>{
        document.querySelector('.option').remove()
    }, 600)

}
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
        <h2>${this.cardEnglish}</h2>
        <input type="text" placeholder="Ваш ответ">
        <h2 class="rightAnswer">${this.cardRussian}</h2>
        <div class="checkTrueOrFalse"></div>
        <button class="nextCard">Следующая карта</button>
        `;
        this.parent.append(game)
    }
}