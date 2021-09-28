const newCommentFormHandler = async (event) => {
  event.preventDefault();
  const comment_content = document.querySelector("#comment-text").value;
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (comment_content) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        comment_content,
        post_id,
      }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Unable to create your comment!");
    }
  }
};

document
  .querySelector("#comment-btn")
  .addEventListener("click", newCommentFormHandler);
