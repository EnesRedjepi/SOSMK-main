import {
  faUserInjured,
  faMask,
  faCarBurst,
  faGun,
  faPills,
  faGavel,
  faEllipsis,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";

export const categories = [
  {
    id: "assault",
    label: "Assault",
    icon: faUserInjured,
  },
  {
    id: "theft",
    label: "Theft",
    icon: faMask,
  },
  {
    id: "traffic",
    label: "Traffic violation",
    icon: faCarBurst,
  },
  {
    id: "weapon",
    label: "Weapon possession",
    icon: faGun,
  },
  {
    id: "drugs",
    label: "Drug-related offenses",
    icon: faPills,
  },
  {
    id: "corruption",
    label: "Corruption",
    icon: faGavel,
  },
  {
    id: "other",
    label: "Other",
    icon: faEllipsis,
  },
  {
    id: "emergencyCall",
    label: "Emergency Call",
    icon: faPhoneVolume,
  },
];

export const cities = [
  "Skopje",
  "Bitola",
  "Kumanovo",
  "Prilep",
  "Tetovo",
  "Veles",
  "Ohrid",
  "Gostivar",
  "Strumica",
  "Kavadarci",
];

export const emergencyNumbers = [
  { name: "Police", number: "192" },
  { name: "Firefighters", number: "193" },
  { name: "Ambulance", number: "194" },
  { name: "Emergency Hotline", number: "112" },
];
