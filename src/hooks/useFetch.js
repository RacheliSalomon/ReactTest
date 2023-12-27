import { useState, useEffect } from "react";




//Custom Hook for fetching data
const useFetch = () => {

    //GET method- Gets a URL and setState, after the fetch is performed setState(data)
    const fetchGet = (url, setData,setLoading) => {
        
        try {
            setLoading(true);
            fetch(url )
                .then((response) => response.json())
                .then((json) => setData(prev=>[...prev,...json]));
            setLoading(false);
                
        }
        catch (error) {
            console.error(error);
            setData("OOOPS🙄😫 An error occurred while get data. Try again")
        }


    };



    //POST method- Gets the post' body 
    const fetchPost = (post) => {
        try {
            fetch('https://jsonplaceholder.typicode.com/posts', {
                method: 'POST',
                body: JSON.stringify({
                    title: post.title,
                    body: post.body,
                    userId: post.userId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
        }
        catch (error) {
            console.error(error);
            return <>"OOOPS🙄😫 An error occurred while post data. Try again"</>
        }

    }

    return { fetchGet, fetchPost };
};

export default useFetch;


