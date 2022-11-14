import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTransactions } from "../../store/transaction/action.transaction";

export const BalancePage = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  // const { transactiondata } = useSelector((store) => store.transaction);
  const [transactiondata, setTransactiondata] = useState([]);
  useEffect(() => {
    getProducts((page));
  }, [page]);
  const getProducts = async (page) => {
    const token = localStorage.getItem("token");
    console.log(token)
    try {
      setLoading(true);
      await axios
        .get(`http://localhost:2345/transaction?page=${page}&size=${3}`, {
          headers: { authorization: `Bearer ${token}` },
        })
        .then((res) => {
          console.log("res.data: ", res.data.transaction);
          setTransactiondata([...res.data.transaction]);
        });
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  console.log("transactiondata: ", transactiondata);

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 35%)",
          justifyContent: "space-evenly",
          width: "500px",
          margin: "auto",
          paddingTop: "50px",
        }}
      >
        <h4>Serial no.</h4>
        <h4>Date</h4>
        <h4>Scheme</h4>

        <h4>type</h4>
        <h4>Land</h4>
        <h4>Plot</h4>
        <h4>from</h4>
        <h4>to</h4>
        <h4>Amount</h4>
      </div>
      {transactiondata && transactiondata.map((el) => {
        return (
          <div
            key={el.transaction_id}
            className="container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(9, 35%)",
              justifyContent: "space-evenly",
              width: "500px",
              margin: "auto",
              paddingTop: "10px",
            }}
          >
            <div>{el.transaction_id}</div>
            <div>{el.date}</div>
            <div>{el.scheme}</div>
            <div>{el.type}</div>
            <div>{el.land_id.name}</div>
            <div>{el.plot_id.face}</div>
            <div>{el.from}</div>
            <div>{el.to}</div>
            <div>{el.amount}</div>
            {/* <Link to={`/products/${el.id}`}>more details</Link> */}
          </div>
        );
      })}
      <br />
      <div style={{ marginLeft: "45%" }}>
        <button onClick={() => setPage((prv) => prv - 1)} disabled={page == 1}>
          prv
        </button>
        <span style={{ padding: "0.5rem" }}>{page}</span>
        <button onClick={() => setPage((prv) => prv + 1)}>next</button>
      </div>
      <div style={{ marginLeft: "45%" }}>{loading && <h3>...loading</h3>}</div>
    </>
  );
};
