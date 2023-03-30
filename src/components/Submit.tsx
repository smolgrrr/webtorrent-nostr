import { useNostr, dateToUnix } from "nostr-react";
import { useMemo, useState, useEffect } from "react";
import {
  type Event as NostrEvent,
  generatePrivateKey,
  getEventHash,
  getPublicKey,
  signEvent,
} from "nostr-tools";
import Header from "./Header";

declare const window: {
  nostr?: any;
}

const Submit = () => {
  const { publish } = useNostr();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [magnetLink, setMagnetLink] = useState("");
  const [requestMessage, setRequestMessage] = useState("");
  const [kind, setKind] = useState("offer");
  const [anonymous,setAnonymous] = useState(false);
  const [webTorrent, setWebTorrent] = useState(false);
  const [cate, setCate] = useState("");
  const [pk, setPk] = useState("");
  const [trigger, setTrigger] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let message = "title: " + title 
    + "\ncategory: " + cate 
    + "\ndescription: " + description 
    + "\nwebtorrent: " + webTorrent 
    + "\nlocation: " + magnetLink 
    + "\n";

    if (!message) {
      alert("no message provided");
      return;
    }

    const newEvent: NostrEvent = {
      id: 'null',
      content: message,
      kind: 1,
      tags: [
        ["p", "2028cfc4f5ae2b967a75f4196987cbb30d092fa2a439bb807eda382206d39f36"],
        ["t", "offer"]
      ],
      created_at: dateToUnix(),
      pubkey: 'null',
      sig: 'null',
    };

    if (anonymous) {
      let sk = generatePrivateKey();
 
      newEvent.pubkey = getPublicKey(sk);
      newEvent.id = getEventHash(newEvent);
      newEvent.sig = signEvent(newEvent, sk);
  
      publish(newEvent);
    } else {
      newEvent.pubkey = await window.nostr.getPublicKey();
      newEvent.id = getEventHash(newEvent);

      publish(await window.nostr.signEvent(newEvent));
    }
  };

  return (
    <>
    <Header />
    <div id="detailsouterframe" style={{ width: "728px" }}>
      <div id="detailsframe">
      <form onSubmit={handleSubmit}>
          <div id="title">Index a torrent:</div>
          <div id="details">
            <table className="uldetails">
              <tbody>
                <tr>
                  <td className="tdleft">
                    <label htmlFor="torrent">Torrent:</label>
                  </td>
                  <td>
                    <input type="file" id="torrent" name="torrent" />
                  </td>
                </tr>
                <tr>
                <td className="tdleft">
                    <label>
                      Magnet Link:
                    </label>
                  </td>
                  <td>
                    <input type="text" name="magnetLink" onChange={(e) => setMagnetLink(e.target.value)} />
                  </td>
                </tr>
                <tr>
                  <td className="tdleft">
                    <label htmlFor="tname">
                      Torrent name:
                      <br />
                      (if other than file name)
                    </label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id="tname"
                      name="title"
                      maxLength={64}
                      onChange={(e) => setTitle(e.target.value)} 
                    />
                  </td>
                </tr>
                <tr>
                  <td className="tdleft">
                    <label htmlFor="cate">Category:</label>
                  </td>
                  <td>
                    <select
                      id="cate"
                      name="cate"
                      onChange={(e) => setCate(e.target.value)}
                    >
                      <option>..</option>
                      <optgroup label="Audio">
                        <option value="101">Music</option>
                        <option value="102">Audio books</option>
                        <option value="103">Sound clips</option>
                        <option value="104">FLAC</option>
                        <option value="199">Other</option>
                      </optgroup>
                      <optgroup label="Video">
                        <option value="201">Movies</option>
                        <option value="202">Movies DVDR</option>
                        <option value="203">Music videos</option>
                        <option value="204">Movie clips</option>
                        <option value="205">TV shows</option>
                        <option value="206">Handheld</option>
                        <option value="207">HD - Movies</option>
                        <option value="208">HD - TV shows</option>
                        <option value="209">3D</option>
                        <option value="299">Other</option>
                  </optgroup>
                  <optgroup label="Applications">
                    <option value="301">Windows</option>
                    <option value="302">Mac</option>
                    <option value="303">UNIX</option>
                    <option value="304">Handheld</option>
                    <option value="305">IOS (iPad/iPhone)</option>
                    <option value="306">Android</option>
                    <option value="399">Other OS</option>
                  </optgroup>
                  <optgroup label="Games">
                    <option value="401">PC</option>
                    <option value="402">Mac</option>
                    <option value="403">PSx</option>
                    <option value="404">XBOX360</option>
                    <option value="405">Wii</option>
                    <option value="406">Handheld</option>
                    <option value="407">IOS (iPad/iPhone)</option>
                    <option value="408">Android</option>
                    <option value="499">Other</option>
                  </optgroup>
                  <optgroup label="Porn">
                    <option value="501">Movies</option>
                    <option value="502">Movies DVDR</option>
                    <option value="503">Pictures</option>
                    <option value="504">Games</option>
                    <option value="505">HD - Movies</option>
                    <option value="506">Movie clips</option>
                    <option value="599">Other</option>
                  </optgroup>
                  <optgroup label="Other">
                    <option value="601">E-books</option>
                    <option value="602">Comics</option>
                    <option value="603">Pictures</option>
                    <option value="604">Covers</option>
                    <option value="605">Physibles</option>
                    <option value="699">Other</option>
                  </optgroup>
                </select>
              </td>
            </tr>
            <tr>
              <td>Anonymous</td>
              <td>
                <input name="anon" type="checkbox" value="anon" 
                onChange={(e) => setAnonymous(e.target.checked)} />
              </td>
            </tr>
            <tr>
              <td>WebTorrent compatible</td>
              <td>
                <input name="WebTorrent" type="checkbox" value="WebTorrent" 
                onChange={(e) => setWebTorrent(e.target.checked)}
                />
              </td>
            </tr>
            <tr>
              <td className="tdleft">
                <div id="imdb1" style={{ display: "none" }}>
                  <label htmlFor="imdb">IMDB ID</label>
                </div>
              </td>
              <td>
                <div id="imdb2" style={{ display: "none" }}>
                  <input
                    type="text"
                    id="imdb"
                    name="imdb"
                    value=""
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td className="tdleft">
                <div id="SpokenLangDiv" style={{ display: "none" }}>
                  Spoken language(s):
                  <br />
                  <select
                    name="lang_spk[]"
                    multiple={true}
                  >
                    <option value="1">English</option>
                    <option value="2">Swedish</option>
                    <option value="4">Norwegian</option>
                    <option value="8">Danish</option>
                    <option value="16">Finnish</option>
                    <option value="32">German</option>
                    <option value="64">French</option>
                    <option value="128">Spanish</option>
                    <option value="256">Italian</option>
                    <option value="512">Dutch</option>
                    <option value="1024">Polish</option>
                    </select></div></td>
              <td>
                <div id="TextedLangDiv" style={{ display: "none" }}>
                  <p style={{ margin: 0 }}>Texted language(s):</p>
                  <select
                    name="lang_text[]"
                    multiple={true}
                  >
                    <option value="1">English</option>
                    <option value="2">Swedish</option>
                    <option value="4">Norwegian</option>
                    <option value="8">Danish</option>
                    <option value="16">Finnish</option>
                    <option value="32">German</option>
                    <option value="64">French</option>
                    <option value="128">Spanish</option>
                    <option value="256">Italian</option>
                    <option value="512">Dutch</option>
                    <option value="1024">Polish</option>
                    <option value="2048">Chinese</option>
                    <option value="4096">Japanese</option>
                    <option value="8192">Korean</option>
                    <option value="16384">Portugese</option>
                    <option value="32768">Russian</option>
                  </select>
                </div>
              </td>
            </tr>
            {/* 
              <tr>
              <td className="tdleft"><div id="imagetag1" style=""><label for="imagetag">Image tag from <a href="http://bayimg.com" target="_new">bayimg</a></label></div></td>
              <td><div id="imagetag2" style=""><input type="text" id="imagetag" name="imagetag" size="30" value=""/></div></td>
            </tr>
            */}
            <tr>
              <td colSpan={2}>
                <div id="descpart">
                  <label htmlFor="desc">Description:</label>
                  <br />
                  <textarea
                    id="desc"
                    className="nfo"
                    name="description"
                    rows={10}
                    cols={40}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <input type="submit" value="Add to index »" onClick={(e) => setTrigger(true)}/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </form>
  </div>
</div>

    </>
  );
}

export default Submit;