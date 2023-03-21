import { useNostrEvents, useProfile } from "nostr-react";

interface Event {
  id: string;
  content: string;
  created_at: number;
  pubkey: string;
}

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

function NostrName(pubkey: string) {
  const { data: userData } = useProfile({ pubkey });
  return {
    name: userData?.name
  };
}

function EventRow({ event }: { event: Event }) {
  const { title, description, magnetlink } = parseContent(event.content);
  const name = NostrName(event.pubkey).name;

  return (
    <tr key={event.id}>
      <td><a href={`/video}`}>Video</a></td>
      <td title="Order by Name"><a href={`movie/${event.id}`}>{title}</a></td>
      <td>{description}</td>
      <td>{new Date(event.created_at * 1000).toLocaleDateString()} {new Date(event.created_at * 1000).toLocaleTimeString()}</td>
      <td>
        <a href={magnetlink} title="Download this torrent using magnet">
          <img src="icon-magnet.gif" alt="Magnet link"/>
        </a>
      </td>
      <td>{name ? name : <i>anonymous</i>}</td>
    </tr>
  );
}

const Offers = () => {
  const { events } = useNostrEvents({
    filter: {
      since: 0,
       kinds: [1],
      '#p': [
        '2028cfc4f5ae2b967a75f4196987cbb30d092fa2a439bb807eda382206d39f36'
        ],  
      '#t': [
        'offer'
        ],  
    },
  });

  return (
    <div>
      <h1>Offers</h1>
      <table id="searchResult">
        <thead id="tableHead">
          <tr className="header">
            <th>Type</th>
            <th>Name</th>
            <th>Description</th>
            <th>Uploaded</th>
            <th></th>
            <th>ULed by</th>
          </tr>
        </thead>
        <tbody>
        {events.map((event) => <EventRow event={event} />)}
        </tbody>
      </table>
    </div>
  );
};

export default Offers;