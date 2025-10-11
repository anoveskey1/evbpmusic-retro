import { AlertType } from "@/types";

interface IAlertIcon {
  alt: string;
  src: string;
}

const getAlertType = (alertType: AlertType): IAlertIcon => {
  switch (alertType) {
    case "INFO":
      return { alt: "information icon", src: "/images/msg_information-0.png" };
    case "WARNING":
      return { alt: "warning icon", src: "/images/msg_warning-0.png" };
    case "ERROR":
      return { alt: "error icon", src: "/images/msg_error-0.png" };
    case "SUCCESS":
      return { alt: "success icon", src: "/images/trust0-0.png" };
  }
};

export default getAlertType;
