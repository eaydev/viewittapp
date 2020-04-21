import React, {Component} from 'react';
//Import Components.
import Post from './components/endpoints/Post';
import Notification from './components/endpoints/Notification';
import Badge from './components/endpoints/Badge';
import BadgeContainer from './components/layout/Badge-container';
import SearchBody from './components/layout/Search-container';
import Header from './components/layout/Header';
import Loader from './components/layout/Loader';
import Searchbar from './components/Searchbar';
//Import CSS.
import './App.css';
//Import Helpers.
import checkIfValid from './helper/regexCheck.js';
import checkSubExist from './helper/checkSubExist.js';
import getFilteredList from './helper/getFilteredList';


import {Route, withRouter} from 'react-router-dom';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      notification: {
          type: "",
          message: ""
        },
      postsGot: [],
      after : "",
      subRedditList: [],
      error : undefined,
      loading: false,
    }
    this.searchInputHandler = this.searchInputHandler.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.messageDisplay = this.messageDisplay.bind(this);
    this.resetMessage = this.resetMessage.bind(this);
    this.deleteSubFromList = this.deleteSubFromList.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    // Detecting change in pathname.
    // Change in pathname => subredditlist update and get posts.
    if(prevProps.location.pathname !== this.props.location.pathname){
        if(this.props.location.pathname.substr(1).length !== 0){
          this.setState({
            subRedditList : this.props.location.pathname.substr(1).split("+")
          }, ()=>{
            this.getPosts(`r/${this.props.location.pathname.substr(1)}`);
          })
        } else {
          this.setState({subRedditList : []})
        }

      }
  }

  componentDidMount(){
    //Call on mount - predefined url.
    if(this.props.location.pathname.substr(1) !== ""){
      this.setState({subRedditList : this.props.location.pathname.substr(1).split("+")});
      this.getPosts(`r/${this.props.location.pathname.substr(1)}`);
    }
  }

  searchInputHandler(searchInput){
    //Takes input from search component then passes it onto the helper functions.
    //The functions check for validity.
    //If valid will cause an update in URL which translates ta new call.
    let input = searchInput.toLowerCase();
    let newHistory = [].concat(this.state.subRedditList);
    if(!newHistory.includes(input)){
      checkIfValid(input).then(()=>{return checkSubExist(input)})
        .then((res)=>{
          //Successful. Will trigger a URL change.
          newHistory.push(input);
          this.setState({
            subRedditList : newHistory,
            error : ""
          }, ()=>{this.props.history.push(newHistory.join("+"))});
        })
        .catch(err=>{
          this.messageDisplay(err, "error");
        })
    }
  }

  getPosts(page){
    this.setState({loading: true});
    // Retrieving posts for page to be displayed
    let [type, sub] = page.split("/");
    getFilteredList(sub, type, "media").then(result=>{
      this.setState({postsGot : result.posts,
                     after: result.after
                    });
    })
    .then(()=>{
      this.setState({loading : false});
    })
    .catch(err=>{
      //Unsuccessful. Will trigger error catcher.
      this.messageDisplay(err, "error");
    })
  }

  messageDisplay(message, type){
    this.setState({
      loading: false,
      messagePending: true,
      notification : {
        message: message,
        type: type
      }
    })
    // Resetting the error.
    setTimeout(this.resetMessage, 3000);
  };

  resetMessage(){
    this.setState({
      messagePending: false,
      notification : {
        message: "",
        type: ""
      }
    })
  }

  deleteSubFromList(subToDelete){
    let currentSub = [].concat(this.state.subRedditList);
    let newSubs = currentSub.filter((sub)=>{return subToDelete !== sub});
    this.setState({subRedditList: newSubs},
        ()=>{this.props.history.push(newSubs.join("+"))}
    );
  }



  render(){
    return (
      <div className="bg-lightgrey">
      {this.state.messagePending ? <Notification message={this.state.notification["message"]} type={this.state.notification["type"]}/> : null}

        <Header>
          <Searchbar subSubmitHandler={this.searchInputHandler}/>
        </Header>

        <Route path="/:subreddits" render={() =>
              <React.Fragment>
                <BadgeContainer>
                  {this.state.subRedditList.map(sub=><Badge sub={sub} key={sub} deleteSubHandler={this.deleteSubFromList}/>)}
                </BadgeContainer>

                {this.state.loading !== false ?
                  <Loader/>:
                  undefined
                }

                <SearchBody>
                  {this.state.postsGot.map((post)=>
                    <Post
                     key={post.link}
                     imgSrc={post.picture}
                     title={post.title}
                     key={post.url}
                     author={post.author}
                     upVotes={post.upvotes}
                     comments={post.comments}
                     link={post.link}
                     embed={post["gfycatHostedVideo"]}
                     redVid={post["redditHostedVideo"]}
                     time={post["timeSinceUpload"]}
                     copyHandler={this.messageDisplay}
                    />
                  )}
                </SearchBody>
              </React.Fragment>

            }>
        </Route>

        {this.state.error !== undefined ?
          <p>{this.state.error}</p> :
          null
        }

      </div>
    )
  }
}

export default withRouter(App);
