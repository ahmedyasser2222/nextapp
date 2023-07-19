import React from "react";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

async function getData() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts`,
  { next: { revalidate: 10 } }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}




const blog = async () => {
  const data = await getData();

  return (
    <div className={styles.mainContainer}>
      {data.map((item, index) => {
        if(index <= 10){
            return (
              <Link href={`/blog/${item.id}`} className={styles.container} key={item.id}>
                <div className={styles.imageContainer}>
                  <Image
                    src={"https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=600"}
                    alt=""
                    width={400}
                    height={250}
                    className={styles.image}
                  />
                </div>
                <div className={styles.content}>
                  <h1 className={styles.title}>{item.title}</h1>
                  <p className={styles.desc}>
                    {item.desc}
                  </p>
                </div>
              </Link>
            )
        }
      } )}
    </div>
  );
};

export default blog;
