
//Custom Hook for fetching data
const useFetch = () => {



    //GET method- Gets a URL and setState, after the fetch is performed setState(data)
    const fetchGet = async(url, setData) => {
            await fetch(url)
            .then((response) => response.json())
            .then((json) => setData(prev => [...prev, ...json]))
            .catch(e => console.error(e));
    };



    //POST method- Gets the post' body 
    const fetchPost = async (post) => {


        let res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: JSON.stringify(post),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }).catch(e => console.error(e))

        return res.status;




    }

    return { fetchGet, fetchPost };
};

export default useFetch;


