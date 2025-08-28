import { useMemo } from "react";
import ILegacyNewsPost from "@typeDefs/ILegacyNewsPost";
import newsPosts from "../../../public/evbp-blog-data.json";

function useLegacyPost(slug: string): ILegacyNewsPost | null {
  return useMemo(() => {
    return newsPosts.find((post) => post.slug === slug) ?? null;
  }, [slug]);
}

export default useLegacyPost;
