import moment from 'moment';

export function getElementFromEvt(evt): any {

	// FIX FOR FIREFOX AND SAFARI
	let el = null;
  if(evt.path){
		el = evt.path[0];
	} else if(evt.explicitOriginalTarget) {
		el = evt.explicitOriginalTarget;
	}

	return el;
}

export function validateYear(year): boolean {
	return validateDate(year,'01','01');
}

export function validateMonth(year,month): boolean {
	return validateDate(year,month,'01');
}

export function validateDay(year,month,day): boolean {
	return validateDate(year,month,day);
}

export function disableInputs(cmptEl: HTMLElement, year: number,month: number, day: number) {
	let inputDay = cmptEl.shadowRoot.querySelector('[dtType="day"]');
	let inputMoth = cmptEl.shadowRoot.querySelector('[dtType="month"]');
	let inputYear = cmptEl.shadowRoot.querySelector('[dtType="year"]');

	if(year && !month && !day){
		inputMoth.disabled = false;
		inputDay.disabled = true;
		return;
	} else if(year && month && !day){
		inputDay.disabled = false;
	} else if(year && month && day){
		inputYear.disabled = false;
		inputMoth.disabled = false;
		inputDay.disabled = false;
	}
}

export function setValueFromEvt(el, dtType, year, month, day){
	if(dtType === 3) {
		year = el.value;
	} else if(dtType === 2) {
		month = el.value;
	} else if(dtType === 1) {
		day = el.value;
	}

	return { year: year, month: month, day: day }
}

function validateDate(year,month,day){
	let date = `${year}-${month}-${day}`;
	return moment(date).isValid();
}
