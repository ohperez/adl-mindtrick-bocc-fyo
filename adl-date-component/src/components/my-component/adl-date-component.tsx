import { Component, Prop, h } from '@stencil/core';
import moment from 'moment';
import {
	getElementFromEvt,
	disableInputs,
	setValueFromEvt,
	clearOnValidate,
	validateDate,
	getPopupDate,
	togglePopups
} from '../../utils/utils';

@Component({
  tag: 'adl-date-component',
  styleUrl: 'adl-date-component.css',
  shadow: true
})
export class AdlDateComponent {

  @Element() cmptEl: HTMLElement;

  @Prop({ reflect: true }) value: string;
  @Prop() format: string;
  private year: number;

  private month: number;
  private day: number;
  private yearsList = [];

  private monthsList = [
    { key: 1, value: 'Enero' },
    { key: 2, value: 'Febrero' },
    { key: 3, value: 'Marzo' },
    { key: 4, value: 'Abril' },
    { key: 5, value: 'Mayo' },
    { key: 6, value: 'Junio' },
    { key: 7, value: 'Julio' },
    { key: 8, value: 'Agosto' },
    { key: 9, value: 'Septiembre' },
    { key: 10, value: 'Octubre' },
    { key: 11, value: 'Noviembre' },
    { key: 12, value: 'Diciembre' }
  ];

  private daysWeekList = ['L','M','M','J','V','S','D'];

  private daysList = [];
  private firstDayInWeek: number;

	public inputYear = null;
	public inputMonth = null;
	public inputDay = null;

  componentWillLoad() {
    this.setYears();
    this.setDays();
  }

  setYears() {
		this.yearsList = [];
    for (let i = 2030; i >= 1940; i--) {
			this.yearsList.push(i);
		}
  }

