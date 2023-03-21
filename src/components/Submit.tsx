import { useNostr, dateToUnix } from "nostr-react";
import { useMemo, useState } from "react";
import {
  type Event as NostrEvent,
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
  const [kind, setKind] = useState<"offer" | "request">("offer");

  const pk = useMemo(() => {
    if (window.nostr) {
      return window.nostr.getPublicKey();
    } else {
      return '';
    }
  }, []);

  const handleKindChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setKind(event.target.value as "offer" | "request");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    //const privKey = prompt("Paste your private key:");
    let message

    // if (!privKey) {
    //   alert("no private key provided");
    //   return;
    // }

    if (kind === "offer") {
    message = "title: " + title + "\ndescription: " + description + "\nlocation: " + magnetLink + "\n";
    } else if (kind === "request") {
    message = requestMessage;
    }
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
        ["t", kind]
      ],
      created_at: dateToUnix(),
      pubkey: pk,
      sig: 'null',
    };

    newEvent.id = getEventHash(newEvent);
    newEvent.sig = window.nostr.signEvent(newEvent);

    publish(newEvent);
  };

  return (
    <>
    <Header />
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <select value={kind} onChange={handleKindChange}>
          <option value="offer">Offer</option>
          <option value="request">Request</option>
        </select>
      </label>
      {kind === "offer" ? (
        <>
          <label>
            Title:
            <input type="text" name="title" onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Description:
            <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} />
          </label>
          <label>
            Magnet Link:
            <input type="text" name="magnetLink" onChange={(e) => setMagnetLink(e.target.value)} />
          </label>
        </>
      ) : (
        <label>
          Message:
          <textarea name="requestMessage" onChange={(e) => setRequestMessage(e.target.value)}/>
        </label>
      )}
      <button type="submit">Post a message!</button>
    </form>
    </>
  );
}

export default Submit;