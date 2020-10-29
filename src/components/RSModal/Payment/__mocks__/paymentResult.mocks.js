// @flow
import type { CmsContent } from "../PaymentResult.types";

const translations: CmsContent = {
    payment_result_title_success: "Your {{amount}} deposit was successful",
    payment_result_content_success: "You can find your receipt and details in 'History'.",
    payment_result_title_fail: "Deposit not successful",
    payment_result_content_fail: "We had a problem while processing your payment, please try again.",
}

export default translations;