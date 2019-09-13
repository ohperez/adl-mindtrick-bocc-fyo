import { Component, Prop, h } from '@stencil/core';
import moment from 'moment';
import { 
	getElementFromEvt,
	validateYear,
	validateMonth,
	validateDay, 
	disableInputs,
	setValueFromEvt
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

	componentWillLoad() {
    for (let i = 1900; i < 2019; i++) {
    this.yearsList.push(i);
   }
  }

	handleKey(evt: KeyboardEvent, dtType: number){

		let el = getElementFromEvt(evt);
		let value = null;
		
		let { year, month, day } = setValueFromEvt(
				el, dtType, this.year, this.month, this.day
		)
		
		this.year = year;
		this.month = month;
		this.day = day;

		disableInputs(this.cmptEl, this.year,this.month, this.day);
		
		let date = `${this.year}-${this.month}-${this.day}`;
		let odate = moment(date, 'YYYY-MM-DD', true);
		console.log(date, odate.invalidAt());

		this.value = date;

	}

	renderList(item) {
    return (
      <div class="grid-element-year">
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
						maxlength="4"
						dtType="year"
					/>
          <span>/</span>

					<input
						type="tel"
						value={this.month}
						onkeyup={($evt) => this.handleKey($evt,2)}
						dtType="month"
						maxlength="2"
						disabled
					/>
          
          <span>/</span>

					<input
						type="tel"
						value={this.day}
						onkeyup={($evt) => this.handleKey($evt,1)}
						dtType="day"
						maxlength="2"
						disabled
					/>

        </div>
        <div class="popup-container">
          <div class="years-container">
            <p class="grid-title">
              Seleccione el año
            </p>
            <div class="grid-container">
              {
                this.yearsList.map(item => {
                  console.log(item);
                  return this.renderList(item);
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

