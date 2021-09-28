const editPostFormHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector("#post-title").value;
  const content = document.querySelector("#post-content").value;
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (title && content) {
    const response = await fetch(`/api/posts/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        content,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
      console.log("Post has been edited");
    } else {
      alert("Unable to edit post!");
    }
  }
};

document
  .querySelector("#edit-post-btn")
  .addEventListener("click", editPostFormHandler);
