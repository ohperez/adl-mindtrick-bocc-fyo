import {
  Component,
  Prop,
  h,
  Event,
  Element,
  EventEmitter,
  State
} from "@stencil/core";
import moment from "moment";
import {
  getElementFromEvt,
  disableInputs,
  setValueFromEvt,
  clearOnValidate,
  validateDate,
  getPopupDate,
  togglePopups
} from "../../utils/utils";

@Component({
  tag: "adl-date-component",
  styleUrl: "adl-date-component.css",
})
export class AdlDateComponent {
  @Element() cmptEl: HTMLElement;

  @Prop({ reflect: true }) value: string;
  @Prop() format: string;

  @Event() changeDate: EventEmitter;

  changeDatedHandler(date) {
    this.changeDate.emit(date);
  }

  private year: any;

  private month: any;
  private day: any;
  
  @State() yearsList = [];

  private monthsList = [
    { key: 1, value: "Enero" },
    { key: 2, value: "Febrero" },
    { key: 3, value: "Marzo" },
    { key: 4, value: "Abril" },
    { key: 5, value: "Mayo" },
    { key: 6, value: "Junio" },
    { key: 7, value: "Julio" },
    { key: 8, value: "Agosto" },
    { key: 9, value: "Septiembre" },
    { key: 10, value: "Octubre" },
    { key: 11, value: "Noviembre" },
    { key: 12, value: "Diciembre" }
  ];

  private daysWeekList = ["L", "M", "M", "J", "V", "S", "D"];

  private daysList = [];
  private firstDayInWeek: number;

  public inputYear = null;
  public inputMonth = null;
  public inputDay = null;

  public date;

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
    let daysList = [];
    daysList = this.setFirstDayInWeek();

    let year = this.year;
    let month = this.month;

    if (!this.year) {
      year = moment().year();
    }

    if (!this.month) {
      month = moment().month();
    }

