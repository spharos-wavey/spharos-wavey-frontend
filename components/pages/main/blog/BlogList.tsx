import React, { useEffect, useState } from "react";
import style from "./BlogList.module.css";
import Image from "next/image";
export interface BlogListType {
  id: 1;
  imgUrl: string;
  imgAlt: string;
  title: string;
  createDate: Date;
  updateDate: Date;
  userId: string;
}

export default function BlogList() {
  const [blogList, setBlogList] = useState<BlogListType[]>();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  useEffect(() => {
    const getBlogList = async () => {
      const res = await fetch(`${API_URL}/blog/main`);
      const data = await res.json();
      setBlogList(data);
    };
    getBlogList();
  }, []);
  return (
    <section>
      <div className={style.sectionTitle}>빌리타 추천 여행지</div>
      {blogList?.map((blog) => (
        <div className={style.blogWrap} key={blog.id}>
          <div className={style.blogImg}>
            <Image
              src={blog.imgUrl}
              alt={blog.title}
              width={600}
              height={600}
            />
          </div>
          <div className={style.blogTitle}>{blog.title}</div>
          <div className={style.blogAuthor}>
            <p>{String(blog.createDate).split("T")[0]} by 빌리타 </p>
            <p>read more</p>
          </div>
        </div>
      ))}
    </section>
  );
}
