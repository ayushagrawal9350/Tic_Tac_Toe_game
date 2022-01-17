let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let turn = "X";
let isgameOver = false;
let count =0;

let changeTurn = ()=>{
    return turn === "X"?"0" : "X";
}

let checkWin = ()=>{
    let wins = [
        [0,1,2,5,5,0],
        [3,4,5,5,15,0],
        [6,7,8,5,25,0],
        [0,3,6,-5,15,90],
        [1,4,7,5,15,90],
        [2,5,8,15,15,90],
        [0,4,8,5,15,45],
        [2,4,6,5,15,135],
    ];
    let boxtexts = document.getElementsByClassName('boxtext');
    wins.forEach((e)=>{
        if((boxtexts[e[0]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[2]].innerText === boxtexts[e[1]].innerText) && (boxtexts[e[0]].innerText != ""))
        {
            document.getElementsByClassName('Info')[0].innerText = boxtexts[e[0]].innerText + " WON";
            isgameOver = true;
            gameOver.play();
            music.pause();
            document.getElementById('ImgBox').getElementsByTagName('img')[0].style.width = "10vw";
            document.getElementById('line').style.transform =`translate(${e[3]}vw,${e[4]}vw) rotate(${e[5]}deg)`;
            document.getElementById('line').style.width = "20vw";
        }
    })

}

//Game Logic
music.play();
Array.from(document.getElementsByClassName('box')).forEach((element)=>{
    element.addEventListener('click',()=>{
        let boxtext = element.getElementsByClassName('boxtext')[0];
        if(boxtext.innerText === "")
        {
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if(!isgameOver)
            {
                document.getElementsByClassName('Info')[0].innerText = "Turn for "+ turn;
            }
        }
        if(boxtext.innerText !== "")
        {
            count++;
            if(count == 9 && !isgameOver)
            {
                document.getElementsByClassName('Info')[0].innerText = "Game Drawn";
                gameOver.play();
                music.pause();
            }
        }

    })
})

//Handle Reset Button
document.getElementById('reset').addEventListener('click',()=>{
    Array.from(document.getElementsByClassName('boxtext')).forEach((element)=>{
        element.innerText = "";
        document.getElementById('ImgBox').getElementsByTagName('img')[0].style.width = "0vw";
        document.getElementsByClassName('Info')[0].innerText = "Turn for X";
        isgameOver = false;
        document.getElementById('line').style.width = "0vw";
        music.play();
        count = 0;
    })
})
