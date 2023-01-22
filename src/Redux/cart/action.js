import axios from "axios";

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
  console.log("lala", user, e, token);
  try {
    axios
      .post(
        `http://localhost:2345/cart`,
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
        console.log("vik", res.data);
      });
  } catch (e) {
    console.log(e);
  }
};

export const remove_from_cart = (payload) => (dispatch) => {
  console.log(payload);
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