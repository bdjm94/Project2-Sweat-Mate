// async function newFormHandler(event) {
//   event.preventDefault();

//   // capture the values of a form considered to be "add-post"
//   const exerciseTypeName = document.querySelector('input[name="post-title"]').value;
//   const note = document.querySelector('textarea[name="content"]').value;

//   // post stringified data to the post-routes folder of our routes
//   const response = await fetch('/api/exercises', {
//     method: 'POST',
//     body: JSON.stringify({
//       exerciseTypeName,
//       note,
//       userId,
//       sets
//     }),
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   // once our route is received properly, re-direct user to dashboard
//   if (response.ok) {
//     document.location.replace('/dashboard');
//   } else {
//     alert(response.statusText);
//   }
// }

// document.querySelector('#add-exercise-form').addEventListener('submit', newFormHandler);