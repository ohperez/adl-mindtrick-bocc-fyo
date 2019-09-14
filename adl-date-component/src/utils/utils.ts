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

export function validateDate(year,month,day){
	let date = `${year}-${month}-${day}`;
	return moment(date).isValid();
}

export function disableInputs(cmptEl: HTMLElement, year: string,month: string, day: string) {
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

export function clearOnValidate(cmptEl: HTMLElement, year: string,month: string, day: string) {
	let inputs = [];
	inputs[0] = cmptEl.shadowRoot.querySelector('[dtType="year"]');
	inputs[1] = cmptEl.shadowRoot.querySelector('[dtType="month"]');
	inputs[2] = cmptEl.shadowRoot.querySelector('[dtType="day"]');

	if(month < 10 && month > 0) {
		month = '0' + month;
	}

	if(day < 10 && day > 0) {
		day = '0' + day;
	}

	let date = `${year}-${month}-${day}`;
	let odate = moment(date, 'YYYY-MM-DD', true);
	let invalidAt = odate.invalidAt();

	if(invalidAt > 0) {
		for (let i = invalidAt; i <= inputs.length; i++) {
			if(inputs[i]){
				inputs[i].value = null;
				disableInputs(cmptEl, year, month, day);
			}
		}

		if(invalidAt === 2){
			inputs[2].value = null;
		}
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

export function getPopupDate(dtType: number): string{
	let title = 'Selecciona el ';
	if(dtType === 3){
		return `${title} año`;
	} else if(dtType === 2){
		return `${title} mes`;
	} else if(dtType === 1){
		return `${title} día`;
	}
}

export function togglePopups(popups, dtType: number): string{
	let showClass = 'show-calendar';

	if(dtType === 3){
		popups[0].classList.add(showClass);
		popups[1].classList.remove(showClass);
		popups[2].classList.remove(showClass);
	} else if(dtType === 2){
		popups[0].classList.remove(showClass);
		popups[1].classList.add(showClass);
		popups[2].classList.remove(showClass);
	} else if(dtType === 1){
		popups[0].classList.remove(showClass);
		popups[1].classList.remove(showClass);
		popups[2].classList.add(showClass);
	}
}
