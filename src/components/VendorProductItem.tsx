import React from 'react'
import style from '../styles/vendor.module.css'
import Carousel from 'react-bootstrap/Carousel';
import {useRouter} from 'next/router'


function VendorProductItem(props:any) {
    const product=props.probs
    
    
    
    const router=useRouter()
    


  
    const handleClick=async(id:any)=>{ 
        
        
        router.push({
          pathname:'/VendorUpdateProduct',
          query:{
            productId:id
          }

        }
        )
    }

  return (
    <>



<div className="col-md-4 mt-4">
        <div className={`${style.productItem} card text-center p-3 shadow-sm`} >
        <p className={style.product_title}>{product.name}</p>
        {product.salePrice < product.price ? <p className={style.price}>
            <del>{product.price}</del>
            <span>{product.salePrice}</span>
        </p> : <p className={style.price}>{product.price}</p>}

        <Carousel>
            {product.images.map((image:any,index:any)=>{
                
                  return  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={image}
                      style={{width:'100%',height:'13rem',maxHeight:'13rem',objectFit:'contain'}}
                      alt="First slide"
                    />
                  
                  </Carousel.Item>

            })}   
    </Carousel>


    {product.description.length<60?<p className={style.description}> {product.description}</p>:<p className={style.description}>{product.description.substring(0,60)}...</p>}
       <div className='d-flex justify-content-between align-item-center'>
       <p >In stock : {product.initialStock}</p>
       
       <button className={`btn ${style.edit_btn} `} onClick={()=>handleClick(product.id)}>Edit</button>
       </div>
        </div>
    </div>
    
    
    </>
  )
}

export default VendorProductItem