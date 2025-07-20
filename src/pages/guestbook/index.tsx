import { FC } from "react";
import GuestbookForm from "../../components/GuestbookForm";
import PageContainer from "../../components/PageContainer";
import GuestbookEntryList from "../../components/GuestbookEntry/GuestbookEntryList";
import PageIntro from "../../components/PageIntro";

const Guestbook: FC = () => {
  return (
    <PageContainer>
      <PageIntro
        description="Welcome to the guestbook page! Immortalize yourself in internet history... at least until Adam gets the urge to redesign the site again. ;)"
        header="Guestbook"
      />
      <GuestbookForm />
      <GuestbookEntryList />
    </PageContainer>
  );
};

export default Guestbook;
