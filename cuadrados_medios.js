const semilla = document.getElementById('input_seed');
const meanSquares = document.getElementById('input_mean_squares');
const button = document.getElementById('button');
const randomList = document.getElementById('random_list');
const quantity = document.getElementById('quantity');
const MIN_SEED_LENGTH = 2;

button.addEventListener("click", cuadradosMedios);

function cuadradosMedios() {
    let seed = Number(semilla.value);
    let squares = Number(meanSquares.value);
    if (`${seed}`.length >= MIN_SEED_LENGTH)  {
        if (squares <= `${seed*seed}`.length) {
            randomList.innerHTML = '';
            let seedReference = seed;
            let period_list = [];
            let i = 0;
            while (`${seedReference*seedReference}`.length >= squares) {
                let meanSquares = getMeanSquares(seedReference, squares);
                if (period_list.length !== 0) {
                    if (period_list.includes(meanSquares)) {
                        break;
                    }
                }
                if (meanSquares !== 0) {
                    period_list.push(meanSquares);
                    let newRandom = meanSquares / Math.pow(10, squares);
                    showNewRandom(i, seedReference, meanSquares, newRandom);
                    seedReference = meanSquares;
                    i++;
                } else {
                    break;
                }
            }
            quantity.innerHTML = '<strong>Pseudoaleatorios generados: ' + i + '</strong>';
        } else {
            window.alert('La cantidad de cuadrados medios es muy grande');
        }
    } else {
        window.alert(`El numero ingresado tiene menos de ${MIN_SEED_LENGTH} digitos`);
    }
}

function getMeanSquares(seed, squares) {
    let squaredSeed = seed * seed;
    let squaredSeedLength = `${squaredSeed}`.length;
    if (squares<=squaredSeedLength) {
        if (`${squaredSeed}`.length % 2 != 0) {
            squaredSeed = '0'+squaredSeed;
        }
        squaredSeedLength = `${squaredSeed}`.length;
        let division = Math.floor(squaredSeedLength/2)-Math.floor(squares/2);
        return `${squaredSeed}`.substr(division, squares);
    } else {
        return 0;
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