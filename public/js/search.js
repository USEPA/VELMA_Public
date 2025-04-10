document.getElementById('search').addEventListener('input', function (e) {
    const searchData = JSON.parse(document.getElementById('searchData').textContent);
    const index = lunr(function () {
        this.ref('url');
        this.field('title', { boost: 10 });
        this.field('content');
        searchData.forEach(page => this.add(page));
    });

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
