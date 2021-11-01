function getAllElements(startValue,endValue){
    menu.classList.add('menuClosed')
    fetch('./db1.json')
    .then((response)=>{
        return response.json()
    })
    .then((data)=>{
        if(document.querySelectorAll('.flipper').length !== 0){
            document.querySelector('.allCards').innerHTML = '';
        }
        for(let i = startValue; i<endValue; i++){
            let rend = new Card(data[i].english, data[i].russian, '.allCards')
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
    });
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
        if(this.previousElementSibling.value == thisCard.querySelector('.russian').innerText){
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
                getAllElements((parseInt(this.getAttribute('data-trigger'))-100),parseInt(this.getAttribute('data-trigger')))
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
                console.log(i+1);
                if(showYourWords){
                    let rend = new Card(a.obj[0].english, a.obj[0].russian, '.allCards')
                    rend.render()
                }else{
                    console.log(a.obj[0].english, a.obj[0].russian,);
                }

            }else{
                return
            }

        }
    })
}
getYourWords()
