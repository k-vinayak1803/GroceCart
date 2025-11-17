// src/pages/PaymentSuccess.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const PaymentSuccess = () => {
  const { axios } = useAppContext();
  const query = new URLSearchParams(useLocation().search);
  const orderId = query.get("orderId");
  const paymentId = query.get("payment_intent");

  useEffect(() => {
    if (orderId && paymentId) {
      axios.post('/api/order/payment-success', { orderId, paymentId });
    }
  }, [orderId, paymentId]);

  return (
    <div className="mt-20 text-center">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="text-gray-600 mt-2">Your order ID: {orderId}</p>
    </div>
  );
};

export default PaymentSuccess;
