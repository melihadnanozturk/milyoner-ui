import {createApi} from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "../../../store/axiosBaseQuery.js";

export const panelApi = createApi({
    reducerPath: "panelApi",
    baseQuery: axiosBaseQuery({baseUrl: "/panel"}),
    tagTypes: ["Panel"],
    endpoints: (builder) => ({
        getAllQuestions: builder.query({
            query: (body) => ({
                url: '/questions',
                method: 'POST',
                data: body
            }),
            providesTags: (result) =>
                result
                    ? [
                        ...result.data.map(({id}) => ({type: 'Questions', id})),
                        {type: 'Questions', id: 'LIST'},
                    ]
                    : [{type: 'Questions', id: 'LIST'}],
        }),
        getQuestionById: builder.query({
            query: (id) => ({
                url: `/questions/${id}`,
                method: 'GET',
            }),
            providesTags: (result, error, id) =>
                [{type: 'Questions', id}],
        }),
        createNewQuestion: builder.mutation({
            query: (body) => ({
                url: '/questions/operation',
                method: 'POST',
                data: body
            }),
            invalidatesTags: [{type: 'Questions', id: 'LIST'}]
        }),
    })
})

export const {useGetAllQuestionsQuery, useGetQuestionByIdQuery, useCreateNewQuestionMutation} = panelApi;