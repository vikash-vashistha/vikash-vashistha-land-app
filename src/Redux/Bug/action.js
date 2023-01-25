export const CRITICAL = "CRITICAL";
export const MAJOR = "MAJOR";
export const MEDIUM = "MEDIUM";
export const LOW = "LOW";

export const CRITICAL_DELETE = "CRITICAL_DELETE";
export const MAJOR_DELETE = "MAJOR_DELETE";
export const MEDIUM_DELETE = "MEDIUM_DELETE";
export const LOW_DELETE = "LOW_DELETE";

export const SET_ALL = "SET_ALL";


export const critical_action = (payload) => {
  
  return {
    type: CRITICAL,
    payload,
  };
};

export const major_action = (payload) => {
  return {
    type: MAJOR,
    payload,
  };
};

export const medium_action = (payload) => {
  return {
    type: MEDIUM,
    payload
  };
};

export const low_action = (payload) => {
  return {
    type: LOW,
    payload
  };
};



export const critical_action_delete = (payload) => {
  console.log(payload);
  return {
    type: CRITICAL_DELETE,
    payload,
  };
};

export const major_action_delete = (payload) => {
  return {
    type: MAJOR_DELETE,
    payload,
  };
};

export const medium_action_delete = (payload) => {
  return {
    type: MEDIUM_DELETE,
    payload,
  };
};

export const low_action_delete = (payload) => {
  return {
    type: LOW_DELETE,
    payload,
  };
};

export const setAll = (payload) => {
  return {
    type: SET_ALL,
    payload,
  };
};