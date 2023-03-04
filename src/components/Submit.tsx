import { useNostr, dateToUnix } from "nostr-react";

import {
  type Event as NostrEvent,
  getEventHash,
  getPublicKey,
  signEvent,
} from "nostr-tools";

const Submit = () => {
  const { publish } = useNostr();

  const onPost = async () => {
    const privKey = prompt("Paste your private key:");

    if (!privKey) {
      alert("no private key provided");
      return;
    }

    const message = prompt("Enter the message you want to send:");

    if (!message) {
      alert("no message provided");
      return;
    }

    const event: NostrEvent = {
      id: 'null',
      content: message,
      kind: 1,
      tags: [
        ["p", "2028cfc4f5ae2b967a75f4196987cbb30d092fa2a439bb807eda382206d39f36"],
        ["t", "offer"]
      ],
      created_at: dateToUnix(),
      pubkey: getPublicKey(privKey),
      sig: 'null',
    };

    event.id = getEventHash(event);
    event.sig = signEvent(event, privKey);

    publish(event);
  };

  return (
    <button onClick={onPost}>Post a message!</button>
  );
}

export default Submit;