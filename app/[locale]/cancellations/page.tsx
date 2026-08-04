import { createLegalPageHandlers } from "@/lib/create-legal-page";

const handlers = createLegalPageHandlers("cancellations");
export const generateMetadata = handlers.generateMetadata;
export default handlers.default;
