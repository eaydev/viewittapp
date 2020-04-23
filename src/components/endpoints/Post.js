import React, {Component} from 'react';

export default class Post extends Component{
  constructor(props){
    super(props);
    this.toClipBoard = this.toClipBoard.bind(this);
    this.modalHandler = this.modalHandler.bind(this);
  }
  getLink(){
    return "https://www.reddit.com" + this.props.link;
  }

  shortenVotes(upvotes){
    let votes = upvotes.toString().split('');
    if (votes.length > 3){
      let k = votes.splice(votes.length - 3, 3);
      let afterK = k[0];
      return votes.join('') + "."+ afterK + "k";
    } else {
      return upvotes;
    }
  }


   htmlDecode(input){
    var e = document.createElement('div');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  async toClipBoard(){
    let callBack = this.props.copyHandler;
    //Choosing source for post.
    let postSrc;
    if(this.props.redVid !== undefined){
      postSrc = this.getLink();
    } else if(this.props.embed !== undefined){
      postSrc = this.getLink();
    } else {
      postSrc = this.props.imgSrc;
    }
    //Putting together clipboard message.
    let message = `"${this.props.title}": ${postSrc} viewed on viewitt`;
    //Check clipboard .js
    await window.Clipboard.copy(message);
    callBack("Copied post 👍", "info");
  }

  modalHandler(){
    this.props.modalHandler(this.props.imgSrc);
  }

  render(){
    let embed = undefined;
    (()=>{
      if(this.props.redVid !== undefined){
          embed = `<video controls name="media"><source src="${this.props.redVid.fallback_url}" type="video/mp4"/></video>`;
        } else if(this.props.embed !== undefined){
          embed = this.htmlDecode(this.props.embed);
       }
    })()

    return(
      <div className={this.props.darkMode ? "col-lg-4 col-md-6 col-12 mb-3 shadow" : "col-lg-4 col-md-6 col-12 mb-3"}>
        <div className={this.props.darkMode ? "card border-0 bg-darkmode-lightblack p-2 rounded" : "card bg-white p-2 rounded"}>
          {embed !== undefined ?
            <div className="card-img-top card-custom rounded-lg" dangerouslySetInnerHTML={{__html: embed}}></div> :
            <div className="card-img-top card-custom cursor-pointer" style={{background: `url(${this.props.imgSrc})`}} onClick={this.modalHandler}></div>
          }

          <div className="card-body m-0 p-0">
            <p className={this.props.darkMode ? "card-text text-center border-bottom p-3 text-darkmode-grey"  : "card-text text-center border-bottom p-3"}>{this.props.title}</p>
            <a href={this.getLink()} target="_blank" rel="noopener noreferrer" className={this.props.darkMode ? "btn btn-sm border-0 text-darkmode-grey font-weight-bold" : "btn btn-sm border-0 text-dark font-weight-bold m-0}"}>{this.props.author}</a>


            <div className="d-flex justify-content-between align-items-center">
              <div className="btn-group p-0 m-0">
                <button type="button" className={this.props.darkMode ? "btn btn-sm border-0 text-muted m-0 pr-0 pl-0 pr-0 ml-2 text-darkmode-grey" : "btn btn-sm border-0 text-muted m-0 pr-0 pl-0 pr-0 ml-2"} style={{fontSize:"12px"}}>{this.props.time}</button>
              </div>
              <div className="p-0 m-0">
                <span className="button-custom bg-warning"><a href={this.getLink()} target="_blank" rel="noopener noreferrer" className="text-dark">{this.shortenVotes(this.props.upVotes)} &#8679;</a></span>
                <span className="button-custom bg-danger"><a href={this.getLink()} target="_blank" rel="noopener noreferrer" className="text-white">{this.props.comments} &#9829;</a></span>
                <button style={{transform: "rotate(90deg)", fontSize: "30px"}} className={this.props.darkMode ? "p-0 btn ml-2 text-darkmode-grey" : "p-0 btn ml-2"} onClick={this.toClipBoard}>&#x2026;</button>

              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
