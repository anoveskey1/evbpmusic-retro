import { FC } from "react";
import GuestbookForm from "../../components/GuestbookForm";
import PageContainer from "../../components/PageContainer";
import GuestbookEntry from "../../components/GuestbookEntry/GuestbookEntry";
import GuestbookEntryList from "../../components/GuestbookEntry/GuestbookEntryList";

const Guestbook: FC = () => {
  return (
    <PageContainer>
      <h1>Guestbook</h1>
      <p>
        Welcome to the guestbook page! Immortalize yourself in internet
        history... at least until Adam gets the urge to redesign the site again.
        ;)
      </p>
      <GuestbookForm />
      <GuestbookEntryList />
    </PageContainer>
  );
};

export default Guestbook;
