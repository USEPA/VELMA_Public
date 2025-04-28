const { readFileSync } = require('fs');

document.getElementById('search').addEventListener('input', function (e) {
  
  console.log("Pre parsed data", document.getElementById('search').value)
    const searchData = readFileSync("search-index.json"); //document.getElementById('search').value;
    console.log("Serach data json", searchData)
    const index = lunr(function () {
        this.ref('url');
        this.field('title', { boost: 10 });
        this.field('content');
        searchData.forEach(page => this.add(page));
    });

    console.log("Target val", e.target.value);
    const results = index.search(e.target.value);
    displayResults(results, searchData);
});

function displayResults(results, data) {
    const container = document.getElementById('search-results');
    container.innerHTML = results.slice(0, 5).map(result => `
      <a href="${result.ref}" class="search-item">
        <div class="search-title">${data.find(p => p.url === result.ref).title}</div>
        <div class="search-excerpt">${excerptText(result, data)}</div>
      </a>
    `).join('');
}

function excerptText(result, data) {
    const content = data.find(p => p.url === result.ref).content;
    return content.substring(Math.max(0, result.matchData.metadata.position[0][0] - 50), 100) + '...';
}
