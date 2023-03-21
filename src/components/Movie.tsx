import { useNostrEvents, useProfile } from "nostr-react";
import { useParams } from 'react-router-dom';
import Player from "./Player/Player";
import Header from "./Header";

function parseContent(content: string) {
  const lines = content.split('\n');
  const data: { [key: string]: string } = {};
  lines.forEach((line) => {
    const [key, value] = line.split(': ');
    data[key.toLowerCase()] = value;
  });
  return {
    title: data.title,
    TMDB_id: data.tmdb_id,
    description: data.description,
    magnetlink: data.location,
  };
}

const Movie = () => {
  const { id } = useParams();


  const { events } = useNostrEvents({
    filter: {
      ids: [id!],
      limit: 1,
    },
  });

  const event = events[0]; 
  if (!event) {
    return <div><Header /> <br/> No event found</div>;
  }
  const { title, TMDB_id, description, magnetlink } = parseContent(event.content);;

  return (
    <div>
      <Header />
      <h2><span>Details for this torrent</span>&nbsp;</h2>
      <div id="content">
        <div id="main-content">
          <div>
            <div id="detailsouterframe">
              <div id="response"></div>
              <div id="message"></div>
              <div id="detailsframe">
                <div id="title">
                  {title}
                </div>

                <div id="details">
                  <dl className="col1">
                    <dt>Type:</dt>
                    <dd>
                      <a href="/browse/201" title="More from this category">
                        Video &gt; Movies
                      </a>
                    </dd>

                    <dt>Files:</dt>
                    <dd>
                      <a href="" title="Files">
                        5
                      </a>
                    </dd>

                    <dt>Size:</dt>
                    <dd>
                      1.86&nbsp;GiB&nbsp;(1998466612&nbsp;Bytes)
                    </dd>
                  </dl>

                  <dl className="col2">
                    <dt>Uploaded:</dt>
                    <dd>{new Date(event.created_at * 1000).toLocaleDateString()} {new Date(event.created_at * 1000).toLocaleTimeString()}</dd>
                    <dt>By:</dt>
                    <dd>
                      <a href="/user/TvTeam/" title="Browse TvTeam">
                        "bob"
                      </a>
                      <img
                        src="/static/img/vip.gif"
                        alt="VIP"
                        title="VIP"
                        style={{ width: "11px" }}
                        height="11"
                        width="11"
                      />
                    </dd>
                    <dt>Seeders:</dt>
                    <dd>0</dd>

                    <dt>Leechers:</dt>
                    <dd>0</dd>

                    <dt>Comments</dt>
                    <dd>
                      <span id="NumComments">0</span>&nbsp;
                    </dd>

                    <br />
                    <dt>Info Hash:</dt>
                    <dd></dd>
                    {magnetlink.match(/urn:btih:(\w+)/)?.[1].toUpperCase() ?? ""}
                  </dl>

                  <div id="CommentDiv" style={{ display: "none" }}>
                    <form
                      method="post"
                      id="commentsform"
                      name="commentsform"
                    >
                      <p className="info">
                        <textarea
                          name="add_comment"
                          id="add_comment"
                          rows={8}
                          cols={50}
                        ></textarea>
                        <br />
                        <input type="hidden" name="id" value="67080991" />
                        <input type="submit" value="Submit" />
                        <input type="button" value="Hide" />
                      </p>
                    </form>
                  </div>
                  <br />
                  <br />
                  <div id="social"></div>
                  <br />
                  <br />
                  <div>
                    <div className="download">
                      <a
                        target="_blank"
                        rel="nofollow"
                        href={magnetlink}
                        title="Get this torrent"
                      >
                        <img src="icon-magnet.gif"/>
                        &nbsp;Get this torrent
                      </a>
                    </div>
                    <Player magnetlink={magnetlink} />
                    <div className="nfo">
                      <pre>penis</pre>
                    </div>
                    <br />
                    <div className="download">
                      <a
                        target="_blank"
                        rel="nofollow"
                        href={magnetlink}
                        title="Get this torrent"
                      >
                        <img src="icon-magnet.gif"/>  
                        Get this torrent
                      </a>
                    </div>
                    <div id="filelistContainer" style={{ display: "none" }}>
                      <a id="show"></a>
                    </div>
                    <div id="comments"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;