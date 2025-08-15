import {
  AccentBlue,
  AccentBrown,
  AccentGreen,
  AccentRed,
  AccentYellow,
  Link,
  Pdf,
  Video,
} from "../../assets/svg/svg";
import { Icon } from "../../components/atoms/iconWrapper";

export const cardsData = [
  {
    title: "The ultimate guide to Workplace Chat",
    subTitle: "Communication Strategies",
    icon: Link,
    tagLabel: "Secure Base",
    accentIcon: <Icon icon={AccentRed} width={"full"} h={"full"} />,
    accentCorner: "tr",
    accentWidth: "182px",
    documentType: "Link",
    height: {
      base: "160PX",
      lg: "75px",
    },
  },
  {
    title: "Building Trust in Remote Teams",
    subTitle: "Leadership Development",
    icon: Video,
    tagLabel: "Sense of Appreciation",
    accentIcon: <Icon icon={AccentGreen} width={"full"} h={"full"} />,
    height: {
      base: "124px",
      lg: "112px",
    },
    documentType: "Video",
    accentCorner: "t",
  },
  {
    title: "Employee Recognition Best Practices",
    subTitle: "Talent Management",
    icon: Link,
    tagLabel: "Learning Organisation",
    accentIcon: <Icon icon={AccentRed} width={"full"} h={"full"} />,
    accentWidth: "182px",
    height: {
      base: "160PX",
      lg: "75px",
    },
    documentType: "Link",
    accentCorner: "tr",
  },
  {
    title: "Creating a Culture of Innovation",
    subTitle: "Organizational Excellence",
    icon: Video,
    accentIcon: <Icon icon={AccentBrown} width={"full"} h={"full"} />,
    accentCorner: "t",
    tagLabel: "Mission and Vision",
    height: {
      base: "124px",
      lg: "112px",
    },
    documentType: "Video",
  },
  {
    title: "Mental Health First Aid Guidelines",
    subTitle: "Employee Support",
    icon: Pdf,
    tagLabel: "Wellbeing",
    accentCorner: "tl",
    isActive: true,
    accentIcon: <Icon icon={AccentYellow} width={"full"} h={"full"} />,
    accentWidth: "96%",
    height: {
      base: "94px",
    },
    documentType: "PDF",
  },
  {
    title: "Taking stock of mental health in your workplace",
    subTitle: "Workplace Assessment",
    icon: Pdf,
    tagLabel: "Secure Base",
    accentCorner: "tr",
    accentIcon: <Icon icon={AccentBlue} width={"full"} h={"full"} />,
    accentWidth: "192px",
    height: {
      base: "160PX",
      lg: "118px",
    },
    documentType: "PDF",
  },
];

export const foundationFilters = [
  "Secure Base",
  "Sense of Appreciation",
  "Learning Organisation",
  "Mission and Vision",
  "Wellbeing",
];

export const documentTypeFilters = ["DOC", "Link", "PDF", "Video"];

export const categoriesFilters = [
  "Sample",
  "Sample",
  "Sample",
  "Sample",
  "Sample",
];
