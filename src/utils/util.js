export const postNewComment = (comment, user, slug) => {
  fetch("http://localhost:4000/event/comment", {
    method: "POST",
    body: JSON.stringify({ comment, user, slug }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
      }
    })
    .catch((err) => console.error(err));
};

export const postRegisterForEvent = (user, id, navigate) => {
  fetch("http://localhost:4000/register/event", {
    method: "POST",
    body: JSON.stringify({ user, id }),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.message) {
        alert(data.message);
        navigate("/");
      }
    })
    .catch((err) => console.error(err));
};
