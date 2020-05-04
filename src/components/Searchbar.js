import React, { useState }from 'react';
//Input checkers to ensure valid entry of subreddits.
import checkIfValid from '../helper/regexCheck.js';
import checkSubExist from '../helper/checkSubExist.js';

const Searchbar = ({messageHandler, URLpusher}) =>{
  const [searchValue, setSearchValue] = useState("");

  const submitHandler = (e) =>{
    let subToSearch = searchValue.toLowerCase();
    e.preventDefault();
    checkIfValid(subToSearch).then(()=>{return checkSubExist(subToSearch)})
    .then(()=>{
      URLpusher({type: "subReddit", value: subToSearch});
    })
    .catch(err=>{
      messageHandler({text: err, type: "error"});
    })
    setSearchValue("");
  }

    return(
      <form className="w-75 d-flex ml-4 mx-auto" onSubmit={submitHandler}>
        <input
          type="text"
          className="bg-light border-white pl-2 w-100"
          placeholder="SubReddit"
          onChange={(e)=>{setSearchValue(e.target.value.split(" ").join(""))}}
          value={searchValue}
        />
        <button className="btn btn-danger ml-2" type="submit">&#43;</button>
      </form>
    )
}
export default Searchbar
