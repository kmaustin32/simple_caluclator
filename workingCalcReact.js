
class App extends React.Component {
  constructor(props) {
    super(props)
    
    this.state = {
      input: '0',
      currentVal: 'current',
      lastPressed: ''
    }
  };
  
  //Appends the value of the clicked button to this.state.input
  handleStandard = (value) => {
    if (this.state.input === '0') {
      this.setState({
        input: '' + value,
        currentVal: '' + value,
        lastPressed: value
      })} else {
      this.setState({
      input: this.state.input + value,
      currentVal: this.state.currentVal + value,
      lastPressed: value
     })} 
  };
    
  //Should do something slightly different for operators at some point
  handleOperator = (operator) => {
    if (!this.state.lastPressed.match(/[+-/*]/)) {
      this.setState({
      input: this.state.input + operator,
      currentVal: '',
      lastPressed: operator
     })} else if (this.state.lastPressed.match(/[+-/*]/) && operator == '-') {
        this.setState({
          input: this.state.input + operator,
          lastPressed: this.state.lastPressed + operator 
      })} else if (this.state.lastPressed.length <= 2 && this.state.lastPressed.match(/[-]$/)) {
        this.setState({
          input: this.state.input.slice(0, -2) + operator,
          lastPressed: operator
      })} else if (this.state.lastPressed.match(/[+-/*]/)) {
        this.setState({
          input: this.state.input.slice(0, -1) + operator,
          lastPressed: operator
      })}
  };

  //Resets this.state.input
  handleClear = () => (
    this.setState({
      input: '0',
      currentVal: '0'
    })
  ); 
  
  //Removes the final value of this.state.input
  handleDelete = () => {
    if (this.state.input.length <= 1) {
      this.setState({
        input: '0', 
        currentVal: '0'
      })
    } else if (this.state.input) {
      this.setState({
      input: this.state.input.slice(0, -1),
      currentVal: this.state.input.slice(0, -1)
    })}
  };
  
  //Prevents multiple zeroes before intended numbers
  handleZero = () => (
    this.state.input !== '0' && this.setState({ input: this.state.input + '0', currentVal: this.state.input + '0'})
  );

  //Prevents more than one decimal
  handleDecimal = () => (
    !this.state.currentVal.includes('\.') && this.setState({ input: this.state.input + '\.', currentVal: this.state.currentVal + '\.'})
  );

  //Evaluates the input in string form and rounds to four decimal places
  handleEquals = () => (
    this.setState({
      input: String(eval(this.state.input)),
      currentVal: String(eval(this.state.input))
    })
  );

  render() {
    return(
      <div id='app'>
        <div id='calculator-container'>
          <div 
            id='display' 
            value={this.state.input}>{this.state.input}</div>
          <button 
            id='clear' 
            className='doubleButton'
            onClick={this.handleClear}>CLEAR</button>
          <button 
            id='delete'
            onClick={this.handleDelete}>DEL</button>
          <button 
            id='divide'
            value='/'
            onClick={() => this.handleOperator('/')}>/</button>
          <button 
            id='one'
            value='1'
            onClick={() => this.handleStandard('1')}>1</button>
          <button 
            id='two'
            value='2'
            onClick={() => this.handleStandard('2')}>2</button>
          <button 
            id='three'
            value='3'
            onClick={() => this.handleStandard('3')}>3</button>
          <button 
            id='multiply'
            value='*'
            onClick={() => this.handleOperator('*')}>*</button>
          <button 
            id='four'
            value='4'
            onClick={() => this.handleStandard('4')}>4</button>
          <button 
            id='five'
            value='5'
            onClick={() => this.handleStandard('5')}>5</button>
          <button 
            id='six'
            value='6'
            onClick={() => this.handleStandard('6')}>6</button>
          <button 
            id='add'
            value='+'
            onClick={() => this.handleOperator('+')}>+</button>
          <button 
            id='seven'
            value='7'
            onClick={() => this.handleStandard('7')}>7</button>
          <button 
            id='eight'
            value='8'
            onClick={() => this.handleStandard('8')}>8</button>
          <button 
            id='nine'
            value='9'
            onClick={() => this.handleStandard('9')}>9</button>
          <button
            id='subtract'
            value='-'
            onClick={() => this.handleOperator('-')}>-</button>
          <button 
            id='decimal'
            value='.'
            onClick={() => this.handleDecimal('\.')}>.</button>
          <button 
            id='zero'
            value='0'
            onClick={this.handleZero}>0</button>
          <button 
            id='equals' 
            className='doubleButton'
            onClick={this.handleEquals}>=</button>
        </div>
      </div>
    )
  };
};

ReactDOM.render(<App />, document.getElementById('root'));