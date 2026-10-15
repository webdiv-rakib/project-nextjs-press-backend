import { revalidateTag } from "next/cache";

export const getBlogs = async () => {
    const posts = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        cache: "no-store",
        next: {
            revalidate: 60 * 60 * 24,  // 1day
            tags: ["posts"]
        }
    });
    const postData = await posts.json();
    console.log(postData);
    return postData
}

export const renewBlogCache = () => {
    revalidateTag("posts","max")
}
