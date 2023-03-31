const Home = () => {

  return (
        <body className="align-center" id="home" style={{ fontSize: '10px'}}>
          <header>
            <nav>
              <section><img src="logo.png" alt="TPB logo" height="275px"/></section>
                <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '3em'}}>The Cypherpunk Bay</h1>
              <section>
                <strong>Search Torrents</strong> |
                <a href="/browse" title="Browse Torrents">Browse&nbsp;Torrents</a> |
                {/* <a href="/search?q=top100:recent" title="Recent Torrents">Recent&nbsp;Torrents</a> |
                <a href="/top" title="Top 100">Top&nbsp;100</a> */}
              </section>
            </nav>
          </header>
          <main>
            <section>
              <form action="/search.php" name="q">
                <div>
                  <input name="q" type="search" title="Punk Search" placeholder="Punk Search" autoFocus required style={{width: "20em", padding: "4px"}}/>
                </div>
                {/* <div>
                  <span className="form-box"><label title="All" htmlFor="all" accessKey="a"><input name="all" id="all" type="checkbox"  defaultChecked/>All</label></span>
                  <span className="form-box"><label title="Audio" htmlFor="audio" accessKey="q"><input name="audio" id="audio" type="checkbox" />Audio</label></span>
                  <span className="form-box"><label title="Video" htmlFor="video" accessKey="w"><input name="video" id="video" type="checkbox" />Video</label></span>
                  <span className="form-box"><label title="Applications" htmlFor="apps" accessKey="e"><input name="apps" id="apps" type="checkbox" />Applications</label></span>
                  <span className="form-box"><label title="Games" htmlFor="games" accessKey="r"><input name="games" id="games" type="checkbox" />Games</label></span>
                  <span className="form-box"><label title="Porn" htmlFor="porn" accessKey="t"><input name="porn" id="porn" type="checkbox" />Porn</label></span>
                  <span className="form-box"><label title="Other" htmlFor="other" accessKey="y"><input name="other" id="other" type="checkbox" />Other</label></span>
                </div> */}
                <div>
                  <input type="submit" title="Punk Search" name="search" value="Punk Search" accessKey="s"/>
                  <input type="submit" title="I'm Feeling Lucky" name="lucky" value="I'm Feeling Lucky"/>
                </div>
                <input type="hidden" name="page" value="0"/>
                <input type="hidden" name="orderby" value=""/>
              </form>
            </section>
          </main>
          <footer>
            <nav>
              {/* <div>
                <a href="/session/" title="Login">Login</a> |
                <a href="" title="Register">Register</a>
              </div> */}
              {/* <div>
                <a href="http://piratebayo3klnzokct3wt5yyxb2vpebbuyjl7m623iaxmqhsd52coid.onion" title="tor address">        TOR (New v3)</a> |
        <a href="https://pirates-forum.org/" title="discussion forum" target="_blank">Forum</a> |
        <a target="_v_p_n" href="https://italarizege.xyz/redirect?tid=855295"><b> VPN </b></a>
      </div> */}
    </nav>
    <p style={{overflowWrap: "break-word"}}>
        <b><a href="lightning:smolgrrr@ln.tips">smolgrrr@ln.tips</a></b>
        <br/><b><a href="bitcoin:bc1qtsy524vtl6ltvhfwejnernkxemhwm6hpwndyv8">bc1qtsy524vtl6ltvhfwejnernkxemhwm6hpwndyv8</a></b>
        <br/><b><a href="nostr:npub13azv2cf3kd3xdzcwqxlgcudjg7r9nzak37usnn7h374lkpvd6rcq4k8m54">npub13azv2cf3kd3xdzcwqxlgcudjg7r9nzak37usnn7h374lkpvd6rcq4k8m54</a></b>
    </p>
  </footer>
</body>
);
 
};

export default Home;