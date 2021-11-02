const semilla = document.getElementById('input_seed');
const button = document.getElementById('button');
const randomList = document.getElementById('random_list');
const MIN_SEED_LENGTH = 4;

button.addEventListener("click", newPseudoRandomList);

function newPseudoRandomList() {
    let seed = semilla.value;
    const SEED_LENGTH = `${seed}`.length;
    if (SEED_LENGTH >= MIN_SEED_LENGTH)  {
        randomList.innerHTML = '';
        let seedReference = seed;
        let period_list = [];
        let i = 1;
        while (`${seedReference*seedReference}`.length >= SEED_LENGTH) {
            let meanSquares = getMeanSquares(seedReference, SEED_LENGTH);
            if (period_list.length !== 0) {
                if (period_list.includes(meanSquares)) {
                    break;
                }
            }
            if (parseInt(meanSquares) !== 0) {
                period_list.push(meanSquares);
                let newRandom = meanSquares / Math.pow(10, SEED_LENGTH);
                showNewRandom(i+' - '+newRandom);
                seedReference = parseInt(meanSquares);
                i++;
            } else {
                break;
            }
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

function getMeanSquares(seed, SEED_LENGTH) {
    let squaredSeed = seed * seed;
    if (`${squaredSeed}`.length % 2 != 0) {
        squaredSeed = '0'+squaredSeed;
    }
    let squaredSeedLength = `${squaredSeed}`.length;
    let division = Math.floor(squaredSeedLength/4);
    return `${squaredSeed}`.substr(division, SEED_LENGTH);
}