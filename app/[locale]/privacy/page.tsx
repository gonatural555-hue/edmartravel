import { createLegalPageHandlers } from "@/lib/create-legal-page";

const handlers = createLegalPageHandlers("privacy");
export const generateMetadata = handlers.generateMetadata;
export default handlers.default;
