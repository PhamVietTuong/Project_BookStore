import { useEffect, useState } from "react";
import AxiosClient from "../../Axios/AxiosClient";
import { useNavigate } from "react-router-dom";

const DisplayCommnent = () => {
  const [DisplayComments, setDisplayComments] = useState([]);
  const [Comments, setComments] = useState({
    parentCommentId: 1,
    bookId: 24,
    userId: "e3137058-b105-49ca-ae6b-858c372a6af0",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setComments((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    AxiosClient.post(`/Comments`, Comments).then(() => {
      navigate("/admin/DisplayComment");
    });
  };

  useEffect(() => {
    AxiosClient.get(`/Comments/NewComments`).then((res) => {
      setDisplayComments(res.data);
    });
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="col-md-12">
          <div className="card card-primary card-outline">
            <div className="card-header">
              <h3 className="card-title">Bình luận mẫu</h3>
            </div>

            <div className="card-body">
              <div className="form-group">
                <textarea
                  id="compose-textarea"
                  className="form-control"
                  style={{ height: 300 }}
                  onChange={handleChange}
                  name="content"
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="float-right">
                {/* <button type="button" className="btn btn-default">
                <i className="fas fa-pencil-alt" /> Draft
              </button> */}
                <button type="submit" className="btn btn-primary">
                  <i className="far fa-envelope" /> Send
                </button>
              </div>
              {/* <button type="submit" className="btn btn-default">
              <i className="fas fa-times" /> Discard
            </button> */}
            </div>
          </div>
        </div>
      </form>

      <div>
      {DisplayComments.map((item) => {
        return (
          <>
            <div>
              <dt>{item.user.fullName}</dt>
              <dd>{item.content}</dd>
              <hr/>
            </div>
          </>
        );
      })}
      </div>
      
    </>
  );
};
export default DisplayCommnent;
