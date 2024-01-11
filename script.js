//ACCESSING GAME DISPLAY SECTIONS AND PLAY BUTTONS AND SCORE
const initialDisplay = document.getElementById("initialDisplay")
const gameBox = document.getElementById("gameBox")
const displayFinalScore = document.getElementById("display-final-score")
const playBtn = document.getElementById("play-button")
const playAgainBtn = document.getElementById("play-again-button")
const finalScore = document.getElementById("final-score")

//ADDING CLICK EVENT LISTENERS TO PLAY AND PLAY AGAIN BUTTONS
playBtn.addEventListener("click",()=>{
    initialDisplay.style.display = "none"
    gameBox.style.display = "block"
    generateAims()
    startTimer()
    checkHit()
})

playAgainBtn.addEventListener("click",function(){
    displayFinalScore.style.display = "none"
    gameBox.style.display = "block"
    totalScore = 0
    currentScore.textContent = totalScore 
    finalScore.textContent = totalScore
    generateAims()
    startTimer()
    checkHit()
})

//ACCESS DIFFERENT ELEMTNS TO DISPLAY HIT,SOCRE,TIMER 
const valueToHit = document.getElementById("hitValue")
const currentScore = document.getElementById("currentScore")
const timer = document.getElementById("timerValue")
const aimsContainer = document.getElementById("aims")

const totalAims = 36
let totalScore = 0
currentScore.textContent = totalScore

const startTimer = ()=>{
    seconds = 20
    let timerInterval = window.setInterval(updateTimer,1000)
    function updateTimer(){
        if(seconds > 0){
            seconds -= 1 
            timer.textContent = seconds
        }else{
            gameBox.style.display = "none"
            displayFinalScore.style.display = "block"
            window.clearInterval(timerInterval)
        }
    }
}

const getNumberToHit = () => {
    //Math.floor(Math.random()*(max-min+1)+min)
    const number = Math.floor(Math.random()*(totalAims-1+1)+1)
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
    //REMOVING OLD AIMS FROM THE AIM CONTAINER
    while(aimsContainer.hasChildNodes()){
        aimsContainer.removeChild(aimsContainer.firstChild)
    }
    //THEN AGAIN ADD AIMS IN THE AIM CONTAINER RANDOMLY
    const aimNumbers = getAimNumbers()
    for(let i=0;i< totalAims;i++){
        const randomIndex = Math.floor(Math.random() * aimNumbers.length)
        const number = aimNumbers[randomIndex]
        aimNumbers.splice(randomIndex,1)

        const aim = document.createElement("p")
        aim.classList.add("aim")
        aim.textContent = number

        aimsContainer.appendChild(aim)
    }
}

const checkHit = () =>{
    const numberToHit = getNumberToHit()
    aimsContainer.addEventListener("click",(e)=>{
        const clickedNumber = parseInt(e.target.textContent)
        if(numberToHit === clickedNumber){
            totalScore+=1
            currentScore.textContent = totalScore
            finalScore.textContent = totalScore
            generateAims()
            checkHit()
        }
    })
}


