import React, {  useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import useFetch from "../hooks/useFetch";
import { Toast } from 'primereact/toast';

import { newPost } from "./userPost";




//Component that performs the addition of a new post for a user
//props:
//userId: The id of the user to which a post is added
//setAdd: A state indicating whether a post has been added and the list of posts needs to be updated
const AddPostDialog = (props) => {
  const { fetchPost } = useFetch()

  //When visible=true, a dialog for adding a post is displayed
  const [visible, setVisible] = useState(false);
  
  //Title & Body of the new post
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  //validation=false, post editing mode
  //validation=true, the new post confirmation mode
  const [validation, setValidation] = useState(false);

  const toast = useRef(null);

  //Adds the new post and update the posts list
  const fetch =async () => {
    const bodyReq={ 'title': title, 'body': body, 'userId': props.userId }
    const res= await fetchPost(bodyReq);
    console.log(res);
    

    //Indicates that a new fetch must be done in order to display the updated list of posts
    res===201&&toast.current.show({ severity: 'info', summary: 'Success', detail: 'Add your post!😀' })&&newPost[props.userId] !== undefined ? newPost[props.userId].push(bodyReq) : newPost[props.userId] = [bodyReq]&& props.setAdd(add=>!add)
    res===400&&toast.current.show({ severity: 'warn', summary: 'Error', detail: 'oops. 😫 Fashlanation 😛😛' });
    res===500&&toast.current.show({ severity: 'error', summary: 'Error', detail: 'You have an error😪 Try later' });

   

  };
  
  //Returns a view of a dialog for adding a post
  const createPost = () => {
    return (
      <div className="flex flex-column gap-2">
        <label htmlFor="title">Title</label>
        <InputText
          type="text"
          id="username"
          aria-describedby="username-help"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="body">Body</label>
        <InputTextarea
          autoResize
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          cols={30}
        />

        <Button
          icon="pi pi-plus"
          outlined
          className="mt-2"
          onClick={() => setValidation(true)}
        />
      </div>
    );
  };

  //When the dialog closes
  const colseDialog = () => {
    setBody("");
    setTitle("");

    setVisible(false);
    setValidation(false);
  }

  //Returns a post confirmation view
  const validatePost = () => {
    return (
      <>
        <div className="flex flex-column gap-2">
          This is your new post. Confirm it?
          <h2>{title}</h2>
          <p className="m-0">
            {body}
          </p>
        </div>

        <Button icon="pi pi-check" label="Confirm" outlined onClick={() => fetch()} className="mt-5" />
        <Toast ref={toast} position="center" onHide={colseDialog} />
      </>

    );
  };


  return (
    <div className="card flex justify-content-center">
      <Button label="Add new" onClick={() => setVisible(true)} />
      <Dialog
        header="Add new Post"
        visible={visible}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        {!validation && createPost()}
        {validation && validatePost()}
      </Dialog>
    </div>
  );
};

export default AddPostDialog;
