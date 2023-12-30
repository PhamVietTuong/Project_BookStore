import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../Import/Import.jsx"
import { useNavigate } from "react-router-dom";

const CommentList = () => {
  const [CommentTheBook, setCommentTheBook] = useState([]);
  const [CommentTheBookAll, setCommentTheBookAll] = useState([]);

  const [selectedComment, setselectedComment] = useState({});
  const [selectedCommentDeleted, setselectedCommentDeleted] = useState({});
  const [showCommentDeleted, setShowCommentDeleted] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showDeleteAll, setShowDeleteAll] = useState(false);
  const handleCloseDelete = () => setShowDelete(false);
  const handleCloseDeleteAll = () => setShowDeleteAll(false);
  const handleCloseCommentDeleted = () => setShowDeleteAll(false);
  const navigate = useNavigate();

  const handleShowDelete = (id) => {
    setselectedComment(CommentTheBook.find((a) => a.id === id));
    setShowDelete(true);
  };

  const handleDelete = (e) => {
    
    AxiosClient.delete(`/Comments/${selectedComment.id}`);
    let list = CommentTheBook;
    setCommentTheBook(list);
    setShowDelete(false);
  };
//
  const handleShowCommentDeleted = (id) => {
    setselectedCommentDeleted(CommentTheBook.find((a) => a.id === id));
    setShowCommentDeleted(true);
  };

  const handleCommentDeleted = (e) => {
    e.preventDefault();
    AxiosClient.delete(`/Comments/CommentDeleted/${selectedCommentDeleted.id}`);
    let list = CommentTheBook;
    setCommentTheBook(list);
    setShowCommentDeleted(false);
  };
//
  const handleShowDeleteAll=()=>{
    setShowDeleteAll(true);
  }

  const handleCheckboxChange = (id) => {
    const updatedComments = CommentTheBookAll.map((comment) =>
      comment.id === id ? { ...comment, status: false } : comment
    );
    //setCommentTheBook(updatedComments);
    setCommentTheBookAll(updatedComments)
  };

  const handleDeleteAll = () =>{
      try{
        const commentToDelete = CommentTheBookAll.filter((comment) => comment.status === false )
        commentToDelete.map((item) =>
            AxiosClient.delete(`/Comments/${item.id}`)
        )   
        let list = CommentTheBookAll;
        setCommentTheBook(list);
      } catch(error){
          console.log('Error deleting comments:', error);
      }  
      setShowDeleteAll(false);
  }

  useEffect(() => {
    AxiosClient.get(`/Comments/CommentTheBook`).then((res) =>
      setCommentTheBook(res.data)
    );
  }, [CommentTheBook]);

  useEffect(() => {
    AxiosClient.get(`/Comments/CommentTheBook`).then((res) =>
      setCommentTheBookAll(res.data)
    );
  }, []);
