import axios from "axios";

export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SET_CART = "SET_CART";

export const set_cart = (payload) => {
  return {
    type: SET_CART,
    payload
  }
}

export const get_cart = (payload) => (dispatch) => {
  console.log(payload);
  axios
    .get(`https://vikash-land-app.onrender.com/cart/${payload.id}`, {
      headers: { authorization: `Bearer ${payload.token}` },
    })
    .then((res) => {
      dispatch(set_cart(res.data));
    });
};

export const add_to_cart = (payload) => (dispatch) => {
  const { user, e, token } = payload;
  try {
    axios
      .post(
        `https://vikash-land-app.onrender.com/cart`,
        {
          user_id: user._id,
          plot_id: e?._id,
          land_id: e?.land_id?._id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      )
      .then((res) => {
        console.log("vik", res);
      });
  } catch (e) {
    console.log(e);
  }
};

export const remove_from_cart = (payload) => (dispatch) => {
  axios
    .delete(`https://vikash-land-app.onrender.com/cart/${payload.id}`, {
      headers: { authorization: `Bearer ${payload.token}` },
    })
    .then((res) => {
      dispatch(set_cart(res.data));
    }).catch((e) => {
      console.log(e.message);
    })
};