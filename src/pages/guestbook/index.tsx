import { FC } from "react";
import GuestbookForm from "../../components/GuestbookForm";
import PageContainer from "../../components/PageContainer";
import GuestbookEntry from "../../components/GuestbookEntry/GuestbookEntry";
import GuestbookEntryList from "../../components/GuestbookEntry/GuestbookEntryList";

const Guestbook: FC = () => {
  return (
    <PageContainer>
      <h1>Guestbook</h1>
      <p>Welcome to the guestbook page!</p>
      <GuestbookForm />
      <GuestbookEntryList />
    </PageContainer>
  );
};

export default Guestbook;
