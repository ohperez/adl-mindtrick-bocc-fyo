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

  public yearsList = [];


  renderList(item) {
    return (
      <div class="grid-element-year">
        <span>{item}</span>
      </div>
    );
  }

  componentWillLoad() {
    for (let i = 1900; i < 2019; i++) {
    this.yearsList.push(i);
   }
  }

  render2() {
    let date = moment().format();
    console.log(date);




    return (
      <div class="adl-datepicker">
        <div class="input-container">
          <input type="tel" id="year" class="year-input" maxlength="4" />
          <span>/</span>
          <input type="tel" id="month" maxlength="2" />
          <span>/</span>
          <input type="tel" id="day" maxlength="2" />
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

