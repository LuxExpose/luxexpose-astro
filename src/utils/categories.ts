const SUPABASE_URL = "https://ppmdgygupuzthqxfippv.supabase.co";
const SUPABASE_ANON_KEY = import.meta.env.SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWRneWd1cHV6dGhxeGZpcHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDU0MjYsImV4cCI6MjA3NDk4MTQyNn0.JdOoMgW7oXtHycvJGl9buYagZaGXoqkU9rF0KnTNKX4";

export interface Category {
  id: string;
  name: string;
  slug: string;
  article_count?: number;
}

export async function fetchCategories(): Promise<Category[]> {
  try {
    // Try to fetch with article counts first (if the relationship exists)
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/categories?select=id,name,slug&order=name.asc`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (response.ok) {
      const categories = await response.json();
      
      // Try to get article counts for each category
      const categoriesWithCounts = await Promise.all(
        (categories || []).map(async (category: Category) => {
          try {
            const countResponse = await fetch(
              `${SUPABASE_URL}/rest/v1/articles?category_id=eq.${category.id}&select=id&limit=1`,
              {
                headers: {
                  apikey: SUPABASE_ANON_KEY,
                  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                  Prefer: 'count=exact',
                },
              }
            );
            
            if (countResponse.ok) {
              const countHeader = countResponse.headers.get('content-range');
              if (countHeader) {
                const total = parseInt(countHeader.split('/')[1]) || 0;
                return { ...category, article_count: total };
              }
            }
          } catch (error) {
            // If count fails, just return category without count
          }
          return category;
        })
      );
      
      // Filter to only show categories with at least 15 articles (as recommended)
      return categoriesWithCounts.filter((cat) => !cat.article_count || cat.article_count >= 15);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }

  return [];
}

