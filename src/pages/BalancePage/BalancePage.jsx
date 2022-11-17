import axios from "axios";
import { useEffect, useReducer, useState } from "react";

const initValue = {
  isLoading: false,
  isError: false,
  data: [],
  page: 1,
};

const balanceReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_TRANSACTION_LOADING": {
      return { ...state, isLoading: true, isError: false };
    }
    case "FETCH_TRANSACTION_SUCCESS": {
      return { ...state, isLoading: false, data: action.payload };
    }
    case "FETCH_TRANSACTION_FAILURE": {
      return { ...state, isLoading: false, isError: true };
    }
    case "INCREMENT_PAGE": {
      return { ...state, isLoading: false, page: action.payload + 1 };
    }
    case "DECREMENT_PAGE": {
      return { ...state, isLoading: false, page: action.payload - 1 };
    }
    default:
      return state;
  }
};

const transLoadingAction = { type: "FETCH_TRANSACTION_LOADING" };
const transSuccessAction = { type: "FETCH_TRANSACTION_SUCCESS" };
const transFailureAction = { type: "FETCH_TRANSACTION_FAILURE" };
const incPage = { type: "INCREMENT_PAGE" };
const decPage = { type: "DECREMENT_PAGE" };

const getProducts = async (state, dispatch) => {
  const token = localStorage.getItem("token");
  // console.log(token);
  try {
    // setLoading(true);
    dispatch(transLoadingAction);
    await axios
      .get(`http://localhost:2345/transaction?page=${state.page}&size=${3}`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log("res.data: ", res.data.transaction);
        dispatch({
          ...transSuccessAction,
          payload: [...res.data.transaction],
        });
        // setTransactiondata([...res.data.transaction]);
      });
    // setLoading(false);
  } catch (e) {
    // setLoading(false);
    dispatch(transFailureAction);
    console.log(e);
  }
};
export const BalancePage = () => {
  const [state, dispatch] = useReducer(balanceReducer, initValue);

  useEffect(() => {
    getProducts(state, dispatch);
  }, [state.page]);

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
      {state.data &&
        state.data.map((el) => {
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
        <button
          onClick={() => dispatch({ ...decPage, payload: state.page })}
          disabled={state.page == 1}
        >
          prv
        </button>
        <span style={{ padding: "0.5rem" }}>{state.page}</span>
        <button onClick={() => dispatch({ ...incPage, payload: state.page })}>
          next
        </button>
      </div>
      <div style={{ marginLeft: "45%" }}>
        {state.isLoading && <h3>...loading</h3>}
      </div>
    </>
  );
};
