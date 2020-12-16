class CalcController {

	constructor() {
		//Toda vez que for criar atributos privados usar os getters e setters
		this._operation = [];
		this._locale = 'pt-BR'
		this._displayCalcEl = document.querySelector("#display");
		this._dateEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");
		this._currentDate;
		this.initialize();
		this.initButtonEvents();
	}
	//Inicia a data e a hora do display;
	initialize() {

		this.setDisplayDateTime();

		setInterval(() => {

			this.setDisplayDateTime();

		}, 1000);


	}
	//Método que trata mais de um evento que acontece na calculadora.
	addEventListenerAll(element, events, fn) {

		events.split(' ').forEach(event => {

			element.addEventListener(event, fn, false);

		});

	}
	//Método de limpar tudo
	clearAll() {
		this._operation = [];
	}
	//Limpa a ultima entrada
	clearEntry() {
		this._operation.pop();
	}

	//Método de erro
	setError() {
		this.displayCalc = "ERR";
	}

	//Método que pega a ultima posição do array;
	getLastOperation() {
		return this._operation[this._operation.length - 1];
	}

	//Setar a posição do array
	setLastOperation(value) {
		return this._operation[this._operation.length - 1] = value;
	}

	//calcula o par
	calc(){
		let last = this._operation.pop();

		let result = eval(this._operation.join(""));

		this._operation = [result, last];
	}

	//Método para verificar o operador anterior.
	isOperator(value) {
		return (['+', '-', '/', '*', '%'].indexOf(value) > -1);
	}

	//Método para fazer adicionar os pares.
	pushOperation(value){
		this._operation.push(value);

		if(this._operation.length > 3){

			this.calc();

			console.log(this._operation);
		}

	}
	//Método que mostra o ultimo numero no display.

	setLastNumberToDisplay(){

		//nothing aqui
	}

	//Método de operação.
	addOperation(value) {
		
		if (isNaN(this.getLastOperation())) {
			//string
			if (this.isOperator(value)) {
				//troca o operador
				this.setLastOperation(value);

			} else if (isNaN(value)) {

				console.log('outra coisa');
			} else {
				this.pushOperation(value);
			}
		} else {
			//number
			if (this.isOperator(value)) {
				this.pushOperation(value)

			} else {
				let newValue = this.getLastOperation().toString() + value.toString();
				this.setLastOperation(parseInt(newValue));
				//atualizar display
				this.setLastNumberToDisplay();
			}

		}
	}

	//Método para definir as ações do botão.
	execBtn(value) {
		switch (value) {

			case 'ac':
				this.clearAll();
				break;
			case 'ce':
				this.clearEntry();
				break;
			case 'soma':
				this.addOperation('+');
				break;
			case 'subtracao':
				this.addOperation('-');
				break;
			case 'divisao':
				this.addOperation('/');
				break;
			case 'multiplicacao':
				this.addOperation('*');
				break;
			case 'porcento':
				this.addOperation('%');

				break;
			case 'igual':

				break;
			case 'ponto':
				this.addOperation('.');

				break;
			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':
				this.addOperation(parseInt(value));
				break;
			default:
				this.setError();
				break;
		}
	}

	//Pega todos os eventos de cliques necessários para o funcionamento da calculadora.
	initButtonEvents() {

		let buttons = document.querySelectorAll("#buttons > g, #parts > g");

		buttons.forEach((btn, index) => {

			this.addEventListenerAll(btn, "click drag", e => {

				let textBtn = btn.className.baseVal.replace("btn-", "");

				this.execBtn(textBtn);

			});
			//altera o cursor para uma maõzinha.

			this.addEventListenerAll(btn, "mouseover mouseup mousedown", e => {

				btn.style.cursor = "pointer";

			});

		});
	}
	//Define a hora e a data.
	setDisplayDateTime() {

		this.displayDate = this.currentDate.toLocaleDateString(this._locale);
		this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
	}

	get displayTime() {
		return this._timeEl.innerHTML; _
	}

	set displayTime(value) {
		return this._timeEl.innerHTML = value;
	}

	get displayDate() {
		return this._dateEl.innerHTML;
	}

	set displayDate(value) {
		return this._dateEl.innerHTML = value;
	}

	get displayCalc() {
		return this._displayCalcEl.innerHTML;
	}

	set displayCalc(value) {
		this._displayCalcEl.innerHTML = value;
	}

	get currentDate() {

		return new Date();
	}

	set currentDate(value) {
		this._currentDate = value;
	}

}