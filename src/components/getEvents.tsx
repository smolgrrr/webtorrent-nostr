import { useNostrEvents } from "nostr-react";

const ProfileFeed = () => {
  const { events } = useNostrEvents({
    filter: {
    // authors: [
    //     "eb9322a8ece8cb69993210805f81763b376c206a36b50e49763a5392d4becdf0",
    //     ],
      since: 0,
       kinds: [1],
      '#p': [
        '2028cfc4f5ae2b967a75f4196987cbb30d092fa2a439bb807eda382206d39f36'
        ],  
    },
  });

  return (
    <>
      {events.map((event) => (
        <p key={event.id}>{event.pubkey} posted: {event.content}</p>
      ))}
    </>
  );
};

export default ProfileFeed;