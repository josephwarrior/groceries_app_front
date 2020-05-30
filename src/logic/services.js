import config from "config";
import Cookie from "js-cookie";

export const submitUsernameFetch = (username) => {
  return fetch(config.apiUrl + "/session/" + username, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }

      return response.json();
    })
    .then((jsonData) => {
      Cookie.set("sid", jsonData.data.sid);
      return jsonData.data;
    });
};

export const logoutFetch = (username) => {
  return fetch(config.apiUrl + "/session/" + username, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sid: Cookie.get("sid") }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => Promise.reject(error));
      }
      return response.json();
    })
    .then((jsonData) => {
      Cookie.get("sid") === jsonData.sid && Cookie.remove("sid");
      return jsonData.message;
    });
};

export const getItemsFetch = (username) => {
  return fetch(config.apiUrl + "/itemss/" + username, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sid: Cookie.get("sid") }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    })
    .then((jsonData) => jsonData.data);
};

export const addItemFetch = (newItem, username) => {
  return fetch(config.apiUrl + "/items/" + username, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sid: Cookie.get("sid"), newItem: newItem }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    })
    .then((jsonData) => jsonData.data);
};

export const updateItemsFetch = (updatedItemsObject, username) => {
  return fetch(config.apiUrl + "/items/" + username, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sid: Cookie.get("sid"),
      updatedItemsObject: updatedItemsObject,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    })
    .then((jsonData) => jsonData.data);
};

export const deleteItemFetch = (itemId, username) => {
  return fetch(config.apiUrl + "/items/" + username + "/" + itemId, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sid: Cookie.get("sid") }),
  })
    .then((response) => response.json())
    .then((jsonData) => jsonData.data);
};
