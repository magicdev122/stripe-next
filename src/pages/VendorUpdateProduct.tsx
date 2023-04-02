import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import VendorNavbar from "../components/adminNavbar";
import { db } from "@utils/firebase";

import {
  doc,
  collection,
  updateDoc,
  deleteDoc,
  getDocs
} from "firebase/firestore";

import { toast, Toaster } from "react-hot-toast";

import style from "../styles/profile.module.css";
import Link from "next/link";



function VendorUpdateProduct() {
  const initailState = {
    name: "",
    price: "",
    description: "",
    category: "",
    initialStock: "",
    salePrice: "",
  };
  const [productItem, setProductItem] = useState(initailState);
  
  
  
  const router = useRouter();
  const query=router.query
  const productId:any=query.productId?query.productId:""
  const getData=async()=>{
    
    
    try {
        const data = await getDocs(collection(db, "products"));
        
        
        
        data.forEach((doc: any) => {
          if(doc.id===productId){
            
            setProductItem(doc.data())
              
              
              
  
            
          }
         
          
        });
        
    } catch (error:any) {

        
    }
  }
  useEffect(() => {
   getData()
    
  }, []);
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      

      

      await updateDoc(doc(db, "products",productId), productItem);
      
      toast.success("product updated successfully");
    } catch (error:any) {
      
      toast.error(error.message);
    }
  };

  const handleChange = async (e: any) => {
    setProductItem({ ...productItem, [e.target.name]: e.target.value });
  };
  
  const deleteProduct=async()=>{
    try {
      
      await deleteDoc(doc(db, "products",productId));
      
      toast.success("product deleted successfully");
      router.push("/adminDashboard");
    } catch (error:any) {
      
      toast.error(error.message);
    }
  }
  

  return (
    <>
      <VendorNavbar />

      <Toaster />
      
      <div className={` ${style.formContainer} container mt-5 `}>
        <Link href="adminDashboard">
          <button
            className={`btn ${style.back_btn} btn-light `}
            style={{ fontSize: "large" }}
          >
            &#8592; Back{" "}
          </button>
        </Link>
        <form onSubmit={handleSubmit}>
          <div className={`row mt-4 px-3`}>
            <div className="col-md-6">
              <span>Product name*</span>
              <input
                type="text"
                value={productItem.name}
                name="name"
                onChange={handleChange}
                className="form-control mt-2"
                required
              />
            </div>
            <div className="col-md-6">
              <span>Product Price*</span>
              <input
              min={1}
                type="number"
                value={productItem.price}
                name="price"
                onChange={handleChange}
                className="form-control mt-2"
                required
              />
            </div>
          </div>

          <div className="row mt-4 mx-2">
            <div className="col-md-6">
              <span>Product Category*</span>
              <input
                type="text"
                className="form-control mt-2"
                value={productItem.category}
                name="category"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <span>Product Description *</span>
              <input
                type="text"
                className="form-control mt-2"
                value={productItem.description}
                name="description"
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="row mt-4 mx-2">
            <div className="col-md-6">
              <span> Stock*</span>
              <input
                type="number"
                min={1}
                className="form-control mt-2"
                value={productItem.initialStock}
                name="initialStock"
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-6">
              <span>Sale Price (if not sale enter original price)*</span>
              <input
              min={1}
                type="number"
                className="form-control mt-2"
                value={productItem.salePrice}
                name="salePrice"
                onChange={handleChange}
                required
              />
            </div>
            {/* <div className="col-md-6 mt-4">
              <span>Product Images *</span>
              <input
                type="file"
                multiple
                accept="image/png, image/gif, image/jpeg"
                className="form-control mt-2"
                name="image"
                onChange={handleImageChange}
                disabled
              />
            </div> */}
          </div>

          <div className="row mt-4 mx-2">
            <div className="col-md-6">
              <button type="submit" className="btn">
                Update product
              </button>
            </div>
            <div className="col-md-6 text-end">
              <span className="btn btn-danger" onClick={deleteProduct}>Delete</span>
            </div>
          </div>
        
        </form>
      </div>
    </>
  );
}

export default VendorUpdateProduct;
