import LOGO_IMAGES from "../images/index";

export function GetLogo(image: string) {
  switch (image) {
    case 'LOGO':
      return LOGO_IMAGES.LOGO;
    default:
      break;
  }
}
