
import axios from 'axios';
import React, { useState, useEffect } from "react";
import {ImProfile} from "react-icons/im";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown} from "react-icons/ai";


const Pagination = () => {
  const [post, setPost] = useState([]);
  const [number, setNumber] = useState(1); // No of pages
  const [postPerPage] = useState(10);
  const [SearchBar, setSearchBar] = useState("");
  const [searchArr, setSearchArr] = useState([]);
  const [sorted, setSorted] = useState("ASC");
 
  const [isIconClicked, setIsIconClicked] = useState(false);
  // const [isIconClicked1, setIsIconClicked1] = useState(false);


  const sorting = (col) => {
    setIsIconClicked(!isIconClicked);
    console.log(col);
    if (sorted === "ASC") {
      const sorted = [...post].sort((a, b) =>
        a[col]> b[col] ? 1 : -1
      );
      setPost(sorted);
      setSorted("DSC");
      
      
    }
    else if(sorted==="DSC"){
      const sorted = [...post].sort((a, b) =>
      b[col]> a[col] ? 1 : -1
    );
    setPost(sorted);
      setSorted("ASC");
    }
  };
  
  

  useEffect(() => {
    const getData = async () => {
       const res  = await axios.get(`https://jsonplaceholder.typicode.com/comments`,
      {headers: {
       'x-rapidapi-host': 'jsonplaceholder.typicode.com',
       
   }})
   const dataJ = res.data;
     
      setPost(dataJ);
    };
    getData();
  }, []);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post.slice(firstPost, lastPost);
  console.log(currentPost,"cccccc");
  
  const [pageNumber] = useState([1,2,3]);

//   for (let i = 1; i <= Math.ceil(post.length / postPerPage); i++) {
//     pageNumber.push(i);
//   }




const searchData =()=>{
  if(SearchBar){

  const dataArr = post.filter((id)=>{
    return SearchBar.toLowerCase()==='' ? id :
     id.name.toLowerCase().includes(SearchBar) ;
  }).slice(firstPost,lastPost)
    setSearchArr(dataArr)
  }else{
    setSearchArr(post.slice(firstPost,lastPost))
  }
}
useEffect(()=>{
  searchData()
}, [SearchBar,firstPost,lastPost,post])

useEffect(()=>{
console.log('searchArr',searchArr);
}, [searchArr])

  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };
  return (
    <>
      <div className="container">
        <div className="row bg-dark" >
          
        <nav className="navbar navbar-dark bg-dark border border-light navSticky sticky-top p-3">
  <div className="container-fluid">
    <a className="navbar-brand  fw-bold fs-2"> <ImProfile/> Data-Table</a>
    <form className="d-flex">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search "  onChange={(e) => setSearchBar(e.target.value)}/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
  </div>
</nav>
           <div>
          <table className="table  table-striped table-dark shadow table-hover ">
            <thead >
              <tr className="border-2 border-dark text-center my-2  tableHead ">
                <th scope="col" className="col-1 border-2 border-dark fs-4 text-capitalize p-3 mx-3">
                 #
                 {/* <button className='btn btn-dark' onClick={() => {sorting("id")}} >  {isIconClicked ?<AiOutlineArrowDown  />: <AiOutlineArrowUp  onClick={() => {sorting1("name")}}/>}</button>
                 */}
                </th>
                <th scope="col" className="col-3 border-2 border-dark fs-4 text-capitalize p-3">
                  Name  
                  {/* <AiOutlineArrowDown/> */}
                  <button className='btn btn-dark' onClick={() => {sorting("name")}} >  {isIconClicked ?<AiOutlineArrowDown  />: <AiOutlineArrowUp  />}</button>
                </th>
                <th scope="col" className="col-2 border-2 border-dark fs-4 text-capitalize  p-3">
                  Email
                  <button className='btn btn-dark' onClick={() => {sorting("email")}} >  {isIconClicked ?<AiOutlineArrowDown  />: <AiOutlineArrowUp  />}</button>
                
                </th>
                <th scope="col" className="col-6 border-2 border-dark fs-4 text-capitalize p-3">
                  Comments
                  <button className='btn btn-dark' onClick={() => {sorting("body")}} >  {isIconClicked ?<AiOutlineArrowDown  />: <AiOutlineArrowUp  />}</button>
                
                </th>
              </tr>
            </thead>
            <tbody>
              {searchArr.map((Val) => {
                 console.log(currentPost,"currentt")
                return (
                  <>
                    <tr
                      className="border-2 border-dark text-center"
                      key={Val.id}
                    >
                      <td className="border-2 border-dark text-capitalize">
                        {Val.id}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.name}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.email}
                      </td>
                      <td className="border-2 border-dark text-capitalize">
                        {Val.body}
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
         </div>

          <div className=" bg-dark text-center">
          <nav  className="m-3 sticky-bottom" aria-label="Page navigation example">
  <ul className="pagination justify-content-center ">
    <li className="page-item disabled "  onClick={() => setNumber(number - 1)}>
      <a className="page-link test-dark" href="#" tabindex="-1">Previous</a>
    </li>
    {pageNumber.map((Elem) => {
              return (
    <li className="page-item text-dark "><a className="page-link  text-dark" href="#" onClick={() => ChangePage(Elem)}>{Elem}</a></li>
              );
    })}
   
    <li className="page-item">
      <a className="page-link text-dark" href="#"  onClick={() => setNumber(number + 1)}
>Next</a>
    </li>
  </ul>
</nav>
            {/* <button
              className="px-3 py-1 m-1 text-center btn-primary  btn-outline-secondary buttonHover shadow"
              onClick={() => setNumber(number - 1)}
            >
              Previous
            </button>

            {pageNumber.map((Elem) => {
              return (
                <>
                  <button
                    className="px-3 py-1 m-1 text-center btn-outline-secondary buttonHover shadow active"
                    onClick={() => ChangePage(Elem)}
                  >
                    
                   {Elem}
                  </button>
                </>
              );
            })}
            <button
              className="px-3 py-1 m-1 text-center btn-primary   btn-outline-secondary buttonHover shadow"
              onClick={() => setNumber(number + 1)}
            >
              Next
            </button> */}
          </div>
          
        </div>
      </div>
    </>
  );
};

export default Pagination;