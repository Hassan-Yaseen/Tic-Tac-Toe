let boxes=document.querySelectorAll(".box");
let resetButton=document.querySelector("#reset-btn");
let msg=document.querySelector("#msg");
let turn1=document.querySelector("#turn");


let turn=true;
let count=0;
const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
]
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turn){
            box.classList.add("turnOn");
            box.innerText="O";
            turn1.innerText="X Turn!";
            turn=false;
            count++;
        }
        else{
            box.classList.add("turnOff");
            box.innerText="X";
            turn1.innerText="O Turn!";
            turn=true;
            count++;
        }
        box.disabled=true;
        checkWinner();
        if(count==9 && !checkWinner()){
            turn1.innerText="";
            msg.innerText="Game is Draw!"
        }
    });
});


const checkWinner=()=>{
    for(let pattern of winPatterns){
        let val1=boxes[pattern[0]].innerText;
        let val2=boxes[pattern[1]].innerText;
        let val3=boxes[pattern[2]].innerText;

        if(val1!="" && val2!="" && val3!=""){
            if(val1==val2 && val2==val3){
                turn1.innerText="";
                showWinner(val1);
                return true;
            }
        }
    }
}


const showWinner=(winner)=>{
    msg.innerText=`Winner is ${winner}!`;
    disableBoxes();
}

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        msg.innerText="";
        turn1.innerText="O Turn!";
        box.classList.remove("turnOn");
        box.classList.remove("turnOff");
        count=0;
    }
}

const resetGame=()=>{
    turn=true;
    enableBoxes();
}

resetButton.addEventListener("click",resetGame);