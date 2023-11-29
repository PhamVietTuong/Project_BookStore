import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {

    const [Products, setProducts] = useState([]);
   

    useEffect(() => {
        axios.get(`https://localhost:7106/api/Books`)
            .then(res => setProducts(res.data));
    }, []);
    return ( 
    <>
        
         <div className="container">
               <div className="card">
                <div>
                    <Link to={'add'} style={{float: "right"}} className="btn btn-success">
                            <FontAwesomeIcon icon={faPlus}/> Add product                                                                                           
                    </Link>
                </div>
                  <hr/>
                    <ul className="bags">
                      
                    {Products.map(item => {
                            return (
                                <li>
                                    <div className="bag_box">
                                    <div className="box1">
                                        <img src={`https://localhost:7106/Images/${item.imageId}`}/>
                                        
                                    </div>
                                        <h4>{item.name}</h4>
                                        <h4>{item.description}</h4>
                                        <h5>{item.price}</h5>
                                    </div>      
                                </li>
                            )
                        })}
                    </ul>
               </div>
           </div>
        
    </>);
}
 
export default ProductList;