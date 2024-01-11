const valueToHit = document.getElementById("hitValue")
const score = document.getElementById("scoreValue")
const timer = document.getElementById("timerValue")
const aimsContainer = document.getElementById("aims")
const displayScoreContainer = document.getElementById("displayScore")
const aim = document.getElementsByClassName("aims")

gameStart = false 
gameOver = false 


const totalAims = 36
let totalScore = 0
score.textContent = totalScore

/* const displayScore = ()=>{
    const titlePara = document.createElement("p")
    titlePara.classList.add("display-score-title")
    titlePara.textContent = "Total Score : "

    const scorePara = document.createElement("p");
    scorePara.classList.add("display-score")
    scorePara.textContent = totalScore

    displayScoreContainer.appendChild(titlePara)
    displayScoreContainer.appendChild(scorePara)

} */

const startTimer = ()=>{
    seconds = 60 
    window.setInterval(function(){
        if(seconds > 0){
            seconds -= 1
            timer.textContent = seconds
        }
    },1000)
}

const getNumberToHit = () => {
    const number = Math.floor(Math.random()*totalAims)
    if(number === 0){
        getNumberToHit()
    }
    valueToHit.textContent = number
    return number
}

const getAimNumbers = () =>{
    const aimNumbers = []
    for(let i=1;i<=totalAims;i++){
        aimNumbers.push(i)
    }
    return aimNumbers
}

const generateAims = () =>{
    //first remove old aims from the aim container
    while(aimsContainer.hasChildNodes()){
        aimsContainer.removeChild(aimsContainer.firstChild)
    }

    //then add new aims to the aim container
    //these aims are removed and add to increase the randomness
    const aimNumbers = getAimNumbers()
    for(let i=0;i< totalAims;i++){
        const randomIndex = Math.floor(Math.random() * aimNumbers.length)
        const number = aimNumbers[randomIndex]
        aimNumbers.splice(randomIndex,1)

        const aim = document.createElement("p")
        aim.classList.add("aim")
        aim.textContent = number
        //aim.style.color = ""

        aimsContainer.appendChild(aim)
    }
}

const checkHit = () =>{
    const numberToHit = getNumberToHit()
    aimsContainer.addEventListener("click",(e)=>{
        const clickedNumber = parseInt(e.target.textContent)
        if(numberToHit === clickedNumber){
            totalScore+=1
            score.textContent = totalScore
            generateAims()
            checkHit()
        }
    })
}

generateAims()
startTimer()
checkHit()
