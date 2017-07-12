import React, { Component } from 'react';
import './Calculator.css';

class Calculator extends Component {
  constructor() {
    super();
    this.state = {
      value: null,
      displayValue: '0',
      waitingForOperand: false,
      operator: null
    }
  }

  inputDigit(digit) {
    if(this.state.waitingForOperand) {
      this.setState({
        displayValue: String(digit),
        waitingForOperand: false
      })
    } else {
      this.setState({
        displayValue: this.state.displayValue === '0' ? String(digit) : this.state.displayValue + digit
      })
    }
  }

  inputDot() {
    if(this.state.waitingForOperand) {
      this.setState({
        displayValue: '.',
        waitingForOperand: false
      })
    } else if(this.state.displayValue.indexOf('.') == '-1') {
      this.setState({
        displayValue: this.state.displayValue + '.',
        waitingForOperand: false   
      })
    }
  }

  clearDisplay() {
    this.setState({
      displayValue: '0'
    })
  }

  toggleSign() {
    this.setState({
      displayValue: this.state.displayValue.charAt(0) == '-' ? this.state.displayValue.substr(1) : '-' + this.state.displayValue
    })
  }

  inputPercent() {
    const value = parseFloat(this.state.displayValue)

    this.setState({
      displayValue: String(value / 100) 
    })
  }

  performOperation(nextOperator) {
    const nextValue = parseFloat(this.state.displayValue)    
    const operations = {
      '/': (prevValue, nextValue) => prevValue / nextValue,
      '*': (prevValue, nextValue) => prevValue * nextValue,
      '+': (prevValue, nextValue) => prevValue + nextValue,
      '-': (prevValue, nextValue) => prevValue - nextValue,
      '=': (prevValue, nextValue) => nextValue
    }

    if(this.state.value === null) {
      this.setState({
        value: nextValue
      })
    } else if(this.state.operator) {
      const currentValue = this.state.value || 0
      const computedValue = operations[this.state.operator](currentValue, nextValue)

      this.setState({
        value: computedValue,
        displayValue: String(computedValue)
      })
    }
    
    this.setState({
      waitingForOperand: true,
      operator: nextOperator
    })
  }

  render() {
    return (
      <div className="calculator">
        <div className="calculator-display">{this.state.displayValue}</div>
        <div className="calculator-keypad">
          <div className="input-keys">
            <div className="function-keys">
              <button onClick={() => this.clearDisplay()}>AC</button>
              <button onClick={() => this.toggleSign()}>±</button>
              <button onClick={() => this.inputPercent()}>%</button>
              </div>
            <div className="digit-keys">
              <button onClick={() => this.inputDigit(7)}>7</button>
              <button onClick={() => this.inputDigit(8)}>8</button>
              <button onClick={() => this.inputDigit(9)}>9</button>
              <button onClick={() => this.inputDigit(4)}>4</button>
              <button onClick={() => this.inputDigit(5)}>5</button>
              <button onClick={() => this.inputDigit(6)}>6</button>
              <button onClick={() => this.inputDigit(1)}>1</button>
              <button onClick={() => this.inputDigit(2)}>2</button>
              <button onClick={() => this.inputDigit(3)}>3</button>
              <button className="zero-key" 
              onClick={() => this.inputDigit(0)}>0</button>
              <button onClick={() => this.inputDot(2)}>•</button>
            </div>
          </div>
          <div className="operator-keys">
            <button onClick={() => this.performOperation('/')}>÷</button>
            <button onClick={() => this.performOperation('*')}>X</button>
            <button onClick={() => this.performOperation('-')}>-</button>
            <button onClick={() => this.performOperation('+')}>+</button>
            <button onClick={() => this.performOperation('=')}>=</button>
          </div>
        </div>
      </div>
    );
  } 
}

export default Calculator;