  setDays() {
		this.daysList = [];
    this.setFirstDayInWeek();

		let year = this.year;
		let month = this.month;
		let day = this.day;

		if(!this.year){
			year = moment().year();
		}

		if(!this.month){
			month = moment().month();
		}

    let daysInMonth = moment(`${year}-${month}`).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      this.daysList.push(i);
    }
  }

	handleKey(evt: KeyboardEvent, dtType: number) {
		let el = getElementFromEvt(evt);
		let value = null;

		let { year, month, day } = setValueFromEvt(
				el, dtType, this.year, this.month, this.day
		)

		disableInputs(this.cmptEl, year,month, day);
		clearOnValidate(this.cmptEl, year, month, day);

		this.year = year;
		this.month = month;
		this.day = day;

		if(validateDate(this.year,this.month,this.date)){
			let date = `${this.year}-${this.month}-${this.day}`;
			let odate = moment(date);
			console.log(odate.format(this.format));
		}
	}

  setFirstDayInWeek() {
		let year = this.year;
		let month = this.month;

		if(!this.year){
			year = moment().year();
		}

		if(!this.month){
			month = moment().month();
		}

    this.firstDayInWeek = moment(`${year}-${month}-01`).day();
    this.firstDayInWeek === 0 ? this.firstDayInWeek = 7 : this.firstDayInWeek = this.firstDayInWeek;
    // console.log(this.firstDayInWeek);
    for (let i = 1; i < this.firstDayInWeek; i++) {
      this.daysList.push('');
    }
    // console.log(this.daysList);
  }

	onYearClick(clickYear: number){
		this.inputYear = this.cmptEl.shadowRoot.querySelector('[dtType="year"]');
		this.inputMonth = this.cmptEl.shadowRoot.querySelector('[dtType="month"]');
		this.year = clickYear;
		this.inputYear.value = clickYear;

		disableInputs(this.cmptEl, this.year, this.month, this.day);
		clearOnValidate(this.cmptEl, this.year, this.month, this.day);
		this.inputMonth.focus();

		if(validateDate(this.year,this.month,this.date)){
			let date = `${this.year}-${this.month}-${this.day}`;
			let odate = moment(date);
			this.value = odate.format(this.format);
		} else {
			this.value = null;
		}
	}

	onMonthClick(clickMonth: number){
		this.inputYear = this.cmptEl.shadowRoot.querySelector('[dtType="year"]');
		this.inputMonth = this.cmptEl.shadowRoot.querySelector('[dtType="month"]');
		this.inputDay = this.cmptEl.shadowRoot.querySelector('[dtType="day"]');
		this.month = clickMonth.key;
		this.inputMonth.value = clickMonth.key;
		
		disableInputs(this.cmptEl, this.year, this.month, this.day);
		this.inputDay.focus();

		if(validateDate(this.year,this.month,this.day)){
			let date = `${this.year}-${this.month}-${this.day}`;
			let odate = moment(date);
			this.value = odate.format(this.format);
		} else {
			this.value = null;
		}
	}

	onDayClick(clickDay: number){
		this.inputYear = this.cmptEl.shadowRoot.querySelector('[dtType="year"]');
		this.inputMonth = this.cmptEl.shadowRoot.querySelector('[dtType="month"]');
		this.inputDay = this.cmptEl.shadowRoot.querySelector('[dtType="day"]');
		this.day = clickDay;
		this.inputDay.value = clickDay;
		
		disableInputs(this.cmptEl, this.year, this.month, this.day);
		this.inputDay.focus();

		if(validateDate(this.year,this.month,this.day)){
			let date = `${this.year}-${this.month}-${this.day}`;
			let odate = moment(date);
			this.value = odate.format(this.format);
		} else {
			this.value = null;
		}
	}

	showPopup(evt: Event, dtType: number){
		let popup = this.cmptEl.shadowRoot.querySelector('.popup-container');
		let popupTitle = this.cmptEl.shadowRoot.querySelector('.grid-title');
		let popupYear = this.cmptEl.shadowRoot.querySelector('.years-columns');
		let popupMonth = this.cmptEl.shadowRoot.querySelector('.months-columns');
		let popupDay = this.cmptEl.shadowRoot.querySelector('.days-columns');
		let popups = [popupYear, popupMonth, popupDay];

		popupTitle.textContent = getPopupDate(dtType)
		togglePopups(popups, dtType);

		popup.classList.remove('show-popup');
		this.setYears();
    this.setDays();
		console.log('on render');
		this.render();
		this.cmptEl.forceUpdate();
		popup.classList.add('show-popup');
	}

  renderYearsList(item, customClass) {
    return (
      <div onClick={() => this.onYearClick(item)} class="grid-item year-item">
        <span>{item}</span>
      </div>
    );
  }

	renderMonthsList(item, customClass) {
    return (
      <div onClick={() => this.onMonthClick(item)} class="grid-item month-item">
        <span>{item.value}</span>
      </div>
    );
  }

	renderDaysList(item, customClass) {
    return (
      <div onClick={() => this.onDayClick(item)} class="grid-item day-item">
        <span>{item}</span>
      </div>
    );
  }

  render() {

    return (
      <div class="adl-datepicker">
        <div class="input-container">

					<input
						type="tel"
						class="year-input"
						value={this.year}
						onkeyup={($evt) => this.handleKey($evt,3)}
						onfocus={($evt) => this.showPopup($evt,3)}
						maxlength="4"
            dtType="year"
            placeholder="1998"
					/>
          <span class="field-separator">/</span>

					<input
						type="tel"
						value={this.month}
						onkeyup={($evt) => this.handleKey($evt,2)}
						onfocus={($evt) => this.showPopup($evt,2)}
						dtType="month"
            maxlength="2"
            placeholder="03"
						disabled
					/>

          <span class="field-separator">/</span>

					<input
						type="tel"
						value={this.day}
						onkeyup={($evt) => this.handleKey($evt,1)}
						onfocus={($evt) => this.showPopup($evt,1)}
						dtType="day"
            maxlength="2"
            placeholder="16"
						disabled
					/>
        </div>

        <div class="popup-container">
          <div class="calendar-container">
            <p class="grid-title">Selecciona el año</p>

            <div class="grid-container days-columns show-calendar">
              {
                this.daysWeekList.map(item => {
                  return this.renderYearsList(item);
                })
              }
              {
                this.daysList.map(item => {
                  return this.renderDaysList(item);
                })
              }
            </div>

						<div class="grid-container months-columns">
              {
                this.monthsList.map(item => {
                  return this.renderMonthsList(item);
                })
              }
            </div>

						<div class="grid-container years-columns">
              {
                this.yearsList.map(item => {
                  return this.renderYearsList(item);
                })
              }
            </div>
          </div>
        </div>
			</div>
    );
  }
}
