

import React, { useState, useEffect } from "react";
import { DataView } from "primereact/dataview";
import { Card } from "primereact/card";
import useFetch from "../hooks/useFetch";
import "primeflex/primeflex.css";
import AddPostDialog from "./addPostDialog";



export let newPost={};


//Component that displays for a user the posts he published
//props:
//-sUser: An object containing the user selected in the <UsersDataTable/>, for whom the posts should be displayed
const UserPost = (props) => {

  const { fetchGet } = useFetch()

  //URL for fetching data 
  const [url, setUrl] = useState("");

  //All posts
  const [posts, setPosts] = useState([]);

  
  const[loading,setLoading]=useState(true)

  //Indicates whether to add a new post to the list of posts
  const [add,setAdd]=useState(false)

  //Edits the URL every time a user is selected in the <UsersDataTable/>, and when user add post
  useEffect(
    () => {
    
        
        if(props.sUser!==null){
          setUrl(`https://jsonplaceholder.typicode.com/posts?userId=${props.sUser.id}`);

          if(newPost[props.sUser.id]!==undefined){
            setPosts(newPost[props.sUser.id]);
          }
          else{
            setPosts([])
          }
          
          }
    },
    [props.sUser,add]
  );





  //Fetches posts when the URL changes or adding a post
  useEffect(
    () =>{ 
      fetchGet(url, setPosts);
      setLoading(false)
    }, [url,add]);


  //Gets a post and returns a view for it
  const itemTemplate = (post) => {
    return (
      <div className="col-12">
        <div className="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
          <Card title={post.title} className="col-12">
            <p className="m-0">{post.body}</p>
          </Card>
        </div>
      </div>
    );
  };

  //Header. Contains an option to add a new post for the current user
  const renderHeader = () => {
    return (
      props.sUser &&
      <div className=" inline flex lg:flex-row sm:flex-column justify-content-between align-items-center flex-wrap ">
        Posts of {props.sUser.name}
        <AddPostDialog userId={props.sUser.id} setAdd={setAdd} ></AddPostDialog>
      </div>
    );
  };

  const header = renderHeader();





  return (
    <div className="card  h-100% ">
      <DataView value={posts} itemTemplate={itemTemplate} layout={"grid"} loading={loading} emptyMessage={'Please select user'} header={header} className="h-screen overflow-auto	"/>
    </div>
  );
};

export default UserPost;
