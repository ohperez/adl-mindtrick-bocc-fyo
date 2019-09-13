import { Component, Prop, h } from '@stencil/core';
import moment from 'moment';

@Component({
  tag: 'adl-date-component',
  styleUrl: 'adl-date-component.css',
  shadow: true
})
export class AdlDateComponent {

  @Prop() year: string;
  @Prop() month: string;
  @Prop() day: string;

  render() {
		let date = moment().format();
		console.log(date);

    return (
      <div>
        <input type="text" id="year"/>
        <input type="text" id="month"/>
        <input type="text" id="day"/>
      </div>
    );
  }
}

