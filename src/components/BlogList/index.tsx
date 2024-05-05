import Link from "next/link";
import { getAllPostsMeta, PostDetail } from "@/data/post";
import dayjs from "dayjs";

export default async function BlogList() {
  const posts = await getAllPostsMeta();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const postMap: Map<number, PostDetail[]> = new Map();

  posts.forEach(({ content, meta }) => {
    const date = dayjs(meta.date);
    const month = monthNames[date.month()];
    const year = date.year();
    const newPost = {
      content,
      meta: {
        ...meta,
        date: `${month} ${date.get("dates")}`,
      },
    };
    if (postMap.has(year)) {
      postMap.get(year)!.push(newPost);
    } else {
      postMap.set(year, [newPost]);
    }
  });

  return (
    <div className="init-aniamtion relative flex flex-col gap-16 pt-6">
      {[...postMap.entries()].map(([year, posts]) => (
        <div className="flex flex-col gap-4">
          <div className="year-title">{year}</div>
          <div className="flex flex-col gap-8">
            {(posts as PostDetail[]).map((post) => {
              return (
                <Link
                  className="block text-[var(--infoText)] transition-all hover:text-[var(--title)]"
                  key={post.meta.id}
                  href={"/blogs/" + post.meta.slug + "/"}
                >
                  <article className="flex items-baseline gap-4">
                    <div className="text-[16px] font-bold ">
                      {post.meta.title}
                    </div>
                    <p className="text-[13px] text-[var(--title)] opacity-50">
                      {post.meta.date}
                    </p>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
