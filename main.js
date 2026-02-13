const cardContents = document.querySelectorAll(".card-content");
const scoreDisplay = document.getElementById("score-display");
const reshuffleButton = document.getElementById("reshuffle");
const cards = document.querySelectorAll(".card");
let wrongAnswerTimeout;
let score = 0;
let firstSelection;
let secondSelection;
let firstSelectionChild;
let secondSelectionChild;
let solvedCards = [];
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

shuffle();

reshuffleButton.addEventListener("click", reshuffle);

function shuffle() {
	let pairsCopy = structuredClone(pairs);

	cardContents.forEach((card) => {
		randomIndex = Math.floor(Math.random() * pairsCopy.length);
		randomPairSelection = pairsCopy[randomIndex];
		card.innerText = randomPairSelection;

		if (randomIndex > -1) pairsCopy.splice(randomIndex, 1);
		card.classList.add("hidden");
	});
}

function reshuffle() {
	score = 0;
	scoreDisplay.innerText = ``;
	shuffle();
	resetSelections();
	unflipAllCards();

	solvedCards = [];
}

cards.forEach((card) => {
	card.addEventListener("click", () => {
		if (
			!solvedCards.includes(card.children[0]) &&
			!card.classList.contains("flipped")
		) {
			if (!firstSelection) {
				card.classList.add("flipped");
				firstSelection = card;
				firstSelectionChild = card.children[0];
				firstSelectionChild.classList.remove("hidden");
			} else {
				secondSelection = card;
				secondSelectionChild = secondSelection.children[0];

				if (secondSelectionChild.innerText === firstSelectionChild.innerText) {
					solvedCards.push(firstSelection);
					solvedCards.push(secondSelection);

					score++;
					renderScore();
					secondSelectionChild.classList.remove("hidden");
					secondSelection.classList.add("flipped");
					resetSelections();
				} else {
					secondSelectionChild.classList.remove("hidden");
					secondSelection.classList.add("flipped");

					wrongAnswerTimeout = setTimeout(() => {
						firstSelection.classList.remove("flipped");
						secondSelection.classList.remove("flipped");
						firstSelectionChild.classList.add("hidden");
						secondSelectionChild.classList.add("hidden");
						resetSelections();
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
	});
}

function renderScore() {
	scoreDisplay.innerText = `Score = ${score}`;
}
