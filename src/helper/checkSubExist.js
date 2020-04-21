//CHECK IF VALID subreddit

export default async function checkSubExist(name, type = 'r'){
  // Reddit URL
  let URL = `https://www.reddit.com/search.json?q=${name}&include_over_18=on&type=sr%2Cuser`;
  // An object that holds keys relevant to code filtering.
  const pageType = {
    r : {kind: "t5",
         name: "display_name"
        },
    u : {kind: "t2",
         name: "name"
        }
  };
  //Catcher post list.
  let pageList = [];

  //Getting the data with fetch.
  let response = await fetch(URL);
  let data = await response.json();
  //Filtering the relevant data based on the type given.
  let pages =  data.data.children.filter(posts=>{return posts.kind === pageType[type]["kind"]});
  // Popping it into the check array
  pageList = pages.map((posts)=>{return posts.data[pageType[type]["name"]].toLowerCase()});

  //Check if name is included.
  if(pageList.includes(name)){
    return Promise.resolve("Name is valid and page exists.");
  } else {
    return Promise.reject("Name does not exist. Please check again.")
  }
}
