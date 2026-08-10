import type { ReactNode } from "react";
import { Counter } from "./demos/Counter";
import { PrettierFormat } from "./demos/PrettierFormat";
import { Timer } from "./demos/Timer";
import { LiftingState } from "./demos/LiftingState";

export type Step = {
  id: number;
  label: string;
  // Pași fără componentă = concepte deja predate, dar fără fișier de demo
  // dedicat (ex. class component a fost doar discuție), sau pași ce urmează.
  component?: () => ReactNode;
};

export const steps: Step[] = [
  { id: 1, label: "Scaffold" },
  { id: 2, label: "useState", component: () => <Counter /> },
  { id: 3, label: "Class component" },
  { id: 4, label: "Funcții pure" },
  { id: 5, label: "Prettier", component: () => <PrettierFormat /> },
  { id: 6, label: "useEffect + cleanup", component: () => <Timer /> },
  { id: 7, label: "Props & lifting state", component: () => <LiftingState /> },
  { id: 8, label: "Meniu de demo-uri" },
  { id: 9, label: "Path alias @/" },
  { id: 10, label: "Tailwind CSS" },
  { id: 11, label: "shadcn/ui" },
  { id: 12, label: "Custom hooks" },
  { id: 13, label: "useContext (stare globală)" }
];
