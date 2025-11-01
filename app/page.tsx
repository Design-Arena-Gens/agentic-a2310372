async function fetchRelease() {
  try {
    const res = await fetch(
      'https://api.github.com/repos/otland/forgottenserver/releases/tags/v1.4.2',
      {
        headers: { 'Accept': 'application/vnd.github+json' },
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function Page() {
  const release = await fetchRelease();

  return (
    <main style={{
      maxWidth: 960,
      margin: '0 auto',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial, "Apple Color Emoji", "Segoe UI Emoji"'
    }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem' }}>The Forgotten Server</h1>
      <p style={{ color: '#666', marginBottom: '1.5rem' }}>Release v1.4.2</p>

      {release ? (
        <section>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '1rem',
            marginBottom: '1.5rem',
            border: '1px solid #eee',
            borderRadius: 12,
            padding: '1rem'
          }}>
            <div>
              <strong>Name: </strong>
              <span>{release.name || release.tag_name}</span>
            </div>
            <div>
              <strong>Tag: </strong>
              <span>{release.tag_name}</span>
            </div>
            <div>
              <strong>Published: </strong>
              <span>{new Date(release.published_at).toLocaleString()}</span>
            </div>
            <div>
              <strong>URL: </strong>
              <a href={release.html_url} target="_blank" rel="noreferrer">View on GitHub</a>
            </div>
          </div>

          {Array.isArray(release.assets) && release.assets.length > 0 && (
            <div style={{ marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Assets</h2>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '0.5rem' }}>Name</th>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '0.5rem' }}>Size</th>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '0.5rem' }}>Downloads</th>
                      <th style={{ textAlign: 'left', borderBottom: '1px solid #eee', padding: '0.5rem' }}>Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {release.assets.map((a: any) => (
                      <tr key={a.id}>
                        <td style={{ borderBottom: '1px solid #f2f2f2', padding: '0.5rem' }}>{a.name}</td>
                        <td style={{ borderBottom: '1px solid #f2f2f2', padding: '0.5rem' }}>{(a.size / (1024 * 1024)).toFixed(2)} MB</td>
                        <td style={{ borderBottom: '1px solid #f2f2f2', padding: '0.5rem' }}>{a.download_count}</td>
                        <td style={{ borderBottom: '1px solid #f2f2f2', padding: '0.5rem' }}>
                          <a href={a.browser_download_url} target="_blank" rel="noreferrer">Download</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.5rem' }}>Release Notes</h2>
            <pre style={{
              whiteSpace: 'pre-wrap',
              border: '1px solid #eee',
              borderRadius: 12,
              padding: '1rem',
              background: '#fafafa',
              lineHeight: 1.5
            }}>{release.body || 'No description provided.'}</pre>
          </div>
        </section>
      ) : (
        <div style={{
          border: '1px solid #ffe4b5',
          background: '#fff8e1',
          color: '#7a5d00',
          padding: '1rem',
          borderRadius: 12
        }}>
          Could not load release info from GitHub. Try again later.
        </div>
      )}

      <footer style={{ marginTop: '2rem', color: '#888' }}>
        Data from GitHub Releases API. This site is not affiliated with CipSoft/OTLand.
      </footer>
    </main>
  );
}
