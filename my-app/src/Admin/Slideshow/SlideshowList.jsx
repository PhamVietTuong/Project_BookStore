import { faCheck, faPlus, faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AxiosClient from "../../Axios/AxiosClient";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";

const SlideshowList = () => {
    const [Slideshows, setSlideshows] = useState([]);
    const fileInputRef = useRef(null);
    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const [selectedSlideshow, setselectedSlideshow] = useState({});
    const openFile = () => {
        fileInputRef.current.click();
    }

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        const formData = new FormData(); 
        formData.append('name', file.name);
        formData.append('userId', "d3fc03fa-c73f-404a-90f1-e11ad4fe8843");
        AxiosClient.post(`/Slideshows`, formData).then(() => { window.location.reload(); });
    }

    const handleShowDelete = (id) => {
        setselectedSlideshow(Slideshows.find(a => a.id == id));
        setShowDelete(true);
    }

    const handleDelete = () => {
        AxiosClient.delete(`/Slideshows/${selectedSlideshow.id}`);
        let list = Slideshows;
        list.splice(Slideshows.findIndex(a => a.id == selectedSlideshow.id), 1);
        setSlideshows(list);
        setShowDelete(false);
    }

    useEffect(() => {
        AxiosClient.get(`/Slideshows`).then((res) => { setSlideshows(res.data);})
    }, []);


    return (
        <>
            <div>
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-12 d-flex no-block align-items-center">
                            <h4 className="page-title">Danh sách slideshow</h4>
                            <div className="ml-auto text-right">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                                        <li className="breadcrumb-item active" aria-current="page">Library</li>
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
                                    <div className="row">
                                        {
                                            Slideshows.map((item) => {
                                                return (
                                                    <>
                                                        <div class="col-lg-3 col-md-6">
                                                            <div class="card">
                                                                <div class="el-card-item">
                                                                    <div class="el-card-avatar el-overlay-1"> <img src={`https://localhost:7106/images/${item.name}`} alt="" style={{ width: "100%" }} />
                                                                        <div class="el-overlay">
                                                                            <ul class="list-style-none el-info">
                                                                                <li class="el-item"><a class="btn default btn-outline el-link" href="javascript:void(0);" onClick={() => handleShowDelete(item.id)}><FontAwesomeIcon icon={faTrash} /></a></li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                    
                                                )
                                            })
                                        }
                                        <div className="col-md-6 col-lg-2 col-xlg-3" >
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                                onChange={handleFileSelect}
                                            />
                                            <div className="card card-hover">
                                                <div className="box text-center" onClick={openFile}>
                                                    <h1 className="font-light text-black"><FontAwesomeIcon icon={faPlus} /></h1>
                                                </div>
                                            </div>
                                        </div>
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
                <Modal.Body>Bạn có chắc muốn xóa slideshow này không?</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faCheck} /> Đồng ý
                    </Button>
                    <Button variant="secondary" onClick={handleCloseDelete}>
                        <FontAwesomeIcon icon={faTimes} /> Hủy bỏ
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SlideshowList;