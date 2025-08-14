import { useSnapshot } from "valtio";
import { webState } from "../../../../data/webStates";
import Container from "../../UI/Wrappers/Container.Wrapper";
import BlogCard from "./BlogCard";

const Blogs = () => {
  const snap = useSnapshot(webState);
  const blogs = snap.blogPosts;

  return (
    <Container className={"my-20"}>
      <div className="w-full flex items-center justify-center">
        <span className="font-bold text-3xl text-themecolor">
          Our Recent Blog Posts
        </span>
      </div>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 ">
        {blogs?.slice(0, 3)?.map((blog) => {
          return <BlogCard key={blog?.id} blog={blog} />;
        })}
      </div>
    </Container>
  );
};

export default Blogs;
