import React from 'react';
import SortBar from './SortBar';

export default function BadgeContainer(props){
    return(
      <section className="p-2 p-sm-3 mt-4 mt-md-2 text-md-left text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-10">
              <h4 className={props.darkMode ? "p-0 h5 font-weight-bold text-darkmode-darkgrey" : "p-0 h5 font-weight-bold"}>Current subreddit list:</h4>
              <p>
                {props.children}
              </p>
            </div>
            <div className="col-md-2 d-flex align-items-end justify-content-start">
              <SortBar value={props.sortbarValue} handleSortbarChange={props.handleSortbarChange}/>
            </div>
          </div>
        </div>
      </section>
    )
  }
