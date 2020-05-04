import React, {useState, useEffect} from 'react';


const SortBar = ({sortbarValue, handleSortbarChange}) =>{
  const [value, setValue] = useState(sortbarValue);

  useEffect(()=>{
    handleSortbarChange(value);
  }, [value]);

  return(
    <select className="shadow custom-select-width mt-2 mb-1 border-dark"
    value={value}
    onChange={(e)=>{setValue(e.target.value)}}
    >
      <option disabled>Sort by:</option>
      <option value="hot">Hot</option>
      <option value="new">New</option>
      <option value="rising" disabled>Rising</option>
    </select>
  )
}

export default SortBar;
