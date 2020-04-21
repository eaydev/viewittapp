import React, {Component} from 'react';

export default class Searchbar extends Component{
  constructor(props){
    super(props);
    this.state = {
      searchInput : "",
    }
    this.submitHandler = this.submitHandler.bind(this);
    this.inputHandler = this.inputHandler.bind(this);
  }

  submitHandler(e){
    e.preventDefault();
    this.props.subSubmitHandler(this.state.searchInput);
    this.setState({
      searchInput : "",
    })
  }

  inputHandler(e){
    // Space trimming
    this.setState({
      searchInput : e.target.value.split(" ").join("")
    })
  }

  render(){
    return(
      <form className="w-75 d-flex ml-4 mx-auto" onSubmit={this.submitHandler}>
        <input type="text" className="bg-light border-white pl-2 w-100" placeholder="SubReddit" onChange={this.inputHandler} value={this.state.searchInput}/>
        <button className="btn btn-danger ml-2" type="submit">&#43;</button>
      </form>


    )
  }
}
