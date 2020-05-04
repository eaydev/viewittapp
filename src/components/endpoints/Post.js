import React from 'react';

const Post = (props) =>{
  const toClipBoard = () =>{
    //Choosing source for post.
    let postSrc;
    if(props.redVid !== undefined){
      postSrc = getLink();
    } else if(props.embed !== undefined){
      postSrc = getLink();
    } else {
      postSrc = props.imgSrc;
    }
    //Putting together clipboard message.
    let message = `"${props.title}": ${postSrc} viewed on viewitt`;
    //Check clipboard .js
    window.Clipboard.copy(message);
    props.copyHandler(
      {
        text: "Copied post 👍",
        type: "info"
      });
  }


  const getLink = () =>{
    return "https://www.reddit.com" + props.link;
  }

  const modalHandler = () =>{
    props.modalHandler(props.imgSrc);
  }

  const htmlDecode = (input) =>{
   var e = document.createElement('div');
   e.innerHTML = input;
   return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
  }

  const shortenVotes = (upvotes) => {
    let votes = upvotes.toString().split('');
    if (votes.length > 3){
      let k = votes.splice(votes.length - 3, 3);
      let afterK = k[0];
      return votes.join('') + "."+ afterK + "k";
    } else {
      return upvotes;
    }
  }

  //Establishing the embed.
  let embed = undefined;
  if(props.redVid !== undefined){
      embed = `<video controls name="media"><source src="${props.redVid.fallback_url}" type="video/mp4"/></video>`;
    } else if(props.embed !== undefined){
      embed = htmlDecode(props.embed);
   }
  return(
    <div className={props.darkMode ? "col-lg-4 col-md-6 col-12 mb-3 shadow" : "col-lg-4 col-md-6 col-12 mb-3"}>
      <div className={props.darkMode ? "card border-0 bg-darkmode-lightblack p-2 rounded" : "card bg-white p-2 rounded"}>
        {embed !== undefined ?
          <div className="card-img-top card-custom rounded-lg" dangerouslySetInnerHTML={{__html: embed}}></div> :
          <div className="card-img-top card-custom cursor-pointer d-none d-md-block" style={{background: `url(${props.imgSrc})`}} onClick={modalHandler}></div>
        }
          {/*Only show this for single columns*/}
          <div className="d-none d-block d-md-none">
            <img src={props.imgSrc} alt={`${props.title} from ${props.author}`} className="img-fluid cursor-pointer" onClick={modalHandler}/>
          </div>

        <div className="card-body m-0 p-0">
          <p className={props.darkMode ? "card-text text-center border-bottom p-3 text-darkmode-grey"
            : "card-text text-center border-bottom p-3"}
            style={{fontSize: "17px"}}
          >{props.title}</p>
          <a href={getLink()} target="_blank" rel="noopener noreferrer" className={props.darkMode ? "btn btn-sm border-0 text-darkmode-grey font-weight-bold" : "btn btn-sm border-0 text-dark font-weight-bold m-0}"}>{props.author}</a>


          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group p-0 m-0">
              <button type="button" className={props.darkMode ? "btn btn-sm border-0 text-muted m-0 pr-0 pl-0 pr-0 ml-2 text-darkmode-grey" : "btn btn-sm border-0 text-muted m-0 pr-0 pl-0 pr-0 ml-2"} style={{fontSize:"12px"}}>{props.time}</button>
            </div>
            <div className="p-0 m-0">
              <span className="button-custom bg-warning"><a href={getLink()} target="_blank" rel="noopener noreferrer" className="text-dark">{shortenVotes(props.upVotes)} &#8679;</a></span>
              <span className="button-custom bg-danger"><a href={getLink()} target="_blank" rel="noopener noreferrer" className="text-white">{props.comments} &#9829;</a></span>
              <button style={{transform: "rotate(90deg)", fontSize: "30px"}} className={props.darkMode ? "p-0 btn ml-2 text-darkmode-grey" : "p-0 btn ml-2"} onClick={toClipBoard}>&#x2026;</button>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post;
