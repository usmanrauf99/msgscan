import { NotFoundHero } from "@/components/not-found-hero";

export default function NotFound() {
  return (
    <NotFoundHero
      title="Oops! Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      linkText="Back to Home"
      linkHref="/"
    />
  );
}
