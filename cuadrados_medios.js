const semilla = document.getElementById('input_semilla');
const button = document.getElementById('button');

button.addEventListener("click", generate);

function generate() {
    const result = document.createElement('p');
    result.textContent = semilla.value;
    document.body.appendChild(result);
}

function getMeanSquares(int) {

}