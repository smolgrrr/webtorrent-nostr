import { useNostrEvents } from "nostr-react";

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
            <th>Link</th>
            <th>Title</th>
            <th>Description</th>
            <th>Magnet Link</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            const { title, description, magnetlink } = parseContent(event.content);
            return (
            <tr key={event.id}>
              <td><a href={`movie/${event.id}`}>Video</a></td>
              <td title="Order by Name">{title}</td>
              <td>{description}</td>
              <td>{magnetlink}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Offers;