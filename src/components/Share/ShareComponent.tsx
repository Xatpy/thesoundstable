import React from "react";

import { useGlobalContext } from "src/hooks/useGlobalContext";

import { ShareLink } from "./ShareLink";

import logoTwitter from "../../images/share/logoTwitter.png";
import logoFacebook from "../../images/share/logoFacebook.png";
import logoTg from "../../images/share/logoTg.png";
import logoWhatsapp from "../../images/share/logoWhatsapp.png";

export enum ShareType {
  Twitter,
  Facebook,
  Whatsapp,
  Telegram,
}

type Props = {
  type: ShareType;
};

export const ShareComponent: React.FC<Props> = ({ type }) => {
  const { title } = useGlobalContext();
  const getShareComponentByType = (type: ShareType): React.ReactElement => {
    const url = window.location.href;

    switch (type) {
      case ShareType.Facebook:
        return (
          <ShareLink
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            title="Facebook"
            src={logoFacebook}
          />
        );
      case ShareType.Twitter: {
        const tweetMessage = encodeURI(
          `🎶 ${title} Sounds Table - La web app con sus mejores sonidos: `
        );
        return (
          <ShareLink
            href={`https://twitter.com/intent/tweet?text=${tweetMessage}${url}`}
            title="Twitter"
            src={logoTwitter}
          />
        );
      }
      case ShareType.Telegram:
        return (
          <ShareLink
            href={`https://t.me/share/url?url=${url}`}
            title="Telegram"
            src={logoTg}
          />
        );
      case ShareType.Whatsapp:
        return (
          <ShareLink
            href={`whatsapp://send?text=${url}`}
            title="Whatsapp"
            src={logoWhatsapp}
          />
        );
      default:
        throw new Error();
    }
  };

  return getShareComponentByType(type);
};
