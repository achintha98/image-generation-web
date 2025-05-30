"use client";

import { useState, useEffect } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  // solution start
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // Avoid hydration errors by not rendering the theme before mounting
  }

  // solution end

  //main theme return
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
