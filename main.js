const cardContents = document.querySelectorAll(".card-content");
const remainingPairsDisplay = document.getElementById("remaining-display");
const reshuffleButton = document.getElementById("reshuffleButton");
const cards = document.querySelectorAll(".card");
const gameContainer = document.getElementById("container");
const playground = document.getElementById("playground");
const startButton = document.getElementById("startButton");
const endButton = document.getElementById("endGameButton");
const gameName = document.getElementById("gameName");
const playAgainButton = document.getElementById("playAgainButton");

let wrongAnswerTimeout;
let remainingPairs = cards.length / 2;
let firstSelection;
let secondSelection;
let firstSelectionChild;
let secondSelectionChild;

let isPaused = false;

startButton.addEventListener("click", () => {
	startButton.style.display = "none";
	gameName.style.display = "none";
	gameContainer.style.display = "flex";

	shuffle();
});

endButton.addEventListener("click", () => {
	startButton.style.display = "flex";
	gameName.style.display = "flex";
	gameContainer.style.display = "none";
	reshuffle();
});

playAgainButton.addEventListener("click", () => {
	playAgainButton.style.display = "none";
	playground.style.display = "grid";
	endButton.style.display = "inline";
	reshuffleButton.style.display = "inline";

	reshuffle();
});

const pairs = [
	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",

	"A",
	"B",
	"C",
	"D",
	"E",
	"F",
	"G",
	"H",
];

reshuffleButton.addEventListener("click", reshuffle);

function shuffle() {
	renderRemainingPairs();
	let pairsCopy = structuredClone(pairs);

	cardContents.forEach((card) => {
		let randomIndex = Math.floor(Math.random() * pairsCopy.length);
		let randomPairSelection = pairsCopy[randomIndex];
		card.innerText = randomPairSelection;

		if (randomIndex > -1) pairsCopy.splice(randomIndex, 1);
		card.classList.add("hidden");
	});
}

function reshuffle() {
	remainingPairs = cards.length / 2;
	remainingPairsDisplay.innerText = ``;
	shuffle();
	resetSelections();
	unflipAllCards();
}

cards.forEach((card) => {
	card.addEventListener("click", () => {
		if (!card.classList.contains("solved") && !isPaused) {
			if (!firstSelection) {
				card.classList.add("flipped");
				firstSelection = card;
				firstSelectionChild = card.children[0];
				firstSelectionChild.classList.remove("hidden");
			} else {
				isPaused = true;

				secondSelection = card;
				secondSelectionChild = secondSelection.children[0];

				if (
					secondSelectionChild.innerText === firstSelectionChild.innerText &&
					firstSelection !== secondSelection
				) {
					firstSelection.classList.add("solved");
					secondSelection.classList.add("solved");

					remainingPairs--;
					renderRemainingPairs();
					secondSelectionChild.classList.remove("hidden");
					secondSelection.classList.add("flipped");
					resetSelections();
					isPaused = false;
				} else {
					secondSelectionChild.classList.remove("hidden");
					secondSelection.classList.add("flipped");

					wrongAnswerTimeout = setTimeout(() => {
						firstSelection.classList.remove("flipped");
						secondSelection.classList.remove("flipped");
						firstSelectionChild.classList.add("hidden");
						secondSelectionChild.classList.add("hidden");
						resetSelections();
						isPaused = false;
					}, 500);
				}
			}
		}
	});
});

function resetSelections() {
	firstSelection = null;
	secondSelection = null;
	clearTimeout(wrongAnswerTimeout);
}

function unflipAllCards() {
	cards.forEach((card) => {
		card.classList.remove("flipped");
		card.classList.remove("solved");
	});
}

function renderRemainingPairs() {
	if (remainingPairs)
		remainingPairsDisplay.innerHTML = `Remaining Pairs = ${remainingPairs}`;
	else {
		remainingPairsDisplay.innerHTML = `<span class="solved-text">You Won! Congratulations!</span>`;
		playAgainButton.style.display = "inline";
		playground.style.display = "none";
		endButton.style.display = "none";
		reshuffleButton.style.display = "none";
	}
}
