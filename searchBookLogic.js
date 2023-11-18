function findBooks(){

    let bookName = document.getElementById("bookName").value;
    const URL = `http://openlibrary.org/search.json?q=${encodeURIComponent(bookName)}`;
   
    fetch(URL).then(response =>response.json()).
    then(data => showBooks(data)).catch(error => console.log('Error:', error));
   
   }
   
   
   function showBooks (data) {
       const resultsContainer = document.getElementById("results");
       const paginationContainer = document.getElementById("pagination");
    
       resultsContainer.innerHTML = "";
       paginationContainer.innerHTML = "";
    
       resultsContainer.innerHTML += `<p id="foundBooks" > Books Found: ${data.numFound}</p>`;
       
       data.docs.forEach(book => {
           
           resultsContainer.innerHTML += `<div id = "res">
                   <p id="title">Title: ${book.title}</p>
                   <p id="author">Author: ${book.author_name ? book.author_name.join(', ') : 'unknown'}</p>
                   <p>First Publish Year: ${book.first_publish_year ? book.first_publish_year : 'unknown'}</p>
                   <p>Subject: ${book.subject ? book.subject.slice(0, 5).join(', ') : 'unknown'}</p>
               </div> `;
       });
   
         const totalPages = Math.ceil(data.numFound / 100);
               for (let i = 1; i <= totalPages; i++) {
                   paginationContainer.innerHTML += `<button onclick="getResultsPage(${i})">${i}</button>`;
               }
           }
   
   
           function getResultsPage(page) {
               const bookName = document.getElementById("bookName").value;
               const apiUrl = `http://openlibrary.org/search.json?q=${encodeURIComponent(bookName)}&page=${page}`;
   
               fetch(apiUrl)
                   .then(response => response.json())
                   .then(data => showBooks(data))
                   .catch(error => console.log('Error:', error));
           }
   
   