class CalculadoraBasica extends HTMLElement{
    constructor(){
        super();

        const shadowCalculadora = this.attachShadow({mode: 'open'});
        shadowCalculadora.innerHTML = `
        <input type="number" id="num1" placeholder="Ingrese el primer número">
        <input type="number" id="num2" placeholder="Ingrese el segundo número">
        <select name="operacion" id="operaciones">
            <option value="suma">Suma</option>
            <option value="resta">Resta</option>
            <option value="multiplicacion">Multiplicación</option>
            <option value="division">División</option>
        </select>
        <button id="calcular">Calcular</button>
        <span id="resultado">0</span>
        `;
    }

    connectedCallback(){
        const btn = this.shadowRoot.querySelector('#calcular');
        const primerNumero = this.shadowRoot.querySelector('#num1');
        const segundoNumero = this.shadowRoot.querySelector('#num2');
        const select = this.shadowRoot.querySelector('#operaciones');
        const resultado = this.shadowRoot.querySelector('#resultado');

        btn.addEventListener('click', () => {
            const num1 = parseFloat(primerNumero.value);
            const num2 = parseFloat(segundoNumero.value);
            const operacion = select.value;

            let resultadoOperacion;

            /* Validación de entradas */

            /*Si los valores no son números, se muestra un mensaje de alerta*/
            if (isNaN(num1) || isNaN(num2)) {
                alert('Por favor, ingrese números válidos.')
            } else if (operacion === 'suma') { /*Si el valor del selector es suma, se realiza la suma*/
                resultadoOperacion = num1 + num2;
            }
            else if (operacion === 'resta') { /*Si el valor del selector es resta, se realiza la resta*/
                resultadoOperacion = num1 - num2;
            }
            else if (operacion === 'multiplicacion') { /*Si el valor del selector es multiplicación, se realiza la multiplicación*/
                resultadoOperacion = num1 * num2;
            }
            else if (operacion === 'division') { /*Si el valor del selector es división, se realiza la división*/

                /*Este condicionale valida que no exista una división por cero*/
                if (num2 === 0) {
                    alert('No se puede dividir por cero.') /*Si la división es por cero, se muestra un mensaje de alerta*/
                } else {
                    resultadoOperacion = num1 / num2; /*Caso contrario, se realiza la división*/
                }
            }
            resultado.textContent = resultadoOperacion;
        });
    }
}

customElements.define('calculadora-basica', CalculadoraBasica);