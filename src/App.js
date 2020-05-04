import React, {useEffect, useState} from 'react';
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
//Import CSS.
import './App.css';
//Import Components.
import Post from './components/endpoints/Post';
import Notification from './components/endpoints/Notification';
import Badge from './components/endpoints/Badge';
import BadgeContainer from './components/layout/Badge-container';
import SearchBody from './components/layout/Search-container';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Loader from './components/layout/Loader';
import Modal from './components/layout/Modal';
import Searchbar from './components/Searchbar';
//Import Helper
import getFilteredList from './helper/getFilteredList';


const App = () =>{
  //Importing React Router Hooks.
  let history = useHistory();
  let location = useLocation();
  //DarkMode Block.
  const [darkMode, setDarkMode] = useState(true);
  const darkModeToggle = () =>{
    setDarkMode(!darkMode);
  }
  //App data block.
  const [appData, setAppData] = useState({
    subreddits: [],
    sort: "hot",
    loading: false,
    postsLoading: false
  });

  const deleteSub = (sub) => {
    const newSubs = appData.subreddits.filter(page => page !== sub);
    if(newSubs.length === 0) return history.push("/");
    history.push(`/r/${newSubs.join("+")}/${appData.sort}`);
  }

  const messageDisplay = (message, type) => {
    console.log(message, type);
  }

  const sortBarChange = (value) =>{
    setAppData({
      ...appData,
      sort: value
    })
  }

  const URLpusher = (input) =>{
    const {type, value} = input;
    let subReddits = appData.subreddits.slice();
    let URL = "";
    // Input takes in an object. with the parameters type and value.
    if(typeof input === "object" && ("type" in input) && ("value" in input)){
      if(type === "subReddit"){
        subReddits.push(value);
        URL = `/r/${subReddits.join("+")}/${appData.sort}`
      } else if(type === "sort"){
        URL = `/r/${appData.subreddits.join("+")}/${value}`
      }
      history.push(URL);
    } else {
      throw new Error("Invalid input, must be an object with parameters type and value.");
    }
  }


  // Notification display
  const [message, setMessage] = useState({
    text: undefined,
    type: undefined
  });

  const startMessage = (message) => {
    const {text, type} = message;
    setMessage({
      text: text,
      type: type
    })
    setTimeout(removeMessage, 4000);
  }

  const removeMessage = () => {
    setMessage({
      text: undefined,
      type: undefined
    })
  }
  //Effects post renders.
  //URL listener.
  useEffect(()=>{
    //The URL listener acts as a url-first navigator.
    //It will be the facilitator for state updates which in react are bound to view updates.
    //On detection of 404
    if(location.pathname.substring(1) === "404") return;
    // Empty pathname
    if(location.pathname.substring(1) === "") return setAppData({...appData, subreddits: []});
    //Common invalid path.
    if(location.pathname.substring(1)[0].length > 1) return;
    //Valid URLs will begin here.
    const reqURL = location.pathname.substring(1).split("/");
    const [pageType, page, sortType] = reqURL;
    //Checking valid paths.
    if(page.length === 0 && appData.subreddits.length !== 0) history.push("/404");
    if(pageType === "r"){
      setAppData({...appData, subreddits: page.split("+"), loading: true});
    //These are yet to be added.
    } else if(pageType === "u"){
      console.log("User list path");
    } else if(pageType === "p"){
      console.log("Page app");
    }
  }, [location])

  // Will listen to 'loading' status which this triggers post retrieval.
  useEffect(()=>{
    const {loading} = appData;
    if(loading) return console.log("Insert a way to load data here.");
  }, [appData])


  return (
    <div className={darkMode ? "bg-darkmode-black" : "bg-lightgrey"}>
    {message.type !== undefined ? <Notification text={message.text} type={message.type}/> : null}

      <Header
        darkMode={darkMode}
        darkModeToggle={darkModeToggle}
        copyHandler={startMessage}
      >
        <Searchbar
          URLpusher={URLpusher}
          messageHandler={startMessage}
        />
      </Header>

      <Switch>
        <Route exact path="/:pagetype/:subreddit/:sort">
          <BadgeContainer
            sortbarValue={appData.sort}
            handleSortbarChange={sortBarChange}
          >
            {appData.subreddits.map(sub =>
              <Badge
                sub={sub}
                deleteSub={deleteSub}
              />
            )}
          </BadgeContainer>

          {appData.loading !== false ?
            <Loader/>:
            undefined
          }


        </Route>

        <Route exact path="/404">
          <h1 className="p-4 m-4 text-center text-darkmode-grey">Sorry not found.</h1>
        </Route>
      </Switch>

    </div>
  )
}

export default App;
