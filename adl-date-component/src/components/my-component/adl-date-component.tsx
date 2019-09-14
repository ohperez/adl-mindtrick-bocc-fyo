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
    for (let i = 1900; i < 2019; i++) {
			this.yearsList.push(i);
		}
  }

  setDays() {
    this.setFirstDayInWeek();
    let daysInMonth = moment('2019-10').daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      this.daysList.push(i);
    }
    console.log(this.daysList);
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
    this.firstDayInWeek = moment('2019-09-05').day();
    this.firstDayInWeek === 0 ? this.firstDayInWeek = 7 : this.firstDayInWeek = this.firstDayInWeek;
    console.log(this.firstDayInWeek);
    for (let i = 1; i < this.firstDayInWeek; i++) {
      this.daysList.push('');
    }
    console.log(this.daysList);
  }

	onYearClick(clickYear: number){
		this.inputYear = this.cmptEl.shadowRoot.querySelector('[dtType="year"]');
		this.inputMonth = this.cmptEl.shadowRoot.querySelector('[dtType="month"]');
		this.year = clickYear;
		this.inputYear.value = clickYear;

		disableInputs(this.cmptEl, this.year, this.month, this.day);
		this.inputMonth.focus();

		if(validateDate(this.year,this.month,this.date)){
			let date = `${this.year}-${this.month}-${this.day}`;
			let odate = moment(date);
			console.log(odate.format(this.format));
		}
	}

	showPopup(evt: Event, dtType: number){
		let popup = this.cmptEl.shadowRoot.querySelector('.popup-container');
		let popupYear = this.cmptEl.shadowRoot.querySelector('.years-columns');
		let popupMonth = this.cmptEl.shadowRoot.querySelector('.months-columns');
		let popupDay = this.cmptEl.shadowRoot.querySelector('.days-columns');
		let popups = [popupYear, popupMonth, popupDay];
		let title = getPopupDate(dtType);

		togglePopups(popups, dtType);

		popup.classList.add('show-popup');
	}

  renderList(item, customClass) {
    return (
      <div onClick={() => this.onYearClick(item)} class={"grid-item" + (customClass)}>
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
                  return this.renderList(item, ' day-item');
                })
              }
              {
                this.daysList.map(item => {
                  return this.renderList(item, ' day-item');
                })
              }
            </div>

						<div class="grid-container months-columns">
              {
                this.monthsList.map(item => {
                  return this.renderList(item, ' month-item');
                })
              }
            </div>

						<div class="grid-container years-columns">
              {
                this.yearsList.map(item => {
                  return this.renderList(item, ' year-item');
                })
              }
            </div>
          </div>
        </div>
			</div>
    );
  }
}
