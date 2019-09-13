import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
export class MyComponent {

  @Prop() year: string;
  @Prop() month: string;
  @Prop() day: string;

  render() {
    return (
      <div>
        <input type="text" id="year"/>
        <input type="text" id="month"/>
        <input type="text" id="day"/>
      </div>
    );
  }
}

