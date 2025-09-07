import type { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import { HelmetProvider } from "react-helmet-async";
import { apolloClient } from "../api/apolloClient";
import { FavoritesProvider } from "../features/favorites/FavoritesContext";
import { CommentsProvider } from "../features/comments/CommentsContext";
import { SoftDeleteProvider } from "../features/softdelete/SoftDeleteContext";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <ApolloProvider client={apolloClient}>
        <FavoritesProvider>
          <CommentsProvider>
            <SoftDeleteProvider>{children}</SoftDeleteProvider>
          </CommentsProvider>
        </FavoritesProvider>
      </ApolloProvider>
    </HelmetProvider>
  );
}
