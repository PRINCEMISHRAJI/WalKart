import React from 'react'
import { useSearchParams } from "react-router-dom";
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react';
import { toast } from 'react-toastify'
import axios from 'axios'

export default function Verify() {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams, setSearchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');

    const verifyPayment = async () => {
        try {
            if(!token){
                return null;
            }

            const response = await axios.post(backendUrl+'/api/order/verifystripe', {success, orderId}, {headers:{token}});
            if(response.data.success){
                setCartItems({});
                navigate('/orders');
            }else{
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }

    useEffect(() => {
        verifyPayment();
    }, [token])
  return (
    <div>
      <p>Verifying your payment, please wait...</p>
    </div>
  )
}
