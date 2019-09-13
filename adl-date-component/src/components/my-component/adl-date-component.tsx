import { Component, Prop, h } from '@stencil/core';
import moment from 'moment';
import {
  getElementFromEvt,
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

  setFirstDayInWeek() {
    this.firstDayInWeek = moment('2019-09-05').day();
    this.firstDayInWeek === 0 ? this.firstDayInWeek = 7 : this.firstDayInWeek = this.firstDayInWeek;
    console.log(this.firstDayInWeek);
    for (let i = 1; i < this.firstDayInWeek; i++) {
      this.daysList.push('');
    }
    console.log(this.daysList);
  }

  handleKey(evt: KeyboardEvent, dtType: number) {

    let el = getElementFromEvt(evt);
    let value = null;

    let { year, month, day } = setValueFromEvt(
      el, dtType, this.year, this.month, this.day
    )

    this.year = year;
    this.month = month;
    this.day = day;

    disableInputs(this.cmptEl, this.year, this.month, this.day);

    let date = `${this.year}-${this.month}-${this.day}`;
    let odate = moment(date, 'YYYY-MM-DD', true);
    console.log(date, odate.invalidAt());

    this.value = date;

  }

  renderList(item, customClass) {
    return (
      <div class={"grid-item" + (customClass)}>
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
            onkeyup={($evt) => this.handleKey($evt, 3)}
            maxlength="4"
            dtType="year"
          />
          <span>/</span>
          <input
            type="tel"
            value={this.month}
            onkeyup={($evt) => this.handleKey($evt, 2)}
            dtType="month"
            maxlength="2"
            disabled
          />
          <span>/</span>
          <input
            type="tel"
            value={this.day}
            onkeyup={($evt) => this.handleKey($evt, 1)}
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
