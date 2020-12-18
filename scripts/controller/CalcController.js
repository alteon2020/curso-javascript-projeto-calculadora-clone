class CalcController {

	constructor() {
		//Toda vez que for criar atributos privados usar os getters e setters

		this._lastOperator = '';
		this._lastNumber = '';
		//audio dos botões.
		this._audioOnOff = false;

		this._audio = new Audio('click.mp3');

		this._operation = [];
		this._locale = 'pt-BR'
		this._displayCalcEl = document.querySelector("#display");
		this._dateEl = document.querySelector("#data");
		this._timeEl = document.querySelector("#hora");
		this._currentDate;
		this.initialize();
		this.initButtonEvents();
		this.initKeyboard();
	}
	pastefromClipboard() {

		document.addEventListener('paste', e => {

			let txt = e.clipboardData.getData('Text');

			this.displayCalc = parseFloat(txt);
		});
	}

	copyToClipboard() {

		let input = document.createElement('input');

		input.value = this.displayCalc;

		document.body.appendChild(input);

		input.select();

		document.execCommand("Copy");

		input.remove();

	}
	//Inicia a data e a hora do display;
	initialize() {

		this.setDisplayDateTime();

		this.setDisplayDateTime();

		setInterval(() => {

			this.setDisplayDateTime();

		}, 1000);

		//atualiza display
		this.setLastNumberToDisplay();
		this.pastefromClipboard();

		document.querySelectorAll('.btn-ac').forEach(btn => {

			btn.addEventListener('dblclick', e => {

				this.toggleAudio();

			});
		});


	}
	//som dos botões
	toggleAudio() {

		this._audioOnOff = !this._audioOnOff;
	}
	playAudio() {

		if (this._audioOnOff) {
			this._audio.currentTime = 0;
			this._audio.play();

		}
	}

	initKeyboard() {

		document.addEventListener('keyup', e => {

			this.playAudio();

			switch (e.key) {

				case 'Escape':
					this.clearAll();
					break;
				case 'Backspace':
					this.clearEntry();
					break;
				case '+':
				case '-':
				case '/':
				case '*':
				case '%':
					this.addOperation(e.key);
					break;
				case 'Enter':
				case '=':
					this.calc();
					break;
				case '.':
				case ',':
					this.addDot('.');

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
					this.addOperation(parseInt(e.key));
					break;
				case 'c':
					if (e.ctrlKey) this.copyToClipboard();
					break;
			}
		});
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
		this._lastNumber = '';
		this._lastOperator = '';
		//atualiza display
		this.setLastNumberToDisplay();
	}
	//Limpa a ultima entrada
	clearEntry() {
		this._operation.pop();
		//atualiza display
		this.setLastNumberToDisplay();
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

	getResult() {
		try{
			return eval(this._operation.join(""));
		}catch(e){
			setTimeout(()=>{
				this.setError();
			},1);
		}
	}

	//calcula o par
	calc() {

		let last = "";
		this._lastOperator = this.getLastItem();

		if (this._operation.length < 3) {

			let firstItem = this._operation[0];
			this._operation = [firstItem, this._lastOperator, this._lastNumber];

		}

		if (this._operation.length > 3) {

			last = this._operation.pop();

			this._lastNumber = this.getResult();

		} else if (this._operation.length == 3) {

			this._lastNumber = this.getLastItem(false);

		}

		let result = this.getResult();

		if (last == '%') {

			result /= 100;
			this._operation = [result];

		} else {

			this._operation = [result];
			if (last) this._operation.push(last);

		}
		//atualiza display
		this.setLastNumberToDisplay();
	}

	//Método para verificar o operador anterior.
	isOperator(value) {
		return (['+', '-', '/', '*', '%'].indexOf(value) > -1);
	}

	//Método para fazer adicionar os pares.
	pushOperation(value) {
		this._operation.push(value);

		if (this._operation.length > 3) {

			this.calc();
		}

	}

	getLastItem(isOperator = true) {
		let lastItem;
		for (let i = this._operation.length - 1; i >= 0; i--) {
			if (this.isOperator(this._operation[i]) == isOperator) {
				lastItem = this._operation[i];
				break;
			}

		}
		if (!lastItem) {

			lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
		}
		return lastItem;
	}
	//Método que mostra o ultimo numero no display.

	setLastNumberToDisplay() {

		let lastNumber = this.getLastItem(false);

		if (!lastNumber) lastNumber = 0;

		this.displayCalc = lastNumber;
	}
	addDot() {
		let lastOperation = this.getLastOperation();
		if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;

		if (this.isOperator(lastOperation) || !lastOperation) {
			this.pushOperation('0.');
		} else {
			this.setLastOperation(lastOperation.toString() + '.');
		}
		this.setLastNumberToDisplay();
	}

	//Método de operação.
	addOperation(value) {

		if (isNaN(this.getLastOperation())) {
			//string
			if (this.isOperator(value)) {
				//troca o operador
				this.setLastOperation(value);

			} else {
				this.pushOperation(value);
				//atualiza display
				this.setLastNumberToDisplay();
			}
		} else {
			//number
			if (this.isOperator(value)) {
				this.pushOperation(value)

			} else {
				let newValue = this.getLastOperation().toString() + value.toString();
				this.setLastOperation(newValue);
				//atualizar display
				this.setLastNumberToDisplay();
			}

		}
	}

	//Método para definir as ações do botão.
	execBtn(value) {

		this.playAudio();

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
				this.calc();
				break;
			case 'ponto':
				this.addDot('.');

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
				this.addOperation(value);
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
		if (value.toString().length > 10) {
			this.setError();
			return false;
		}
		this._displayCalcEl.innerHTML = value;
	}

	get currentDate() {

		return new Date();
	}

	set currentDate(value) {
		this._currentDate = value;
	}

}