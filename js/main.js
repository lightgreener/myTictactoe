console.log('It is a good day');

$(document).ready(function(){
    // set two symbol
    // const circle = 'O';
    // const cross = "X";

    // // set two arrays, one is to store
    // // another is to show info
    // let model = [];   // 1 is cross, 2 is circle, 0 is available
    // let cells = [];    // td

    // // check turns
    // let flag = 1 ;

    // //initialize arrays
    // for (let i = 0; i < 3; i++) {
    //    model[i] = [];
    //    cells[i] = [];
    // }
    // // console.log(model);


    // // new game, set up 0 for everything
    // const newGame = function () {
    //     for (let i = 0; i < 3; i++) {
    //         for (let j =0; j < 3; j++) {
    //             model[i][j] = 0;
    //             cells[i][j].innerHTML = 'available';   // 可能是空格， 没有空格
    //         }
    //      flag = 1;
    //     }
    // }

    // console.log(model);
    // console.log(cells);
    // console.log(flag);

    // // fresh function
    // const refresh = function (){
    //     let i,j;
    //     for(i =0; i< 3; i++){
    //         for(j =0; j<3; j++){
    //             if(model[i][j] ===1){
    //                 cells[i][j].text = cross;
    //             }else if (model[i][j] ===2) {
    //                 cells[i][j].text = circle;
    //             }
    //         }
    //     }
    // }

    // // check winning situation
    // const checkWin = function(x, y){
    //     //row
    //     if(model[x][y] !=0 && model[0][y] === model[1][y] && model[0][y] === model[2][y]) {
    //         return 1
    //     }
    //     //column
    //     if(model[x][y] !=0 && model[x][0] === model[x][1] && model[x][0] === model[x][2]) {
    //         return 1;
    //     }
    //     //   /
    //     if(model[0][0] !=0 && model[0][0] === model[1][1] && model[0][0] === model[2][2]) {
    //         return 1;
    //     }
    //     //   \
    //     // if(model[x][y] !=0 && model[x][y] === model[1][1] && model[x][y] === model[y][x]) {
    //     //     return 1;
    //     // }
    //     if ((x===2 && y===0)||(x===0&&y===2)||(x===1 && y===1)){
    //         if(model[x][y] !=0 && model[x][0] === model[x][1] && model[x][0] === model[x][2]) {
    //             return 1;
    //         }
    //     }
    //     return 0;
    // }

    // newGame();



//     let occupiedList = document.querySelectorAll('occupied');
//     for (let i =0; i< occupiedList.length; i++){
//         const element = occupiedList[i];
//         element.addEventListener('click', function(e){
//             e.preventDefault();
//         });
//     }

//     // const clickAction = function (e){
//     //     if ( flag % 2 === 0){
//     //         e.target.style.backgroundImage= "url('img/redCross4.png')"
//     //     } else{
//     //     e.target.style.backgroundImage= "url('img/circle2.png')"
//     //     }
//     //     e.target.setAttribute('class','occupied');
//     //     e.stopPropagation();
//     //     flag + 1;
//     // }


// let tableELement = document.querySelector('table');

// // it is my question?
// // tableELement.addEventListener('click',clickAction);

// tableELement.addEventListener('click',function(e){
//     // first tried to remove this event   fail
//     // e.target.removeEventListener('click', MouseEvent);
//     //second tried to add stop default  fail
//     // e.target.addEventListener('click', function(e){
//         //     e.preventDefault();
//         // })


//         e.target.style.backgroundImage= "url('img/redCross4.png')"
//         // e.target.innerHTML = cross;

//         e.target.setAttribute('class','occupied');
//         e.stopPropagation();
//         console.log(e.target);
//         console.log(e.target.id);  // 2-1
//         const firstNumber = Number(e.target.id.split('-')[0]);
//         const lastNumber = Number(e.target.id.split('-')[1]);
//         //  it doesnot work
//         // e.target.addEventListener('click', function(e){
//             //     e.preventDefault();
//             // })            
//             // js set value
//             // e.target.innerHTML="1";
//             //check winner
//             const result = checkWin(firstNumber,lastNumber);
//             console.log(result);

//             // question ,why it does not work
//             e.target.preventDefault();

//     })


    const redcross = "url('img/redCross4.png')";
    const round = "url('img/circle8.png')";
    let roundArray = [];
    let crossArray = [];
    let count = 1;
    const winCombination = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    let occupiedList = document.querySelectorAll('.occupied');
    function checkOccupy () {
        for (let i = 0; i < occupiedList.length; i++) {
            const element = occupiedList[i];
            element.addEventListener('click', function(e){
                e.preventDefault();
            })
        }
    }

    let tdList = document.querySelectorAll('td');
    startGame();

    function startGame() {
        $('.finish').hide();
        for (let i = 0; i < tdList.length; i++) {
            const element = tdList[i];
            element.setAttribute('class','available');
            element.style.backgroundImage = '';
            // element.style.removeProperty('background-Color');
            element.addEventListener('click', clickAction);
        }
        count = 1;
    }

    // solve replay problem
    $('.gameButton').on('click',startGame);

    function clickAction () {

         checkOccupy();

        if (count % 2 ===0) {
            this.style.backgroundImage= redcross;
            crossArray.push(this.id);
        } else {
            this.style.backgroundImage= round;
            roundArray.push(this.id);
        }
        count++;
        this.setAttribute('class','occupied');
        // e.stopPropagation();
        console.log(this);
        console.log(this.id);  //
        // const firstNumber = Number(this.id.split('-')[0]);
        // const lastNumber = Number(this.id.split('-')[1]);

        checkWin(crossArray);
        checkWin(roundArray);
    }

    function checkWin (array=[]) {
        // if( winCombination.includes(array)){
        //     alert('winner');
        // }

        for (let x = 0; x < winCombination.length; x++) {
            const element = winCombination[x];
            if(element.sort().toString() === array.sort().toString()) {

                document.querySelector('.finish').style.display='block';
                document.querySelector('.finish').innerText ='winner';
                break;
            }
        }
    }


    // function turn (id, player){
    //     document.getElementById("id").style.backgroundImage= player;
    // }

})
