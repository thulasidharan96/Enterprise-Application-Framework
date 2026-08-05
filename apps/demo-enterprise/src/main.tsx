import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EnterpriseProvider } from "@eaf/theme";

const queryClient = new QueryClient();

// Manually creating a basic router setup since we are not using the file-based plugin generator right now
import { RootRoute, Route, Router } from "@tanstack/react-router";
import { AppLayout } from "./AppLayout";
import { DashboardPage } from "./pages/DashboardPage";

const rootRoute = new RootRoute({
  component: AppLayout,
});

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const routeTreeManuallyBuilt = rootRoute.addChildren([indexRoute]);

const router = new Router({ routeTree: routeTreeManuallyBuilt });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Start MSW mock worker if we were in dev, ignoring for this scaffolding phase unless you requested it immediately
// if (process.env.NODE_ENV === 'development') {
//   const { worker } = await import('./mocks/browser')
//   worker.start()
// }

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <EnterpriseProvider defaultTheme="system">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </EnterpriseProvider>
  </React.StrictMode>,
);
