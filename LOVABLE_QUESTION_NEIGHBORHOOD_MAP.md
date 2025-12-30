# Question for Lovable: Neighborhood Page Map Implementation

## Context

We're building neighborhood pages in our Astro site that match the original luxexpose.com structure. The neighborhood page at `/cities/{citySlug}/neighborhoods/{neighborhoodSlug}` should include an interactive map section similar to the original site.

## Current Issue

The map section is not displaying on the neighborhood pages, even though we have:
- The `CityMap` component implemented
- Map locations being calculated from neighborhood experiences
- The map section in the template

## What We Need

Please provide the exact implementation details for the map section on neighborhood pages, specifically:

### 1. Map Component Requirements
- What component/props does the map need?
- How should map locations/markers be structured?
- What data source should we use for map markers? (experiences, venues, specific neighborhood data?)

### 2. Map Styling & Layout
- What should the map container styling be?
- What height/sizing should the map have?
- Should there be a heading above the map? (e.g., "Explore the Area")
- Any specific styling requirements?

### 3. Map Data Source
- Should we use `city_experiences` filtered by neighborhood name?
- Are there specific fields in the database for neighborhood map markers?
- Should locations come from a different table or query?

### 4. Map Configuration
- What should the default zoom level be for neighborhoods?
- How should we calculate the map center? (from marker locations, fixed coordinates, etc.)
- Should the map show all neighborhood experiences, or a curated list?

### 5. Original Site Reference
Please check the original luxexpose.com neighborhood page (e.g., https://luxexpose.com/boston/neighborhoods/back-bay) and provide:
- Exact structure of the map section
- What markers/data points are shown
- How the map is integrated into the page

## Current Implementation

```astro
<!-- 5. Interactive Map Section -->
{mapLocations.length > 0 && (
  <section class="max-w-[1400px] mx-auto px-8 py-12">
    <h2 class="text-3xl md:text-4xl font-serif font-bold mb-8 text-center text-foreground">
      Explore the Area
    </h2>
    <CityMap
      locations={mapLocations}
      cityName={neighborhood.name}
      centerLat={mapCenterLat}
      centerLng={mapCenterLng}
      zoom={mapZoom}
    />
  </section>
)}
```

We're currently:
1. Fetching experiences from `city_experiences` filtered by neighborhood name
2. Filtering for experiences with `lat` and `lng` values
3. Calculating map center from marker locations (or using city center as fallback)
4. Passing locations to `CityMap` component

## Questions

1. Is the `CityMap` component the correct one to use for neighborhood pages?
2. What's the correct way to fetch and structure map locations for neighborhoods?
3. Are there any additional requirements or data we need for the map to display correctly?
4. Should the map always show, or only when there are map locations available?
5. What's the exact structure and styling from the original site's neighborhood map section?

Thank you!

