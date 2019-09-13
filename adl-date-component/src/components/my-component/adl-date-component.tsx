import { Component, Prop, h } from '@stencil/core';
import { getElementFromEvt, validateYear, validateMonth, validateDay, disableInputs, setValueFromEvt} from '../../utils/utils';
import moment from 'moment';

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

  render() {
		/*
		var aDate     = moment(this.value);
		var invalidAt = aDate.	;
		console.log(invalidAt);
		console.log(aDate.format(this.format));
		*/

    return (
      <div>
        <input 
					type="tel"
					value={this.year}
					onkeyup={($evt) => this.handleKey($evt,3)}
					dtType="year"
				/>

        <input
					type="tel"
					value={this.month}
					onkeyup={($evt) => this.handleKey($evt,2)}
					dtType="month"
					disabled
				/>

        <input
					type="tel"
					value={this.day}
					onkeyup={($evt) => this.handleKey($evt,1)}
					dtType="day"
					disabled
				/>

      </div>
    );
  }
}

