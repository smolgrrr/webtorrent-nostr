import React from 'react';


const Home = () => {

  return (
        <body className="align-center" id="home">
          <header>
            <nav>
              <section><img src="logo.png" alt="TPB logo" height="275px"/></section>
                <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '3em'}}>The Cypherpunk Bay</h1>
              <section>
                <strong>Search Torrents</strong> |
                <a href="/browse" title="Browse Torrents">Browse&nbsp;Torrents</a> |
                <a href="/search?q=top100:recent" title="Recent Torrents">Recent&nbsp;Torrents</a> |
                <a href="/top" title="Top 100">Top&nbsp;100</a>
              </section>
            </nav>
          </header>
          <main>
            <section>
              <form action="/search.php" name="q">
                <div>
                  <input name="q" type="search" title="Punk Search" placeholder="Punk Search" autoFocus required style={{width: "20em", padding: "4px"}}/>
                </div>
                <div>
                  <span className="form-box"><label title="All" htmlFor="all" accessKey="a"><input name="all" id="all" type="checkbox"  defaultChecked/>All</label></span>
                  <span className="form-box"><label title="Audio" htmlFor="audio" accessKey="q"><input name="audio" id="audio" type="checkbox" />Audio</label></span>
                  <span className="form-box"><label title="Video" htmlFor="video" accessKey="w"><input name="video" id="video" type="checkbox" />Video</label></span>
                  <span className="form-box"><label title="Applications" htmlFor="apps" accessKey="e"><input name="apps" id="apps" type="checkbox" />Applications</label></span>
                  <span className="form-box"><label title="Games" htmlFor="games" accessKey="r"><input name="games" id="games" type="checkbox" />Games</label></span>
                  <span className="form-box"><label title="Porn" htmlFor="porn" accessKey="t"><input name="porn" id="porn" type="checkbox" />Porn</label></span>
                  <span className="form-box"><label title="Other" htmlFor="other" accessKey="y"><input name="other" id="other" type="checkbox" />Other</label></span>
                </div>
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
              <div>
                <a href="/session/" title="Login">Login</a> |
                <a href="" title="Register">Register</a>
              </div>
              <div>
                <a href="http://piratebayo3klnzokct3wt5yyxb2vpebbuyjl7m623iaxmqhsd52coid.onion" title="tor address">        TOR (New v3)</a> |
        <a href="https://pirates-forum.org/" title="discussion forum" target="_blank">Forum</a> |
        <a target="_v_p_n" href="https://italarizege.xyz/redirect?tid=855295"><b> VPN </b></a>
      </div>
    </nav>
    <p style={{overflowWrap: "break-word"}}>
      <a href="https://bitcoin.org" target="_NEW">BTC</a>: <b><a href="bitcoin:bc1qf8cedqguh2ucc3fgsphmgt789q9szh35vtl38m">bc1qf8cedqguh2ucc3fgsphmgt789q9szh35vtl38m</a></b>
      <br/><a href="https://litecoin.org" target="_NEW">LTC</a>: <b><a href="litecoin:Les2qb8tp16kcxkm6cxzWdCV5174pMzcNK">Les2qb8tp16kcxkm6cxzWdCV5174pMzcNK</a></b>
      <br/><a href="https://ethereum.org" target="_NEW">ETH</a>: <b><a href="ethereum:0xc7F9f7Acc3941cC0Da9956410D0023FB936a6A09">0xc7F9f7Acc3941cC0Da9956410D0023FB936a6A09</a></b>
      <br/><a href="https://getmonero.org" target="_NEW">XMR</a>: <b><a href="monero:43pgpvwinkK4HCxJvEH7Fs2KMkH1VBCVqRjyCVLfCwTrGD1NzGSHkmuDUyFqCjBiCPLYePT1StfQn1uZhkPJczzzFXjYZ1U">43pgpvwinkK4HCxJvEH7Fs2KMkH1VBCVqRjyCVLfCwTrGD1NzGSHkmuDUyFqCjBiCPLYePT1StfQn1uZhkPJczzzFXjYZ1U</a></b>
    </p>
  </footer>
  <iframe referrerPolicy="no-referrer" src="https://s.uuidksinc.net/match/1411/?remote_uid=17202090899688090000" width="1px" height="1px" style={{padding: "0", margin: "0", border: "0", position: "absolute", width: "1px!important", height: "1px!important"}}></iframe>
  <iframe referrerPolicy="no-referrer" src="https://s.uuidksinc.net/match/1410/?remote_uid=17202090899688090000" width="1px" height="1px" style={{padding: "0", margin: "0", border: "0", position: "absolute", width: "1px!important", height: "1px!important"}}></iframe>
</body>
);
 
};

export default Home;