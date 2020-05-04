import React, {useEffect} from 'react';

const SearchBody = (props) =>{
  useEffect(()=>{
    //Adding listener post initial content.
    window.addEventListener("scroll", scrollHandler);

    //Cleanup for removal.
    return () => {window.removeEventListener("scroll", scrollHandler)};
  })

  const scrollHandler = () =>{
    let container = document.querySelectorAll(".album");
    let containerDimensions = container[0].getBoundingClientRect();
    let containerBottom = containerDimensions["bottom"];

    if(containerBottom <= window.innerHeight && props.postsLoading === false){
      props.loadHandler();
    }
  }
  return(
    <div className="album">
      <div className="container">
        <div className="row justify-content-center">
          {props.children}
        </div>
      </div>
    </div>
  )
}

export default SearchBody;
