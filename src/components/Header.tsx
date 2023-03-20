import React from 'react';

const Header: React.FC = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.q.value;
    const selectedCategories = [
      form.audio.checked && 'audio',
      form.video.checked && 'video',
      form.apps.checked && 'apps',
      form.games.checked && 'games',
      form.porn.checked && 'porn',
    ].filter(Boolean).join('/');
    window.location.href = `https://www1.thepiratebay3.to/s/${selectedCategories}/${searchQuery}`;
  };

  return (
    <div id="header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <form method="get" id="q" onSubmit={handleSubmit}>
        <a href="https://www1.thepiratebay3.to/" className="img">
          <img src="tpblogo_sm_ny.gif" id="TPBlogo" alt="The Pirate Bay" />
        </a>
        <b><a href="https://www1.thepiratebay3.to/" title="Search Torrents">Search Torrents</a></b>&nbsp;&nbsp;|&nbsp;
        <a href="https://www1.thepiratebay3.to/browse" title="Browse Torrents">Browse Torrents</a>&nbsp;&nbsp;|&nbsp;
        <a href="https://www1.thepiratebay3.to/recent" title="Recent Torrents">Recent Torrents</a>&nbsp;&nbsp;|&nbsp;
        <a href="https://www1.thepiratebay3.to/top" title="Top 100">Top 100</a> <br />
        <input type="search" title="Pirate Search" name="q" required placeholder="Search here..." style={{ backgroundColor: '#ffffe0' }} className="searchBox" />
        <input type="submit" value="Pirate Search" className="submitbutton" /> <br />
        <label htmlFor="audio" title="Audio">
          <input id="audio" name="audio" onClick={() => {}} type="checkbox" />Audio
        </label>
        <label htmlFor="video" title="Video">
          <input id="video" name="video" onClick={() => {}} type="checkbox" />Video
        </label>
        <label htmlFor="apps" title="Applications">
          <input id="apps" name="apps" onClick={() => {}} type="checkbox" />Applications
        </label>
        <label htmlFor="games" title="Games">
          <input id="games" name="games" onClick={() => {}} type="checkbox" />Games
        </label>
        <label htmlFor="porn" title="Porn">
          <input id="porn" name="porn" onClick={() => {}} type="checkbox" />Porn
        </label>
      </form>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button onClick={() => window.location.href = '/submit'}>Upload a file</button>
        <button onClick={() => window.location.href = '/submit'}>Request a file</button>
      </div>
    </div>
  );
};

export default Header;

