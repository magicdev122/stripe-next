import React, { useEffect,useState } from 'react'



import { db } from "@utils/firebase";
import { collection, getDocs } from "firebase/firestore";

import Table from 'react-bootstrap/Table';
import style from '../styles/vendor.module.css'


import VendorNavbar from '../components/adminNavbar';




function VendorCustomers() {
    
    
    
    
   
    
  
    
  const [customers, setCustomers]: any = useState([]);
  const getData = async () => {
    let arr: any = [];
    const data = await getDocs(collection(db, "orders"));
    data.forEach((doc: any) => {
      
        arr.push({...doc.data(),id:doc.id})
      
    });
    arr.reverse()    
    await setCustomers(arr);
    
  };
  
const getAllCustomers=async()=>{
  let arr: any = [];
  const data = await getDocs(collection(db, "users"));
  data.forEach(async(doc: any) => {
    if(doc.data().accountType==="vendorEmployee"){
      arr.push({...doc.data(),id:doc.id})

    }
    
    
  });
}
    useEffect(()=>{
     
       getData()
       getAllCustomers()
    },[])
   

    const handleClick=(id:any)=>{
        // dispatch(setCustomerEmail(email))
        // router.push(`/VendorCustomerDashboard`)
        console.log(id)
        
  }


  return (<>
    <VendorNavbar/>
    







    <div className="container  mt-5 pt-5">
     
    
      
        <div className='row mb-4'>



</div>
        <Table striped bordered hover responsive>
      <thead  className={style.table_head}>
        <tr>
          
          <th>Product Name</th>
          <th>Total</th>
          <th>Customer Name</th>
          <th>Customer Email</th>

          <th>Address</th>
          <th>Quantity</th>
          
          
          
          


        </tr>
      </thead>
      <tbody>
      {customers.length>0?
    customers.map((customer:any,index:number)=>{

      return  <tr onClick={()=>handleClick(customer.id)}  key={index}>

            <td  >{customer.name}</td>
            <td  >{customer.itemTotal}$</td>
            <td   >{customer.firstName} {customer.lastName}</td>
            <td>{customer.email}</td>
            <td>{customer.address}</td>
            
            
            <td >

   {customer.quantity}


            </td>

          
            


      </tr>
    }
    
    )

:<tr><td>...</td>
<td>...</td>
<td>...</td>
<td>...</td>
<td>....</td>
<td>....</td>

</tr>}
       
      </tbody>
    </Table>
            
        </div>
    </>


    
  )
}

export default VendorCustomers