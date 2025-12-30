const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL || 'https://ppmdgygupuzthqxfippv.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwbWRneWd1cHV6dGhxeGZpcHB2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDU0MjYsImV4cCI6MjA3NDk4MTQyNn0.JdOoMgW7oXtHycvJGl9buYagZaGXoqkU9rF0KnTNKX4';

export interface Category {
  id: number;
  name: string;
  slug: string;
  article_count?: number;
}

/**
 * Fetch categories with published article counts
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/categories?select=id,name,slug,articles!inner(id)&articles.status=eq.published&order=name`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.statusText);
      return [];
    }

    const data = await response.json();

    // Transform to get counts
    const categoryMap = new Map<number, Category>();
    data.forEach((cat: any) => {
      if (!categoryMap.has(cat.id)) {
        categoryMap.set(cat.id, {
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          article_count: 0,
        });
      }
      if (cat.articles?.id) {
        const existing = categoryMap.get(cat.id);
        if (existing) {
          existing.article_count = (existing.article_count || 0) + 1;
        }
      }
    });

    return Array.from(categoryMap.values())
      .filter(cat => (cat.article_count || 0) > 0)
      .sort((a, b) => (b.article_count || 0) - (a.article_count || 0));
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch ALL categories (for navbar display, regardless of article count)
 */
export async function fetchAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/categories?select=id,name,slug&order=name`,
      {
        headers: {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch all categories:', response.statusText);
      return [];
    }

    const data = await response.json();
    return data.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    }));
  } catch (error) {
    console.error('Error fetching all categories:', error);
    return [];
  }
}
