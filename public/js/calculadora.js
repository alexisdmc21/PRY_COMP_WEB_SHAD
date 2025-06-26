class CalculadoraBasica extends HTMLElement {
    constructor() {
        super();

        const shadowCalculadora = this.attachShadow({ mode: 'open' });
        shadowCalculadora.innerHTML = `
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"> /*Se cargar los estilos de bootstrap para que actue con el Shadow DOM*/
        
        /*Contenedor general*/
        <div class="d-flex justify-content-center align-items-center vh-100">
            
            /*Contenedor de la calculadora*/
            <div class="container bg-white p-4 rounded shadow w-50">
                <h1 class="text-center">Mi Calculadora Básica</h1>
                <hr class="border border-primary border-3 opacity-75">

                /*Inputs para los números y el selector de operaciones*/
                <div class="mb-3">
                    <input type="number" id="num1" class="form-control" placeholder="Ingrese el primer número">
                </div>
                <div class="mb-3">
                    <input type="number" id="num2" class="form-control" placeholder="Ingrese el segundo número">
                </div>
                <div class="mb-3">
                    <select name="operacion" id="operaciones" class="form-select">
                        <option value="predeterminado" selected>Seleccione una operación</option>
                        <option value="suma">Suma</option>
                        <option value="resta">Resta</option>
                        <option value="multiplicacion">Multiplicación</option>
                        <option value="division">División</option>
                    </select>
                </div>

                /*Botón para calcular y mostrar el resultado*/
                <button id="calcular" class="btn btn-success w-100">Calcular</button>
                <div class="mt-3 text-center">
                    <span id="resultado" class="badge bg-primary fs-4 w-25 py-4">0</span>
                </div>

                /*PARTE OPCIONAL EXTRA DONDE MOSTRARA EL HISTORIAL DE OPERACIONES*/
                <div>
                    <h2>Historial de operaciones: </h2>
                    <ul id='historial-operaciones'>
                        /*En esta parte se mostrará el historial de operaciones realizadas*/
                    </ul>
                </div>
            </div>
            
        </div>
        `;
    }


    /*El método connectedCallback se ejecuta cuando el elemento se conecta al DOM*/
    connectedCallback() {
        const btn = this.shadowRoot.querySelector('#calcular');
        const primerNumero = this.shadowRoot.querySelector('#num1');
        const segundoNumero = this.shadowRoot.querySelector('#num2');
        const select = this.shadowRoot.querySelector('#operaciones');
        const resultado = this.shadowRoot.querySelector('#resultado');
        const historialOperaciones = this.shadowRoot.querySelector('#historial-operaciones');

        btn.addEventListener('click', () => {
            const num1 = parseFloat(primerNumero.value);
            const num2 = parseFloat(segundoNumero.value);
            const operacion = select.value;

            let resultadoOperacion;

            /* Validación de entradas */

            /*Si los valores no son números, se muestra un mensaje de alerta*/
            if (isNaN(num1) || isNaN(num2)) {
                alert('Por favor, ingrese números válidos.')
                return /*Se agrego return para evitar que se ejecute el resto del código por ende se guarde en el historial*/
            } else if (operacion === 'predeterminado') { /*Si el valor del selector es predeterminado, se muestra un mensaje de alerta*/
                alert('Seleccionar una operación!!')
                return /*Se agrego return para evitar que se ejecute el resto del código por ende se guarde en el historial*/
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

                /*Este condicional valida que no exista una división por cero*/
                if (num2 === 0) {
                    alert('No se puede dividir por cero.')/*Si la división es por cero, se muestra un mensaje de alerta*/
                    return /*Se agrego return para evitar que se ejecute el resto del código por ende se guarde en el historial*/
                } else {
                    resultadoOperacion = num1 / num2; /*Caso contrario, se realiza la división*/
                }
            }
            resultado.textContent = resultadoOperacion; /*Se muestra el resultado de la operación en el elemento con id resultado*/

            /*A PARTIR DE AQUI SE REALIZA LA PARTE OPCIONAL DE LA TAREA QUE NOS PIDE EMITIR UN EVENTO PERSONALIZADO QUE INFORME EL RESULTADO AL DOCUMENTO PADRE Y MUESTRE UN HISTORIAL DE OPERACIONES*/

            const historial = document.createElement('li'); /*Crea un elemento li con el historial de operaciones*/

            /*Este condicional nos permite comparar el selector elegido y por lo tanto mostrar el signo de la operacion en el historial*/
            if (operacion === 'suma') {
                historial.textContent = num1 + ' + ' + num2 + ' = ' + resultadoOperacion
            } else if (operacion === 'resta') {
                historial.textContent = num1 + ' - ' + num2 + ' = ' + resultadoOperacion
            } else if (operacion === 'multiplicacion') {
                historial.textContent = num1 + ' x ' + num2 + ' = ' + resultadoOperacion
            } else if (operacion === 'division') {
                historial.textContent = num1 + ' / ' + num2 + ' = ' + resultadoOperacion
            }

            historialOperaciones.appendChild(historial); /*Agrega el elemento li al historial de operaciones*/

            /*Evento personalizado que informa el resultado al documento padre*/
            this.dispatchEvent(new CustomEvent('resultado-obtenido', {
                detail: {
                    resultado: resultadoOperacion
                },
                bubbles: true,
                composed: true
            }))
        });
    }
}

/*Define el componente personalizado <calculadora-basica>*/
customElements.define('calculadora-basica', CalculadoraBasica);