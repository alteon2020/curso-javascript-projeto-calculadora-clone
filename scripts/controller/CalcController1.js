class CalcController {

	construtor(){
		//Toda vez que for criar atributos privados usar os getters e setters
		this._displayCalc = "0";
		this._currentDate;
		this.initialize();
	}

	initialize(){
		let displayEl = document.querySelector("#display");
		let dateEl = document.querySelector("#data");
		let timeEl = document.querySelector("#hora");

		displayCalcEl.innerHTML = "4567";
		dateEl.innerHTML = "02/05/1996";

	}
	get displayCalc(){
		return this._displayCalc;
	}
	set displayCalc(value){
		this._displayCalc = value;
	}

	get currentDate(){
		return this._currentDate;
	}
	set currentDate(date){
		this._currentDate = date;
	}

}