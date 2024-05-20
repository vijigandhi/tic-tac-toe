document.addEventListener("DOMContentLoaded", () => {
    let cells = document.querySelectorAll(".cell");
    let restartBtn = document.getElementById("restart-btn");
    let modal = document.getElementById("modal");
    let modalText = document.getElementById("modal-text");
    let closeModal = document.getElementById("close-modal");
    let audio = document.getElementById('myAudio');
    let winnerAudio = document.getElementById('winner_audio');
    let draw = document.getElementById('draw');

    let board = ["", "", "", "", "", "", "", "", ""];
    let currentPlayer = "X";
    let gameActive = true;

    let winningConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    restartBtn.addEventListener("click", restartGame);
    closeModal.addEventListener("click", () => modal.style.display = "none");

    function handleCellClick(event) {
        let clickedCell = event.target;
        let clickedCellIndex = +clickedCell.dataset.index;

        if (board[clickedCellIndex] || !gameActive) return;

        board[clickedCellIndex] = currentPlayer;
        clickedCell.innerHTML = `<span>${currentPlayer}</span>`;
        clickedCell.classList.add("clicked");

        audio.currentTime=0;
        audio.play();

        if (checkWinner()) {
            gameActive = false;
            showModal(`Player ${currentPlayer === "X" ? "1" : "2"} Wins!`);
            winnerAudio.play();
            addSprinkles()
        } else if (!board.includes("")) {
            gameActive = false;
            showModal("It's a Draw!");
            draw.play();
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWinner() {
        for (let i = 0; i < winningConditions.length; i++) {
            let condition = winningConditions[i];
            let a = board[condition[0]];
            let b = board[condition[1]];
            let c = board[condition[2]];

            if (a && a === b && a === c) {
                return true;
            }
        }
        return false;
    }

    function addSprinkles() {
        let colors = ["#ffcc00", "#ff6699", "#66ccff", "#99ff99"];
        let shapes = ["circle", "square", "triangle"];

        let numSprinkles = 50;
        for (let i = 0; i < numSprinkles; i++) {
            let color = colors[Math.floor(Math.random() * colors.length)];
            let shape = shapes[Math.floor(Math.random() * shapes.length)];
            let sprinkles = document.createElement("div");
            sprinkles.classList.add("sprinkles");
            sprinkles.style.backgroundColor = color;
            sprinkles.style.borderRadius = shape === "circle" ? "50%" : shape === "triangle" ? "100% 100% 0 0" : "0";
            sprinkles.style.left = Math.random() * 100 + "%";
            sprinkles.style.top = Math.random() * 100 + "%";
            document.body.appendChild(sprinkles); 
            setTimeout(() => {
                sprinkles.remove();
            }, Math.random() * 1000);
        }
    }

    function showModal(message) {
        modalText.textContent = message;
        modal.style.display = "block";
        addSprinkles(); 
    }

    function restartGame() {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        cells.forEach(cell => {
            cell.innerHTML = "<span></span>";
            cell.classList.remove("clicked");
        });
        modal.style.display = "none";
    }
});
