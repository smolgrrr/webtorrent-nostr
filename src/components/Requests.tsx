import { useNostrEvents } from "nostr-react";

const Requests = () => {
  const { events } = useNostrEvents({
    filter: {
      since: 0,
       kinds: [1],
      '#p': [
        '2028cfc4f5ae2b967a75f4196987cbb30d092fa2a439bb807eda382206d39f36'
        ],  
      '#t': [
        'request'
        ],  
    },
  });

  return (
    <div>
      <h1>Requests</h1>
      <button onClick={() => window.location.href = '/submit'}>Request a file</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            return (
            <tr key={event.id}>
              <td><a href={`movie/${event.id}`}>{event.id}</a></td>
              <td>{event.content}</td>
            </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Requests;