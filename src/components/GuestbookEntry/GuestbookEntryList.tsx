import { useEffect, useState } from "react";
import GuestbookEntry from "./GuestbookEntry";
import IGuestbookEntry from "../../types/IGuestbookEntry";

const GuestbookEntryList = () => {
  const [entries, setEntries] = useState<IGuestbookEntry[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchEntries = async () => {
      try {
        const response = await fetch(
          `${process.env.VITE_EVBP_MUSIC_API_BASE_URL}/api/guestbook-entries`,
        );
        if (!response.ok) {
          throw new Error("Network error. Unable to get guestbook entries.");
        }
        const data: IGuestbookEntry[] = await response.json();
        data.reverse();
        setEntries(data);
      } catch (error) {
        const err = error as Error;
        console.error("Error fetching guestbook entries:", err.message);
      }
    };

    fetchEntries();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <section aria-label="Guestbook Entries" className="guestbook-entry-list">
      {entries.map((entry, index) => (
        <GuestbookEntry
          key={index}
          message={entry.message}
          username={entry.username}
        />
      ))}
    </section>
  );
};

export default GuestbookEntryList;
