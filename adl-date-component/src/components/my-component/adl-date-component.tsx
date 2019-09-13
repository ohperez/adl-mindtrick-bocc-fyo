import { Component, Prop, h } from '@stencil/core';
import moment from 'moment';
import { 
	getElementFromEvt,
	disableInputs,
	setValueFromEvt,
	clearOnValidate,
	validateDate
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
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre'
  ];
	
  private daysList = [];
  private firstDayInWeek: number;

	public inputYear = null;
	public inputMonth = null;
	public inputDay = null;

  componentWillLoad() {
    this.setYears();
    this.setDays();
    this.setFirstDayInWeek();
  }

  setYears() {
    for (let i = 1900; i < 2019; i++) {
			this.yearsList.push(i);
		}
  }
  
  setDays() {
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

  setFirstDayInWeek(){
    this.firstDayInWeek = moment('2019-09-02').day();
    this.firstDayInWeek === 0 ? this.firstDayInWeek = 7 : this.firstDayInWeek = this.firstDayInWeek;
    console.log(this.firstDayInWeek);
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
		console.log(dtType)
		let popup = this.cmptEl.shadowRoot.querySelector('.popup-container');
		let popupYear = this.cmptEl.shadowRoot.querySelector('.years-container');
		let popupMonth = this.cmptEl.shadowRoot.querySelector('.months-container');
		let popupDay = this.cmptEl.shadowRoot.querySelector('.days-container');
		
		if(dtType === 3){
			popupYear.classList.add('show');
			popupMonth.classList.remove('show');
			popupDay.classList.remove('show');
		} else if(dtType === 2){
			popupYear.classList.remove('show');
			popupMonth.classList.add('show');
			popupDay.classList.remove('show');
		} else if(dtType === 1){
			popupYear.classList.remove('show');
			popupMonth.classList.remove('show');
			popupDay.classList.add('show');
		}

		popup.classList.add('show');
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
					/>
          <span>/</span>

					<input
						type="tel"
						value={this.month}
						onkeyup={($evt) => this.handleKey($evt,2)}
						onfocus={($evt) => this.showPopup($evt,2)}
						dtType="month"
						maxlength="2"
						disabled
					/>
          
          <span>/</span>

					<input
						type="tel"
						value={this.day}
						onkeyup={($evt) => this.handleKey($evt,1)}
						onfocus={($evt) => this.showPopup($evt,1)}
						dtType="day"
						maxlength="2"
						disabled
					/>
        </div>

        <div class="popup-container">
          <div class="calendar-container">
            <p class="grid-title">Selecciona el día</p>
            <div></div>
            <div class="grid-container days-columns">
              {
                this.daysList.map(item => {
                  return this.renderList(item, ' day-item');
                })
              }
            </div>
          </div>
        </div>
			</div>
    );
  }
}

{/* <div class="popup-container">
          <div class="calendar-container">
            <p class="grid-title">Selecciona el año</p>
            <div class="grid-container year-columns">
              {
                this.yearsList.map(item => {
                  console.log(item);
                  return this.renderList(item, ' year-item');
                })
              }
            </div>
          </div>
        </div> */}

        // <div class="popup-container">
        //   <div class="calendar-container">
        //     <p class="grid-title">Selecciona el mes</p>
        //     <div class="grid-container month-columns">
        //       {
        //         this.monthsList.map(item => {
        //           return this.renderList(item, '');
        //         })
        //       }
        //     </div>
        //   </div>
        // </div>
