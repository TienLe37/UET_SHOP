import Cookies from "js-cookie";
import { apiSlice } from "@/redux/api/apiSlice";
import { userLoggedIn } from "./authSlice";
import { IAddStuff, IAdminGetRes, IAdminLoginAdd, IAdminLoginRes, IAdminUpdate, IAdminUpdateRes, IStuff } from "@/types/admin-type";

export const authApi = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login
    loginAdmin: builder.mutation<IAdminLoginRes, IAdminLoginAdd>({
      query: (data) => ({
        url: "api/admin/login",
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token, ...others } = result.data;
          Cookies.set(
            "admin",
            JSON.stringify({
              accessToken: token,
              user: others
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: token,
              user: others
            })
          );
        } catch (err) {
          // do nothing
        }
      },
    }),
    // reset password
    forgetPassword: builder.mutation<{message:string},{email:string}>({
      query: (data) => ({
        url: "api/admin/forgot-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // confirmForgotPassword
    adminConfirmForgotPassword: builder.mutation<{message:string},{token:string,password:string}>({
      query: (data) => ({
        url: "api/admin/reset-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // change password
    adminChangePassword: builder.mutation<{ message: string }, { email: string; oldPass: string; newPass: string }>({
      query: (data) => ({
        url: "api/admin/change-password",
        method: "PATCH",
        body: data,
      }),
    }),
    // updateProfile 
    updateProfile: builder.mutation<IAdminUpdateRes, { id: string, data: IAdminUpdate }>({
      query: ({ id, ...data }) => ({
        url: `/api/admin/update/${id}`,
        method: "PATCH",
        body: data.data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          const { token, ...others } = result.data;
          Cookies.set(
            "admin",
            JSON.stringify({
              accessToken: token,
              user: others
            }),
            { expires: 0.5 }
          );

          dispatch(
            userLoggedIn({
              accessToken: token,
              user: others
            })
          );
        } catch (err) {
          // do nothing
        }
      },
      invalidatesTags:["AllStaff"]
    }),
  })
});

export const {
  useLoginAdminMutation,
  useForgetPasswordMutation,
  useAdminConfirmForgotPasswordMutation,
  useAdminChangePasswordMutation,
  useUpdateProfileMutation,
} = authApi;
