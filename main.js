// display function
var move = false;
document.getElementById('player-move').innerHTML = "PLAYER 1 MOVE : X";

function click_detection() {
    let x = document.querySelectorAll("#box1,#box2,#box3");
    for (let i = 0; i < 9; i++) {
        if (x[i].addEventListener("click", function () {
            let y = x[i];
            y = x[i].firstChild;
            if (y.innerHTML != 'X' && y.innerHTML != 'O') {
                if (move == true) {
                    y.innerHTML = 'O';
                    move = false;
                    winner();
                } else {
                    y.innerHTML = 'X';
                    move = true;
                    winner();
                }
                if (move == false) {
                    document.getElementById('player-move').innerHTML = "PLAYER 1 MOVE : X";
                } else {
                    document.getElementById('player-move').innerHTML = "PLAYER 2 MOVE : O";
                }
            }
        }));
    }
}

function reset() {
    document.querySelector(".reset-btn").addEventListener("click", function () {
        let x = document.querySelectorAll("#box-text");
        for (let i = 0; i < 9; i++) {
            move = false;
            x[i].innerHTML = "";
        }
        document.getElementById('player-move').innerHTML = "PLAYER 1 MOVE";
    });
}

//check winner
function winner() {
    let x = document.querySelectorAll("#box-text");
    let idx = 0;
    //convert the elements in 2d array
    let arr = [['', '', ''], ['', '', ''], ['', '', '']];

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            arr[i][j] = x[idx].innerHTML.toString();
            idx++;
        }
    }

    //assential variables
    let player;
    let rows = true;
    let cols = true;
    let isWinner = false;
    //check rows
    for (let i = 0; i < 3; i++) {
        rows = true;
        for (let j = 1; j < 3; j++) {
            player = arr[i][j];
            if (arr[i][j] == arr[i][j - 1] && arr[i][j] != "") {
                continue;
            }
            rows = false;
            break;
        }
        if (rows == true) break;
    }
    //check cols
    for (let i = 0; i < 3 && rows == false; i++) {
        cols = true;
        for (let j = 1; j < 3; j++) {
            player = arr[j][i];
            if (arr[j][i] == arr[j - 1][i] && arr[j][i] != "") {
                continue;
            }
            cols = false;
            break;
        }
        if (cols == true) break;
    }

    //checing for first diagonal
    if (arr[0][0] == arr[1][1] && arr[1][1] == arr[2][2] && arr[0][0] != '') {
        isWinner = true;
        player = arr[0][0] == 'X' ? 'X' : 'Y';
    }

    //checing for second diagonal
    if (arr[0][2] == arr[1][1] && arr[1][1] == arr[2][0] && arr[1][1] != '') {
        isWinner = true;
        player = arr[1][1] == 'X' ? 'X' : 'Y';
    }

    if (cols === true || rows === true || isWinner == true) {
        isWinner = true;
        if (player == 'X') {
            alert("Player1 Win");
        } else {
            alert("Player2 Win");
        }

        //clear board after winning

        let x = document.querySelectorAll("#box-text");
        for (let i = 0; i < 9; i++) {
            move = false;
            x[i].innerHTML = "";
        }
    }

    //check for draw
    let count = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (arr[i][j] == 'O' || arr[i][j] == 'X') count++;
        }
    }
    if (count == 9 && isWinner == false) {
        //clear board after winning
        let x = document.querySelectorAll("#box-text");
        for (let i = 0; i < 9; i++) {
            move = false;
            x[i].innerHTML = "";
        }
        alert("Draw");
    }


}

reset();
click_detection();



