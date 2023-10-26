export const getFormData = (form) => {
  const formData = new FormData(form);
  const formDataJSON = JSON.stringify(Object.fromEntries(formData.entries()));
  return formDataJSON;
};

export const sendFormData = async (endPoint, formData) => {
  const serverURL = import.meta.env.VITE_SERVER_BASE_URL;
  const response = await fetch(`${serverURL}${endPoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: formData,
  });
  return response;
};