    let daysInMonth = moment(`${year}-${month}`).daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      daysList.push(i);
    }

    this.daysList = daysList;
  }

  handleKey(evt: KeyboardEvent, dtType: number) {
    let el = getElementFromEvt(evt);

    let { year, month, day } = setValueFromEvt(
      el,
      dtType,
      this.year,
      this.month,
      this.day
    );

    disableInputs(this.cmptEl, year, month, day);
    clearOnValidate(this.cmptEl, year, month, day);

    this.year = year;
    this.month = month;
    this.day = day;

    if (validateDate(this.year, this.month, this.date)) {
      let date = `${this.year}-${this.month}-${this.day}`;
      let odate = moment(date);
      this.value = odate.format(this.format);
      this.changeDatedHandler(this.value);
    }
  }

  setFirstDayInWeek() {
    let daysList = [];
    let year = this.year;
    let month = this.month;

    if (!this.year) {
      year = moment().year();
    }

    if (!this.month) {
      month = moment().month();
    }

    this.firstDayInWeek = moment(`${year}-${month}-01`).day();
    this.firstDayInWeek === 0
      ? (this.firstDayInWeek = 7)
      : (this.firstDayInWeek = this.firstDayInWeek);

    for (let i = 1; i < this.firstDayInWeek; i++) {
      daysList.push("");
    }

    return daysList;
  }

  onYearClick(clickYear: number) {
    this.inputYear = this.cmptEl.querySelector('[data-type="year"]');
    this.inputMonth = this.cmptEl.querySelector(
      '[data-type="month"]'
    );
    this.year = clickYear;
    this.inputYear.value = clickYear;

    disableInputs(this.cmptEl, this.year, this.month, this.day);
    clearOnValidate(this.cmptEl, this.year, this.month, this.day);
    this.inputMonth.focus();

    if (validateDate(this.year, this.month, this.date)) {
      let date = `${this.year}-${this.month}-${this.day}`;
      let odate = moment(date);
      this.value = odate.format(this.format);
    } else {
      this.value = null;
    }

    this.changeDatedHandler(this.value);
  }

  onMonthClick(clickMonth: number) {
    this.inputYear = this.cmptEl.querySelector('[data-type="year"]');
    this.inputMonth = this.cmptEl.querySelector(
      '[data-type="month"]'
    );
    this.inputDay = this.cmptEl.querySelector('[data-type="day"]');
    this.month = (clickMonth as any).key;
    this.inputMonth.value = (clickMonth as any).key;

    disableInputs(this.cmptEl, this.year, this.month, this.day);
    this.inputDay.focus();

    if (validateDate(this.year, this.month, this.day)) {
      let date = `${this.year}-${this.month}-${this.day}`;
      let odate = moment(date);
      this.value = odate.format(this.format);
    } else {
      this.value = null;
    }

    this.changeDatedHandler(this.value);
  }

  onDayClick(clickDay: number) {
    this.inputYear = this.cmptEl.querySelector('[data-type="year"]');
    this.inputMonth = this.cmptEl.querySelector(
      '[data-type="month"]'
    );
    this.inputDay = this.cmptEl.querySelector('[data-type="day"]');
    this.day = clickDay;
    this.inputDay.value = clickDay;

    disableInputs(this.cmptEl, this.year, this.month, this.day);
    this.inputDay.focus();

    if (validateDate(this.year, this.month, this.day)) {
      let date = `${this.year}-${this.month}-${this.day}`;
      let odate = moment(date);
      this.value = odate.format(this.format);
    } else {
      this.value = null;
    }

    this.changeDatedHandler(this.value);
  }

  showPopup(dtType: number) {
    let popup = this.cmptEl.querySelector(".popup-container");
    let popupTitle = this.cmptEl.querySelector(".grid-title");
    let popupYear = this.cmptEl.querySelector(".years-columns");
    let popupMonth = this.cmptEl.querySelector(".months-columns");
    let popupDay = this.cmptEl.querySelector(".days-columns");
    let popups = [popupYear, popupMonth, popupDay];

    popupTitle.textContent = getPopupDate(dtType);
    togglePopups(popups, dtType);

    popup.classList.remove("show-popup");
    this.setYears();
    this.setDays();

    popup.classList.add("show-popup");
  }

  renderYearsList(item) {
    return (
      <div
        aria-label={item}
        onClick={() => this.onYearClick(item)}
        class="grid-item year-item"
      >
        <span>{item}</span>
      </div>
    );
  }

  renderMonthsList(item) {
    return (
      <div
        aria-label={item.value}
        onClick={() => this.onMonthClick(item)}
        class="grid-item month-item"
      >
        <span>{item.value}</span>
      </div>
    );
  }

  renderDaysList = (item) => {
    return (
      <div
        aria-label={item}
        onClick={() => this.onDayClick(item)}
        class="grid-item day-item"
      >
        <span>{item}</span>
      </div>
    );
  }

  renderDaysHeaders(item) {
    return (
      <div aria-label={item} class="grid-item day-header">
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
            onKeyUp={$evt => this.handleKey($evt, 3)}
            onFocus={() => this.showPopup(3)}
            maxlength="4"
            data-type="year"
            placeholder="Año"
          />
          <span class="field-separator">/</span>

          <input
            type="tel"
            value={this.month}
            onKeyUp={$evt => this.handleKey($evt, 2)}
            onFocus={() => this.showPopup(2)}
            data-type="month"
            maxlength="2"
            placeholder="Mes"
            disabled
          />

          <span class="field-separator">/</span>

          <input
            type="tel"
            value={this.day}
            onKeyUp={$evt => this.handleKey($evt, 1)}
            onFocus={() => this.showPopup(1)}
            data-type="day"
            maxlength="2"
            placeholder="Día"
            disabled
          />
        </div>

        <div class="popup-container">
          <div class="calendar-container">
            <p class="grid-title">Selecciona el año</p>

            <div class="grid-container days-columns show-calendar">
              {this.daysWeekList.map(item => this.renderDaysHeaders(item))}
              {this.daysList.map(item => this.renderDaysList(item))}
            </div>

            <div class="grid-container months-columns">
              {this.monthsList.map(item => this.renderMonthsList(item))}
            </div>

            <div class="grid-container years-columns">
              {this.yearsList.map(item => this.renderYearsList(item))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
