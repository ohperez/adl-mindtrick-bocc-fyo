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
	let inputDay = cmptEl.querySelector('[data-type="day"]');
	let inputMoth = cmptEl.querySelector('[data-type="month"]');
	let inputYear = cmptEl.querySelector('[data-type="year"]');

	if(year && !month && !day){
		(inputMoth as any).disabled = false;
		(inputDay as any).disabled = true;
		return;
	} else if(year && month && !day){
		(inputDay as any).disabled = false;
	} else if(year && month && day){
		(inputYear as any).disabled = false;
		(inputMoth as any).disabled = false;
		(inputDay as any).disabled = false;
	}
}

export function clearOnValidate(cmptEl: HTMLElement, year: string,month: string, day: string) {
	let inputs = [];
	inputs[0] = cmptEl.querySelector('[data-type="year"]');
	inputs[1] = cmptEl.querySelector('[data-type="month"]');
	inputs[2] = cmptEl.querySelector('[data-type="day"]');

	if(parseInt(month) < 10 && parseInt(month) > 0) {
		month = '0' + month;
	}

	if(parseInt(day) < 10 && parseInt(day) > 0) {
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

export function togglePopups(popups, dtType: number): void{
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
