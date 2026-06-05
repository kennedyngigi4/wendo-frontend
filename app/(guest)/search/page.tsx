import SearchClientPage from "./page-client";

interface SearchPageProps {
  searchParams: Promise<{
    q?: string;
  }>;
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {

  const params = await searchParams;
  const query = params.q || "";

  let results = [];

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/search/?q=${query}`,
      {
        cache: "no-store",
      }
    );

    const data = await response.json();

    results = [
      ...(data.specialists || []).map((item: any) => ({
        ...item,
        result_type: "specialist",
        display_name: item.name,
      })),

      ...(data.branches || []).map((item: any) => ({
        ...item,
        result_type: "branch",
        display_name: item.name,
      })),

      ...(data.blogs || []).map((item: any) => ({
        ...item,
        result_type: "blog",
        display_name: item.title,
      })),
    ];

  } catch (error) {
    console.error(error);
  }

  return (
    <div className="app-container">
      <SearchClientPage
        query={query}
        results={results}
      />
    </div>
  );
};

export default SearchPage;