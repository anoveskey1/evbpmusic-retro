import { FC } from "react";
import GuestbookForm from "../../components/GuestbookForm";
import PageContainer from "../../components/PageContainer";

const Guestbook: FC = () => {
  return (
    <PageContainer>
      <h1>Guestbook</h1>
      <p>Welcome to the guestbook page!</p>
      {/* Here you can include the GuestbookForm component */}
      <GuestbookForm />
    </PageContainer>
  );
};

export default Guestbook;
