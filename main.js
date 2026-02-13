const cardContents = document.querySelectorAll(".card-content");
const remainingPairsDisplay = document.getElementById("remaining-display");
const reshuffleButton = document.getElementById("reshuffle");
const cards = document.querySelectorAll(".card");
let wrongAnswerTimeout;
let remainingPairs = cards.length / 2;
let firstSelection;
let secondSelection;
let firstSelectionChild;
let secondSelectionChild;

let isPaused = false;

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

				if (secondSelectionChild.innerText === firstSelectionChild.innerText) {
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
	remainingPairsDisplay.innerText = `Remaining Pairs = ${remainingPairs}`;
}
