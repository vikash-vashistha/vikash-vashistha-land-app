import axios from "axios";
import { useEffect, useReducer, useState } from "react";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Button
} from "@chakra-ui/react";

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
      <TableContainer>
      <Table variant="simple">
      <TableCaption>All user Transactions</TableCaption>
          <Thead>
            <Tr>
              <Th>Serial no.</Th>
              <Th>Date</Th>

              <Th>type</Th>
              <Th>Land</Th>
              <Th>Plot</Th>
              <Th>from</Th>
              <Th>to</Th>
              <Th>Amount</Th>
            </Tr>
          </Thead>
          <Tbody>
            {state.data &&
              state.data.map((el) => {
                return (
                  <Tr key={el.transaction_id}>
                    <td>{el.transaction_id}</td>
                    <td>{el.date}</td>
                    <td>{el.type}</td>
                    <td>{el.land_id}</td>
                    <td>{el.plot_id}</td>
                    <td>{el.from}</td>
                    <td>{el.to}</td>
                    <td>{el.amount}</td>
                    {/* <Link to={`/products/${el.id}`}>more details</Link> */}
                  </Tr>
                );
              })}
          </Tbody>
        </Table>
      </TableContainer>
      <br />
      <div style={{ marginLeft: "45%" }}>
        <Button
          onClick={() => dispatch({ ...decPage, payload: state.page })}
          disabled={state.page == 1}
        >
          prv
        </Button>
        <span style={{ padding: "0.5rem" }}>{state.page}</span>
        <Button onClick={() => dispatch({ ...incPage, payload: state.page })}>
          next
        </Button>
      </div>
      <div style={{ marginLeft: "45%" }}>
        {state.isLoading && <h3>...loading</h3>}
      </div>
    </>
  );
};