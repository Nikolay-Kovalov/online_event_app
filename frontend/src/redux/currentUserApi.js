import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const currentUserAPI = createApi({
    reducerPath: 'currentUserAPI',
    tagTypes: ["Users"],
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8888/api/users'}),
    endpoints: (build) => ({
        getCurrentUser: build.query({
            query: (token) => ({
                url: '/current',
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${token}`,
                },
                
            }),
            providesTags: (result, error, _id) => [{ type: 'Users', _id }],
        }),
        updateUserAvatar: build.mutation({
            query: ({token, body}) => ({
                url: '/avatar',
                method: 'PATCH',
                headers: {
                    'authorization': `Bearer ${token}`,
                    // 'Content-Type': 'multipart/form-data'
                 
                    // 'Content-Type': 'application/x-www-form-urlencoded'
                },
                body
            }),
            invalidatesTags:[{type:'Users', _id:'LIST'}],
        })
    })
})


export const{useGetCurrentUserQuery, useUpdateUserAvatarMutation} = currentUserAPI;