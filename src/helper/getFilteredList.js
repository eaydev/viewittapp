export default async function getFilteredList(sub, type, contentType, after, sort){
  //Checking to see if we reached the end of the list.
  //This function is designed to be called recursively until some picture posts are found
  //will return a null once there are no more pages.

  if(after === null){
    return Promise.reject("That was all the posts!");
  }

  let subreddit = sub;
  let pageType = type;
  let content = contentType;

  //Basic regex identifiers for output data types in the Reddit api.
  const dataTypes = {
    image: "jpg|gif",
    video: "gfycat",
    media : "gfycat|jpg|gif"
  }

  //Figuring out the sort request as per function parameter.
  let sortParamenter = "/";
  sort !== undefined ? sortParamenter += sort : sortParamenter = "";

  //Composing the URL to fit the request. Will insert the URL attribute as per inserted function parameters.
  let URL = `https://www.reddit.com/${pageType === 'r' ? 'r' : 'user'}/${subreddit}${sortParamenter}.json?${after !== undefined ? `after=${after}`: ""}`;

  let filteredPosts = [];
  let afterGot;
    try{
      let response = await fetch(URL);
      //Catch the 403.
      if(response.ok){
        let data = await response.json();
        let posts = data.data.children;
        //After - for pagination. To be returned.
        afterGot = data.data.after;
        //Derive regex from data type requested.
        let regex = new RegExp(dataTypes[content]);
        //Loop through content and filter based on content of url.
        for (let i = 0; i < posts.length; i++) {
          //Start composing a potential post.
          let newPost = {
            title: posts[i]["data"]["title"],
            author: posts[i]["data"]["author"],
            upvotes: posts[i]["data"]["ups"],
            comments : posts[i]["data"]["num_comments"],
            link: posts[i]["data"]["permalink"],
          }

            //Add time since upload attribute
            let currentDate = new Date();
            let testDate = new Date(posts[i]["data"]["created_utc"] * 1000);
            // To calculate the time difference of two dates
            let Difference_In_Time = currentDate.getTime() - testDate.getTime();
            // To calculate the no. of days between two dates
            let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

            if(Difference_In_Days.toFixed(2).split(".")[0] >= 1){
              newPost["timeSinceUpload"] = Difference_In_Days.toFixed(2).split(".")[0] + " day(s) ago";
            } else if((Difference_In_Days * 24).toFixed(2).split(".")[0] <= 24 && (Difference_In_Days * 24).toFixed(2).split(".")[0] > 0) {
              newPost["timeSinceUpload"] = (Difference_In_Days * 24).toFixed(2).split(".")[0] + " hours ago";
            } else {
              newPost["timeSinceUpload"] = (Difference_In_Days * 24 * 60).toFixed(2).split(".")[0] + " mins ago";
            }
            //Return reddit hosted video data.
            if(Object.keys(posts[i]["data"]).includes("media")){
                if(posts[i]["data"]["media"] !== null && Object.keys(posts[i]["data"]["media"])[0] === "reddit_video"){
                    newPost["redditHostedVideo"] = posts[i]["data"]["media"]["reddit_video"];
                    newPost["gfycatHostedVideo"] = undefined;
                    newPost["picture"] = undefined;
                    filteredPosts.push(newPost);
                    continue;
                }
            }
            //Returning embed data for gfycat
            if(Object.keys(posts[i]["data"]).includes("media_embed")){
              if(Object.keys(posts[i]["data"]["media_embed"]).includes("content")){
                newPost["redditHostedVideo"] = undefined;
                newPost["gfycatHostedVideo"] = posts[i]["data"]["media_embed"]["content"];
                newPost["picture"] = undefined;
                filteredPosts.push(newPost);
                continue;
              }
            }
            //Returning picture based post.
            if (regex.test(posts[i]["data"]["url"])) {
              newPost["redditHostedVideo"] = undefined;
              newPost["gfycatHostedVideo"] = undefined;
              newPost["picture"] = posts[i]["data"]["url"];
              filteredPosts.push(newPost);
              continue;
            }
        }

        // Recursion until after is null or we get a list of filtered posts
        if (filteredPosts.length === 0) {
          if(afterGot !== null){
            return getFilteredList(subreddit, pageType, content, afterGot);
          } else {
            return Promise.reject("No (more) picture posts found.");
          }
        }

        return (
          {
            posts : [...filteredPosts],
            after: afterGot
          }
        );
      } else {
        return Promise.reject("That subreddit access is prohibited.");
      }
    } //End of try.
    //Error logging.
    catch(err){
     return Promise.reject(err);
   }
}
