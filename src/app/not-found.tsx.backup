import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "The requested page could not be found on Science Lab Tools.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <main>
      <section className="section">
        <Container>
          <p className="eyebrow">404 error</p>
          <h1>Page not found</h1>
          <p>
            The page you requested does not exist or may have moved.
          </p>
          <p>
            <Link className="button button--primary" href="/">
              Return to homepage
            </Link>
          </p>
        </Container>
      </section>
    </main>
  );
}
