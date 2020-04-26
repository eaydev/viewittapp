import React, {Component} from 'react';

export default class SortBar extends Component{
  constructor(props) {
    super(props);
    this.state = {value: this.props.value};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value},
      ()=>{this.props.handleSortbarChange(this.state.value)}
    );
  }

  componentDidUpdate(prevState, prevProps){
    if(prevProps.value !== this.props.value){
      this.setState({value: this.props.value})
    }
  }

  render(){
    return(
      <select className="shadow custom-select-width mt-2 mb-1 text-light bg-dark border-danger" value={this.state.value} onChange={this.handleChange}>>
        <option disabled selected="selected">Sort by </option>
        <option value="hot">Hot</option>
        <option value="new">New</option>
        <option value="rising">Rising</option>
      </select>
    )
  }
}
