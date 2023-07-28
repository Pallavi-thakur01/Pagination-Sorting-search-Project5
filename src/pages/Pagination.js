import axios from "axios";
import React, { useState, useEffect } from "react";
import { ImProfile } from "react-icons/im";
import { AiOutlineArrowUp } from "react-icons/ai";
import { AiOutlineArrowDown } from "react-icons/ai";
import {FiSearch} from "react-icons/fi";

import LoadingSpinner from "../components/LoadingSpinner";

const Pagination = () => {
  const [post, setPost] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(1); // No of pages
  // const [postPerPage] = useState(10);
  const postPerPage = 50;
  const [SearchBar, setSearchBar] = useState("");
  const [searchArr, setSearchArr] = useState([]);
  const [sorted, setSorted] = useState("ASC");
  const [sorted1, setSorted1] = useState("ASC");
  const [searchValArray, setSearchArray] = useState([]);
  

  const [isIconClicked, setIsIconClicked] = useState(false);
  // const [isIconClicked1, setIsIconClicked1] = useState(false);
  const [length, setLength] = useState(0);
  const [open, setOpen] = useState({
    sort: 1,
    id: "name",
  });
  const sorting = (col) => {
    setIsIconClicked(!isIconClicked);
    console.log(col);
    if (sorted === "ASC") {
      setOpen({
        ...open,
        sort: 1,
        id: col,
      });
      const sorted = [...post].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setPost(sorted);
      setSorted("DSC");
    } else if (sorted === "DSC") {
      setOpen({
        ...open,
        sort: -1,
        id: col,
      });
      const sorted = [...post].sort((a, b) => (b[col] > a[col] ? 1 : -1));
      setPost(sorted);
      setSorted("ASC");
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const getData = async () => {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/comments`,
        {
          headers: {
            "x-rapidapi-host": "jsonplaceholder.typicode.com",
          },
        }
      );
      const dataJ = res.data;
      dataJ.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }

        return 0;
      });

      setPost(dataJ);
      setIsLoading(false) 
    };
    getData();
  }, []);

  const lastPost = number * postPerPage;
  const firstPost = lastPost - postPerPage;
  const currentPost = post.slice(firstPost, lastPost);
  console.log(currentPost, "cccccc");

  // const [pageNumber] = useState([1, 2, 3]);

  //   for (let i = 1; i <= Math.ceil(post.length / postPerPage); i++) {
  //     pageNumber.push(i);
  //   }
  const npages = Math.ceil(
    // searchValArray.lenhgth
    SearchBar
      ? searchValArray.length / postPerPage
      : post.length / postPerPage
  );
  

  const numbers = [...Array(npages + 1).keys()].slice(1);
 
  const searchData = () => {
    if (SearchBar) {
      const dataArr = post
        .filter((id) => {
          return SearchBar.toLowerCase() === ""
            ? id
            : id.name.toLowerCase().includes(SearchBar);
        })
      //   .slice(firstPost, lastPost);
      // setSearchArr(dataArr);
      const filterData=dataArr.slice(firstPost,lastPost)
      setSearchArr(filterData);
      setSearchArray(dataArr);
      // setPost(dataArr);  
    }
     else {
     
      setSearchArr(post.slice(firstPost, lastPost));
      
    }
    
  };
// useEffect(()=>{
//   SearchBar();
// },[SearchBar])



  useEffect(() => {
    searchData();
    setNumber(1);
  }, [SearchBar, firstPost, lastPost, post]);

  useEffect(() => {
    console.log("searchArr", searchArr);
  }, [searchArr]);

  const ChangePage = (pageNumber) => {
    setNumber(pageNumber);
  };
  return (
    <>
    {isLoading ? <LoadingSpinner/> : 
      <div className="container">
     
        <div className="row bg-dark">
       
       
          <nav className="navbar navbar-dark bg-dark border border-light navSticky sticky-top p-3">
            <div className="container-fluid">
              <a className="navbar-brand  fw-bold fs-2">
                {" "}
                <ImProfile /> Data-Table
              </a>
              <form className="d-flex">
                <input
                
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search "
                  onChange={(e) => setSearchBar(e.target.value)}
                 
                /> 
                <button className="btn " type="submit">
                  <FiSearch style={{color:"white", fontSize:"25px"}} />
                </button>
              </form>
            </div>
          </nav>
         
          <div style={{ overflowY: "scroll", height: "570px" }}>
         
            <table className="table  table-striped table-dark shadow table-hover ">
              <thead  style={{position: "sticky", top: 0}} className="border border-light border-bottom">
                <tr className="border-2 border-dark text-center my-2  tableHead ">
                  <th
                  style={{position: "sticky", top: "-1px"}} 
                    scope="col"
                    className="col-1 border-2 border-dark fs-4 text-capitalize p-3 mx-3"
                  >
                    #
                  </th>
                  <th
                  style={{position: "sticky", top: "-1px"}} 
                    scope="col"
                    className="col-3 border-2 border-dark fs-4 text-capitalize p-3"
                  >
                    Name
                    <button
                      className="btn btn-dark"
                      onClick={() => {
                        sorting("name");
                      }}
                    >
                      {open.sort === 1 && open.id == "name" && (
                        <AiOutlineArrowUp />
                      )}
                      {open.sort === -1 && open.id == "name" && (
                        <AiOutlineArrowDown />
                      )}
                    </button>
                  </th>
                  <th
                  style={{position: "sticky", top: "-1px"}} 
                    scope="col"
                    className="col-2 border-2 border-dark fs-4 text-capitalize  p-3"
                    onClick={() => {
                      sorting("email");
                    }}
                  >
                    Email
                    <button className="btn btn-dark">
                      {open.sort === 1 && open.id == "email" && (
                        <AiOutlineArrowDown />
                      )}
                      {open.sort === -1 && open.id == "email" && (
                        <AiOutlineArrowUp />
                      )}
                    </button>
                  </th>
                  <th
                  style={{position: "sticky", top: "-1px"}} 
                    scope="col"
                    className="col-6 border-2 border-dark fs-4 text-capitalize p-3"
                    onClick={() => {
                      sorting("body");
                    }}
                  >
                    Comments
                    <button className="btn btn-dark">
                      {open.sort === 1 && open.id == "body" && (
                        <AiOutlineArrowDown />
                      )}
                      {open.sort === -1 && open.id == "body" && (
                        <AiOutlineArrowUp />
                      )}
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchArr.map((Val) => {
                  console.log(currentPost, "currentt");
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
            <nav
              className="m-3 sticky-bottom"
              aria-label="Page navigation example"
            >
              <ul className="pagination justify-content-center ">
                <li className="page-item ">
                  <button
                    className="px-3 py-1 m-1 text-center btn-primary  btn-outline-secondary buttonHover shadow fw-bold"
                    disabled={number === 1}
                    onClick={() => setNumber(number - 1)}
                  >
                    Prev
                  </button>
                </li>
                {numbers.map((Elem, i) => {
                  return (
                    <li
                      className={`page-item  text-dark hoverClass ${
                        currentPost === Elem ? "active" : ""
                      }`}
                      key={i}
                    >
                      <button>
                      
                        <a
                          href="#"
                          className="page-link  text-dark rounded-pill "
                          onClick={() => {
                            ChangePage(Elem);
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          {Elem}
                        </a>
                      </button>
                    </li>
                  );
                })}

                <li className="page-item">
                  <button
                    className="px-3 py-1 m-1 text-center btn-primary btn-outline-secondary buttonHover shadow fw-bold"
                    disabled={number === npages}
                    onClick={() => setNumber(number + 1)}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
         
        </div>
      </div>
}
      
    </>
  );
};

export default Pagination;
