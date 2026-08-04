import { createLegalPageHandlers } from "@/lib/create-legal-page";

const handlers = createLegalPageHandlers("cookies");
export const generateMetadata = handlers.generateMetadata;
export default handlers.default;
