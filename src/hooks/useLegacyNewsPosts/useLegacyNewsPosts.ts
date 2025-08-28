import ILegacyNewsPost from "@typeDefs/ILegacyNewsPost";
import newsPosts from "../../../public/evbp-blog-data.json";

const useLegacyNewsPosts = (): ILegacyNewsPost[] => newsPosts;

export default useLegacyNewsPosts;
