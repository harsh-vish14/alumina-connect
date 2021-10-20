export const SignUp = async (signData) => {
  console.log(signData);
  const res = await fetch("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(signData),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });

  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return { status: "success", data };
};

export const getAllUsers = async ({ name, email, admin }) => {
  const res = await fetch(
    `/api/users?name=${name}&email=${email}&admin=${admin}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: process.env.AUTH_KEY,
      },
    }
  );

  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};

export const updateUser = async ({ userId, admin }) => {
  const res = await fetch(`/api/users/${userId}`, {
    method: "PATCH",
    body: JSON.stringify({ admin }),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};

export const uploadUser = async (user) => {
  const res = await fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};

export const deleteUsers = async (ids) => {
  const res = await fetch("/api/users", {
    method: "DELETE",
    body: JSON.stringify({ usersIds: ids }),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};

export const updateUserProfile = async (userId, body) => {
  const res = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};

export const getAllAlumina = async ({ name, company, year }) => {
  // name: "", email: "", year: ""
  const res = await fetch(
    `/api/alumina?name=${name}&company=${company}&year=${year}`
  );
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};

export const uploadAlumina = async (alumina) => {
  const res = await fetch("/api/alumina", {
    method: "POST",
    body: JSON.stringify(alumina),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};

export const deleteAlumina = async (ids) => {
  const res = await fetch("/api/alumina", {
    method: "DELETE",
    body: JSON.stringify({ usersIds: ids }),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};

export const updateAluminaProfile = async (aluminaId, body) => {
  const res = await fetch(`/api/alumina/${aluminaId}`, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};

export const getAluminaById = async (aluminaId) => {
  const res = await fetch(`/api/alumina/${aluminaId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: process.env.AUTH_KEY,
    },
  });
  const data = await res.json();
  if (!res.ok) {
    return {
      status: "error",
      data,
    };
  }
  return {
    status: "success",
    data,
  };
};
