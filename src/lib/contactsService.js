import { getToken } from "./authenticate";

const API_URL = process.env.REACT_APP_API_URL;

export async function getContacts() {
  const token = await getToken();

  const res = await fetch(`${API_URL}/contacts`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function addContact(contact) {
  const token = await getToken();

  const res = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function editContact(id, contact) {
  const token = await getToken();

  const res = await fetch(`${API_URL}/contacts/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}

export async function deleteContact(id) {
  const token = await getToken();

  const res = await fetch(`${API_URL}/contacts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status === 200) {
    const data = await res.json();
    return data;
  } else {
    return [];
  }
}
