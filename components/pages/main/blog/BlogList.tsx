import React, { useEffect, useState } from 'react'
import style from './BlogList.module.css';
import Image from 'next/image';
export interface BlogListType {
  id: 1,
  imgUrl: string,
  imgAlt: string,
  title: string,
  createDate: Date,
  updateDate: Date,
  userId: string
}

export default function BlogList() {

  const [blogList, setBlogList] = useState<BlogListType[]>();

  useEffect(() => {
    const getBlogList = async () => {
      const res = await fetch(`https://api.spharos2nd-nft.xyz/v1/board/blog/main`);
      const data = await res.json();
      setBlogList(data);
      console.log(data);
    }
    getBlogList();
  },[])
  return (
    <section>
      <div className={style.sectionTitle}>함 가보이소 ~ </div>
      {
        blogList?.map((blog) => (
          <div className={style.blogWrap} key={blog.id}>
           
            <div className={style.blogImg}>
              <Image src={blog.imgUrl} alt={blog.title} width={600} height={600} />
            </div>
            <div className={style.blogTitle}>
              {blog.title}
            </div>
            <div className={style.blogAuthor}>
              <p>{String(blog.createDate).split("T")[0]} by 빌리타 </p>
              <p>read more</p>
            </div>
            
            <div className={style.blogDate}>
              {/* {blog.createDate.getFullYear()}.{blog.createDate.getMonth()}.{blog.createDate.getDate()} */}
            </div>
          </div>
        ))
      }
    </section>
  )
}
