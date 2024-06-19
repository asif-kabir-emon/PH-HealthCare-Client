import { baseApi } from "./baseApi";
import { TagTypes } from "../tag-types";

export const BASE_PAYMENT = "/payment";

const paymentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        initialPayment: build.mutation({
            query: (id: string) => ({
                url: `/payment/init-payment/${id}`,
                method: "POST",
            }),
            invalidatesTags: [TagTypes.payment],
        }),
    }),
});

export const { useInitialPaymentMutation } = paymentApi;

export default paymentApi;
