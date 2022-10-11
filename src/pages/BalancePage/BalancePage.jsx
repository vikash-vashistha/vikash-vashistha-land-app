import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTransactions } from '../../store/transaction/action.transaction';

function BalancePage(){
  // const { transactiondata } = useSelector((store) => store.transaction);
  const [transactiondata, setTransactiondata] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = async () => {
    await axios.get(`http://localhost:8080/transaction`).then((res) => {
      console.log('res.data: ', res.data);
      setTransactiondata(res.data);
    });
  };
  console.log('transactiondata: ', transactiondata);

  return (
    <>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 35%)',
          justifyContent: 'space-evenly',
          width: '500px',
          margin: 'auto',
          paddingTop: '50px',
        }}
      >
        <h4>Serial no.</h4>
        <h4>Particular</h4>
        <h4>Schema</h4>
        <h4>Head</h4>
        <h4>Received</h4>
        <h4>Payment</h4>
      </div>
      {transactiondata.map((el) => {
        return (
          <div
            key={el.transaction_id}
            className="container"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(8, 35%)',
              justifyContent: 'space-evenly',
              width: '500px',
              margin: 'auto',
              paddingTop: '10px',
            }}
          >
            <div>{el.transaction_id}</div>
            {/* <div>{el.scheme}</div> */}
            <div>{el.date}</div>
            <div>{el.type}</div>
            <div>{el.land_id.name}</div>
            <div>{el.amount}</div>
            {/* <Link to={`/products/${el.id}`}>more details</Link> */}
          </div>
        );
      })}
    </>
  );
};


export { BalancePage };