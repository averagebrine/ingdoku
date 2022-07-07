
var brushNum = null;
var tileSelected = null;

var mistakes = 0;

var board =
[
    "--74916-5",
    "2---6-3-9",
    "-----7-1-",
    "-586----4",
    "--3----9-",
    "--62--187",
    "9-4-7---2",
    "67-83----",
    "81--45---"
]

var solution =
[
    "387491625",
    "241568379",
    "569327418",
    "758619234",
    "123784596",
    "496253187",
    "934176852",
    "675832941",
    "812945763"
]

var ingots =
{
    1: "tiles/1",
    2: "tiles/2",
    3: "tiles/3",
    4: "tiles/4",
    5: "tiles/5",
    6: "tiles/6",
    7: "tiles/7",
    8: "tiles/8",
    9: "tiles/9"
}

var version = "1.0.2"

window.onload = function() {
    setGame();
}

function setGame() {
    // Digits 1-9
    for (let i = 1; i <= 9; i++) {
        //<div id="1" class="number">1</div>
        let number = document.createElement("div");
        number.id = i
        number.innerText = i;
        number.style.backgroundImage = "url('./" + ingots[i] + ".png')";
        number.addEventListener("click", selectBrush);
        number.classList.add("digit");
        document.getElementById("digits").appendChild(number);
    }

    // Board 9x9
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                var tileValue = board[r][c];
                tile.innerText = tileValue;
                tile.style.backgroundImage = "url('./" + ingots[board[r][c]] + ".png')";
                tile.classList.add("tile-given");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", tryTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }
    }

    document.getElementById("version").innerText = version;
}

function selectBrush() {
    if (brushNum != null) {
        brushNum.classList.remove("digit-selected");
    }
    brushNum = this;
    brushNum.classList.add("digit-selected");
}

function tryTile() {
    if (brushNum) {
        if (this.innerText != "") {
            return;
        }
    }

    let coords = this.id.split("-");
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == brushNum.id) {
        this.innerText = brushNum.id;
        this.style.backgroundImage = "url('./" + ingots[brushNum.id] + ".png')";
    }
    else {
        mistakes++;
        document.getElementById("mistakes").innerText = mistakes
    }
}