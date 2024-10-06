
//I am using fetchPost to to fetch data from the API.
//The checkScroll function checks if the user is near the bottom of the page, and calls fetchPost if that's true.






let currentPage = 1; 
let loading = false; 


fetchPosts(currentPage);

function fetchPosts(page) {
    loading = true;

    
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`)
        .then(response => response.json())
        .then(data => {
            const postsContainer = document.getElementById('posts-container');

            data.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                `;
                postsContainer.appendChild(postElement);
            });

            loading = false;
        })
        .catch(error => console.error('Error fetching posts:', error));
}


function checkScroll() {
    const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    
  
    if (nearBottom && !loading) {
        currentPage++; 
        fetchPosts(currentPage); 
    }
}


window.addEventListener('scroll', checkScroll);
