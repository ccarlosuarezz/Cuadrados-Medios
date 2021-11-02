const semilla = document.getElementById('input_seed');
const button = document.getElementById('button');
const randomList = document.getElementById('random_list');
const MIN_SEED_LENGTH = 4;

button.addEventListener("click", newPseudoRandomList);

function newPseudoRandomList() {
    let seed = semilla.value;
    const seedLength = `${seed}`.length;
    if (seedLength >= MIN_SEED_LENGTH)  {
        randomList.innerHTML = '';
        let seedReference = seed;
        let period_list = [];
        let i = 1;
        while (`${seedReference}`.length >= MIN_SEED_LENGTH && i <= 1000) {
            let meanSquares = getMeanSquares(seedReference, seedLength);
            if (period_list.length !== 0) {
                if (period_list.includes(meanSquares)) {
                    break;
                }
            }
            period_list.push(meanSquares);
            let newRandom = meanSquares / Math.pow(10, seedLength);
            showNewRandom(i+' - '+newRandom);
            seedReference = parseInt(meanSquares);
            i++;
        }
    } else {
        window.alert('El numero ingresado tiene menos de 4 digitos');
    }
}

function showNewRandom(newRandom) {
    const result = document.createElement('p');
    result.textContent = newRandom;
    randomList.appendChild(result);
}

function getMeanSquares(seed, seedLength) {
    let squaredSeed = seed * seed;
    let squaredSeedLength = `${squaredSeed}`.length;
    let division = Math.round(squaredSeedLength/4);
    return `${squaredSeed}`.substr(division, seedLength);
}