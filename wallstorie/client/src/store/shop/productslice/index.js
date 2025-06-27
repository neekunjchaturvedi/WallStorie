import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const generateQueryString = (sortOption, filters) => {
  const queryParams = new URLSearchParams();

  if (sortOption) {
    queryParams.append("sort", sortOption);
  }

  if (filters) {
    if (filters.price && Number(filters.price) > 0) {
      queryParams.append("price", filters.price);
    }

    if (filters.space && filters.space.length > 0) {
      queryParams.append("space", filters.space.join(","));
    }

    if (filters.trends && filters.trends.length > 0) {
      queryParams.append("trends", filters.trends.join(","));
    }

    if (filters.color && filters.color.length > 0) {
      queryParams.append("color", filters.color.join(","));
    }
  }

  return queryParams.toString();
};

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_PORT}/api/shop/products`,
  }),
  tagTypes: ["Products", "ProductDetails"],
  endpoints: (builder) => ({
    // Get Wallpapers
    getWallpapers: builder.query({
      query: ({ sortOption = "popularity", filters = {} }) => {
        const query = generateQueryString(sortOption, filters);
        return `get?${query}`;
      },
      providesTags: ["Products"],
      transformResponse: (response) => response.data,
      // Cache for 5 minutes
      keepUnusedDataFor: 1800,
    }),

    // Get Wallpaper Rolls
    getWallpaperRolls: builder.query({
      query: ({ sortOption = "popularity", filters = {} }) => {
        const query = generateQueryString(sortOption, filters);
        return `getr?${query}`;
      },
      providesTags: ["Products"],
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 1800,
    }),

    // Get Blinds
    getBlinds: builder.query({
      query: ({ sortOption = "popularity", filters = {} }) => {
        const query = generateQueryString(sortOption, filters);
        return `getb?${query}`;
      },
      providesTags: ["Products"],
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 1800,
    }),

    // Get Curtains
    getCurtains: builder.query({
      query: ({ sortOption = "popularity", filters = {} }) => {
        const query = generateQueryString(sortOption, filters);
        return `getc?${query}`;
      },
      providesTags: ["Products"],
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 1800,
    }),

    // Get Artist Collection
    getArtistCollection: builder.query({
      query: ({ sortOption = "popularity", filters = {} }) => {
        const query = generateQueryString(sortOption, filters);
        return `getartist?${query}`;
      },
      providesTags: ["Products"],
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 1800,
    }),

    // Get Products by Category
    getProductsByCategory: builder.query({
      query: ({ category, productType, sortOption, filters = {} }) => {
        const query = generateQueryString(sortOption, filters);
        return `category?category=${category}&productType=${productType}&${query}`;
      },
      providesTags: ["Products"],
      transformResponse: (response) => response.data,
      keepUnusedDataFor: 1800,
    }),

    // Get Product Details
    getProductDetails: builder.query({
      query: (id) => `get/${id}`,
      providesTags: (result, error, id) => [{ type: "ProductDetails", id }],
      transformResponse: (response) => response.data,
      // Cache product details for longer (10 minutes)
      keepUnusedDataFor: 1800,
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetWallpapersQuery,
  useGetWallpaperRollsQuery,
  useGetBlindsQuery,
  useGetCurtainsQuery,
  useGetArtistCollectionQuery,
  useGetProductsByCategoryQuery,
  useGetProductDetailsQuery,
  useLazyGetWallpapersQuery,
  useLazyGetWallpaperRollsQuery,
  useLazyGetBlindsQuery,
  useLazyGetCurtainsQuery,
  useLazyGetArtistCollectionQuery,
  useLazyGetProductsByCategoryQuery,
  useLazyGetProductDetailsQuery,
} = productsApi;

export default productsApi.reducer;
