const semilla = document.getElementById('input_seed');
const button = document.getElementById('button');
const randomList = document.getElementById('random_list');
const quantity = document.getElementById('quantity');
const MIN_SEED_LENGTH = 3;

button.addEventListener("click", newPseudoRandomList);

function newPseudoRandomList() {
    let seed = semilla.value;
    const SEED_LENGTH = `${seed}`.length;
    if (SEED_LENGTH >= MIN_SEED_LENGTH)  {
        randomList.innerHTML = '';
        let seedReference = seed;
        let period_list = [];
        let i = 0;
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
                showNewRandom(i, seedReference, meanSquares, newRandom);
                seedReference = parseInt(meanSquares);
                i++;
            } else {
                break;
            }
        }
        quantity.innerHTML = '<strong>Pseudoaleatorios generados: ' + i + '</strong>';
    } else {
        window.alert('El numero ingresado tiene menos de 4 digitos');
    }
}

function showNewRandom(consecutive, seedReference, meanSquare, newRandom) {
    const newRow = document.createElement('tr');
    const consec = document.createElement('td');
    const actualSeed = document.createElement('td');
    const squaredSeed = document.createElement('td');
    const newRand = document.createElement('td');
    consec.textContent = consecutive;
    actualSeed.textContent = seedReference;
    let sqrSeed = ''+seedReference*seedReference;
    let partOne = sqrSeed.substr(0, sqrSeed.indexOf(meanSquare));
    let partTwo = sqrSeed.substr(sqrSeed.indexOf(meanSquare)+(meanSquare.length));
    squaredSeed.innerHTML = `<p>${partOne}<strong><u>${meanSquare}</u></strong>${partTwo}</p>`;
    newRand.textContent = newRandom;
    newRow.appendChild(consec);
    newRow.appendChild(actualSeed);
    newRow.appendChild(squaredSeed);
    newRow.appendChild(newRand);
    randomList.appendChild(newRow);
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