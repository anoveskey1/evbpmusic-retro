import { FC } from "react";
import { Helmet } from "react-helmet-async";
import GuestbookEntryList from "@components/GuestbookEntry/GuestbookEntryList";
import GuestbookForm from "@components/GuestbookForm";
import PageContainer from "@components/PageContainer";
import PageIntro from "@components/PageIntro";
import "@/styles/default-page.less";

const Guestbook: FC = () => {
  return (
    <PageContainer>
      <Helmet>
        <meta
          name="description"
          content="Sign the EVBP Homepage's guestbook and immortalize yourself in internet history!"
        />
        <title>EVBPMusic.com | Guestbook</title>
      </Helmet>
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
