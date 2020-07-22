//HTML Elements

const statusDiv = document.querySelector('.status');
const resetDiv = document.querySelector('.reset');
const cellDivs = document.querySelectorAll('.game-cell');


//game constants
const xSymbol = '×';
const oSymbol = '○';


//game variables
let gameislive = true;
let xisnext=true;
let winner = null;


//functions
const lettertosymbol = (letter) => letter === 'x' ? xSymbol:oSymbol;


const handlewin =(letter) =>{
    gameislive=false;
    winner=letter;
    if(winner ==='x'){ 
        statusDiv.innerHTML=`${lettertosymbol(winner)} has won!`;
    }
    else {
        statusDiv.innerHTML = `<span>${lettertosymbol(winner)} has won!</span>`;
    }
}


const checkgamestatus=()=>{
    const topleft = cellDivs[0].classList[1];
    const topmiddle = cellDivs[1].classList[1];
    const topright = cellDivs[2].classList[1];
    const middleleft = cellDivs[3].classList[1];
    const middlemiddle = cellDivs[4].classList[1];
    const middleright = cellDivs[5].classList[1];
    const bottomleft = cellDivs[6].classList[1];
    const bottommiddle = cellDivs[7].classList[1];
    const bottomright = cellDivs[8].classList[1];


    // is there a winner?
    if(topleft && topleft===topmiddle && topleft===topright){
        handlewin(topleft);
        cellDivs[0].classList.add('Won');
        cellDivs[1].classList.add('Won');
        cellDivs[2].classList.add('Won');
    } 
    else if(middleleft && middleleft === middlemiddle && middleleft === middleright){
        handlewin(middleleft);
        cellDivs[3].classList.add('Won');
        cellDivs[4].classList.add('Won');
        cellDivs[5].classList.add('Won');
    }
    else if(bottomleft && bottomleft ===bottommiddle && bottomleft ===bottomright){
        handlewin(bottomleft);
        cellDivs[6].classList.add('Won');
        cellDivs[7].classList.add('Won');
        cellDivs[8].classList.add('Won');
    }
    else if(topleft && topleft ===middleleft && topleft===bottomleft){
        handlewin(topleft);
        cellDivs[0].classList.add('Won');
        cellDivs[3].classList.add('Won');
        cellDivs[6].classList.add('Won');
    }
    else if(topmiddle && topmiddle===middlemiddle && topmiddle===bottommiddle){
        handlewin(topmiddle);
        cellDivs[1].classList.add('Won');
        cellDivs[4].classList.add('Won');
        cellDivs[7].classList.add('Won');
    }
    else if(topright && topright===middleright && topright===bottomright){
        handlewin(topright);
        cellDivs[2].classList.add('Won');
        cellDivs[5].classList.add('Won');
        cellDivs[8].classList.add('Won');
    }
    else if(topleft && topleft===middlemiddle && topleft===bottomright){
        handlewin(topleft);
        cellDivs[0].classList.add('Won');
        cellDivs[4].classList.add('Won');
        cellDivs[8].classList.add('Won');
    }
    else if(topright && topright===middlemiddle && topright===bottomleft){
        handlewin(topright);
        cellDivs[2].classList.add('Won');
        cellDivs[4].classList.add('Won');
        cellDivs[6].classList.add('Won');
    }
    else if(topleft && topmiddle && topright && middlemiddle && middleright && middleleft && bottomleft && bottommiddle && bottomright){
        gameislive=false;
        statusDiv.innerHTML='Game is tied!';
    }
    else{
        xisnext = !xisnext;
        if(xisnext){
            statusDiv.innerHTML = `${xSymbol} is next`;
        }
        else{
            statusDiv.innerHTML = `<span>${oSymbol} is next</span>`;
        }
    }
};


// event handelers
const handleReset = () => {
    xisnext = true;
    gameislive=true;
    statusDiv.innerHTML = `${xSymbol} is next`;
    winner=null;
    for(const cellDiv of cellDivs){
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
        cellDiv.classList.remove('won');
    }
};

const handlecellclick = (e) => {
    const classList = e.target.classList;

    if(!gameislive ||  classList[1] === 'x' || classList[1] === 'o'){
        return;
    }

    if(xisnext){
        e.target.classList.add('x');
        checkgamestatus();
    } else {
        e.target.classList.add('o');
        checkgamestatus();
    }
};



//event listeners
resetDiv.addEventListener('click', handleReset);

for(const cellDiv of cellDivs){
    cellDiv.addEventListener('click', handlecellclick)
}