//
  
  return (
    <>
      <div>
        <div className="page-breadcrumb">
          <div className="row">
            <div className="col-12 d-flex no-block align-items-center">
              <h4 className="page-title">Quản lý bình luận</h4>
              <div className="ml-auto text-right">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <a href="#">Home</a>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Library
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="table-responsive">
                    <table
                      id="myTable"
                      className="table table-striped table-bordered display nowrap"
                      style={{ width: "100%" }}
                    >
                      <tbody>
                        {/* {ImagesAreCommented.map((itemIAC) => {
                        return (
                          <>
                            <tr>
                              <td>
                                <div className="icheck-primary">
                                  <input
                                    type="checkbox"
                                    defaultValue=""
                                    id="check1"
                                  />
                                  <label htmlFor="check1" />
                                </div>
                              </td>
                              <td className="mailbox-name">
                                <a href="#">
                                  <img
                                    src={`https://localhost:7106/Images/${itemIAC.name}`}
                                    style={{ width: "100px" }}
                                  />
                                </a>
                              </td>

                              <td>
                                {CommentTheBook.map((itemCTB) => {
                                  return (
                                    <>
                                      {itemIAC.bookId === itemCTB.bookId ? (
                                        <div>
                                          <p className="mailbox-subject">
                                            <span>
                                              <b>{itemCTB.user.fullName}</b>{" "}
                                              {itemCTB.content}
                                              <button
                                                onClick={() =>
                                                  handleShowDelete(itemCTB.id)
                                                }
                                              >
                                                xóa
                                              </button>
                                            </span>
                                            <span>{itemCTB.status === false ? "ko được hiển thị" : "hiển thị"}</span>
                                            <span style={{ float: "right" }}>
                                              {itemCTB.date}
                                            </span>

                                           
                                          </p>
                                        </div>
                                      ) : null}
                                    </>
                                  );
                                })}                              
                              </td>
                            </tr>
                          </>
                        );
                      })} */}
                        {CommentTheBook.map((itemIAC) => {
                          return (
                            <>
                              <tr>

                                <td className="mailbox-name" >
                                <div style={{display:"flex", width:"100%"}} >
                                    <div className="icheck-primary" style={{flex:1, width:"30%"}}  >
                                      <input
                                        type="checkbox"
                                        name = "status"   
                                        //checked={itemIAC.status ? false : true}
                                        onChange={()=>handleCheckboxChange(itemIAC.id)}                                 
                                      />
                                      <label htmlFor="check1" />
                                    </div>
                                    <div style={{width:"70%"}}>
                                    <a href="#">
                                      <img
                                        src={`https://localhost:7106/Images/${itemIAC.imageName}`}
                                        style={{ width: "100px" }}
                                      />
                                    </a>
                                    </div>
                                </div>
                                </td>
                                <td  style={{ whiteSpace: "pre-wrap", maxWidth: "300px" }}>
                                  <div>
                                    <div
                                      className="mailbox-subject"                                  
                                    >
                                      <span>
                                        <b>{itemIAC.userName}</b>{" "}
                                        {itemIAC.content}
                                      </span>
                                      
                                    </div>
                                                        
                                  </div>
                                </td>
                                <td>                                
                                    <div >
                                        <p style={{marginBottom: "3rem"}}>
                                          {itemIAC.date}
                                        </p>  
                                        {itemIAC.status ?
                                         <button
                                          className="btn btn-danger"
                                          style={{float:"right"}}
                                          onClick={() =>
                                            handleShowDelete(itemIAC.id)
                                          }
                                        >Xóa</button> : 
                                        <button 
                                            onClick={()=> handleShowCommentDeleted(itemIAC.id)}
                                            className="btn btn-success" 
                                            style={{float:"right"}}>Hiển thị lại
                                        </button> }                                                                                          
                                    </div>
                                                                             
                                </td>
                              </tr>
                            </>
                          );
                        })}
                        <div className="App"></div>
                        
                      </tbody>
                      <button onClick={handleShowDeleteAll} style={{marginTop:"5px"}} className="btn btn-danger">Xóa nhiều</button>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={showDelete} onHide={handleCloseDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa bình luận này </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDelete}>
            <FontAwesomeIcon icon={faCheck} /> Đồng ý
          </Button>
          <Button variant="secondary" onClick={handleCloseDelete}>
            <FontAwesomeIcon icon={faTimes} /> Hủy
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal show={showDeleteAll} onHide={handleCloseDeleteAll} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa những bình luận này </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteAll}>
            <FontAwesomeIcon icon={faCheck} /> Đồng ý
          </Button>
          <Button variant="secondary" onClick={handleCloseDeleteAll}>
            <FontAwesomeIcon icon={faTimes} /> Hủy
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showCommentDeleted} onHide={handleCloseCommentDeleted} centered>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xóa</Modal.Title>
        </Modal.Header>
        <Modal.Body>Bạn có muốn xóa những bình luận này </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCommentDeleted}>
            <FontAwesomeIcon icon={faCheck} /> Đồng ý
          </Button>
          <Button variant="secondary" onClick={handleCloseCommentDeleted}>
            <FontAwesomeIcon icon={faTimes} /> Hủy
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CommentList;
