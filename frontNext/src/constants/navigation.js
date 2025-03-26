import { LayoutDashboard, User } from "lucide-react";

export const navigation = [
  { name: "Inici", href: "/", icon: LayoutDashboard },
  { name: "Profesors", href: "/teachers", icon: User, isDinamic: true },
  // { name: "Els meus cursos", href: "/courses", icon: BookOpen },
  // { name: "Horari", href: "/schedule", icon: Calendar },
  // { name: "Configuració", href: "/settings", icon: Settings },
];