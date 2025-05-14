import { NotFoundHero } from "@/components/not-found-hero";

export default function Search({ params }: { params: { term: string } }) {
  const searchTerm = params.term || "";

  return (
    <NotFoundHero
      title={`No Matches Available: ${searchTerm}`}
      description="Your search did not match with any record."
      linkText="Back to Home"
      linkHref="/"
      advancedSearch
    />
  );
}
