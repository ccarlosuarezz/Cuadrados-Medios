const semilla = document.getElementById('input_seed');
const button = document.getElementById('button');
const MIN_SEED_LENGTH = 4;

button.addEventListener("click", generate);

function generate() {
    const result = document.createElement('p');
    result.textContent = newRandomNumber(semilla.value);
    document.body.appendChild(result);
}

function newRandomNumber(seed) {
    const seedLength = `${seed}`.length;
    if (seedLength >= MIN_SEED_LENGTH)  {
        let meanSquares = getMeanSquares(seed, seedLength);
        return meanSquares / Math.pow(10, seedLength);
    } else {
        window.alert('El numero ingresado tiene menos de 4 digitos');
    }
}

function getMeanSquares(seed, seedLength) {
    let squaredSeed = seed * seed;
    let squaredSeedLength = `${squaredSeed}`.length;
    let division = Math.round(squaredSeedLength/4);
    return `${squaredSeed}`.substr(division, seedLength);
}