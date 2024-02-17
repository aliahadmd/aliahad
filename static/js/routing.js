// routing.js
document.addEventListener('DOMContentLoaded', function () {
    // Function to fetch and update content
    async function fetchContent(url) {
        try {
            const controller = new AbortController();
            const id = setTimeout(() => controller.abort(), 5000); // Timeout after 5 seconds

            const response = await fetch(url, { signal: controller.signal });
            clearTimeout(id); // Clear the timeout if the fetch completes before the timeout

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.getElementById('content').innerHTML;

            // Update the content section with the fetched content
            document.getElementById('content').innerHTML = newContent;
        } catch (error) {
            console.error('Error fetching content:', error);
        }
    }

    // Add a global click event listener to handle all <a> tags
    document.addEventListener('click', function (event) {
        if (event.target.matches('a[href]')) {
            event.preventDefault(); // Prevent default link behavior
            const url = event.target.getAttribute('href');
            fetchContent(url);
            history.pushState(null, '', url); // Update URL without full page reload
        }
    });

    // Initialize content based on current URL
    window.addEventListener('popstate', function () {
        fetchContent(window.location.pathname);
    });
    fetchContent(window.location.pathname);
});