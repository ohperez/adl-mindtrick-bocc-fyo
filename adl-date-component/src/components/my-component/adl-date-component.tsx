import { Component, Prop, h } from '@stencil/core';
import moment from 'moment';

@Component({
  tag: 'adl-date-component',
  styleUrl: 'adl-date-component.css',
  shadow: true
})
export class AdlDateComponent {

	private year: number;
	private month: number;
	private day: number;

	@Prop({ reflect: true }) value: string;
	@Prop() format: string;

	handleKey(evt: KeyboardEvent, dtType: number){
		let el = null;
		let value = null;

		// GET ELEMENT
		// FIX FOR FIREFOX AND SAFARI
		if(evt.path){
			el = evt.path[0];
		} else if(evt.explicitOriginalTarget) {
			el = evt.explicitOriginalTarget;
		}

		// CHECK IF VALUE IS A NUMBER
		if(isNaN(el.value)) {
			el.value = null;
			return;
		}

		if(dtType === 3) {
			this.year = el.value;
		} else if(dtType === 2) {
			this.month = el.value;
		} else if(dtType === 1) {
			this.day = el.value;
		}

		let date = `${this.year}/${this.month}/${this.day}`;
		console.log(date)
		this.value = date;
	}

  render() {
	

		console.log(this.format);
		var aDate     = moment(this.value);
		var invalidAt = aDate.invalidAt();
		console.log(invalidAt);
		console.log(aDate.format(this.format));

    return (
      <div>
        <input 
					type="tel"
					value={this.year}
					onkeyup={($evt) => this.handleKey($evt,3)} 
				/>

        <input
					type="tel"
					value={this.month}
					onkeyup={($evt) => this.handleKey($evt,2)} 
				/>

        <input
					type="tel"
					value={this.day}
					onkeyup={($evt) => this.handleKey($evt,1)}
				/>

      </div>
    );
  }
}

