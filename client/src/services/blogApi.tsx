import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { blogType } from "../types/blogType";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/" }),
  tagTypes: ["Blogs"],
  endpoints: (builder) => ({
    getAllBlogs: builder.query<blogType[], void>({
      query: () => "",
      providesTags: (result) => {
        if (result) {
          const final = [
            ...result.map(({ _id }) => ({ type: "Blogs" as const, _id }), {
              type: "Blogs" as const,
              _id: "LIST",
            }),
          ];
          return final;
        }
        return [{ type: "Blogs", _id: "LIST" }];
      },
    }),
    getBlog: builder.query<blogType, string>({
      query: (id) => `blogs/${id}`,
    }),
    createBlog: builder.mutation<blogType, Omit<blogType, "_id">>({
      query: (body) => ({
        url: "",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Blogs"],
    }),
    editBlog: builder.mutation<blogType, { _id: string; body: blogType }>({
      query: (data) => ({
        url: `blogs/${data._id}`,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation<{}, string>({
      query: (id) => ({
        url: `blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
  useGetAllBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useEditBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
