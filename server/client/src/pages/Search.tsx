import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import { blogTypes } from "../types/blog.type";

type sideBarDataTypes = {
  searchTerm: string;
  sort: string;
  category: string;
};

const Search = () => {
  const [sideBarData, setSideBarData] = useState<sideBarDataTypes>({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [blogs, setBlogs] = useState<blogTypes[]>([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSideBarData({
        ...sideBarData,
        searchTerm: searchTermFromUrl as string,
        sort: sortFromUrl as string,
        category: categoryFromUrl as string,
      });
    }

    const fetchBlogs = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/blog/getblogs?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      } else {
        const data = await res.json();
        setBlogs(data.blogs);
        setLoading(false);
        if (data.blogs.length === 9) setShowMore(true);
        else setShowMore(false);
      }
    };

    fetchBlogs();
  }, [location.search]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    if (e.target.id === "searchTerm") {
      setSideBarData({ ...sideBarData, searchTerm: e.target.value });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSideBarData({ ...sideBarData, sort: order });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSideBarData({ ...sideBarData, category: category });
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("searchTerm", sideBarData.searchTerm);
    urlParams.set("sort", sideBarData.sort);
    urlParams.set("category", sideBarData.category);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const numberOfBlogs = blogs.length;
    const startIndex = numberOfBlogs;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex.toString());
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/blog/getblogs?${searchQuery}`);
    if (!res.ok) return;
    else {
      const data = await res.json();
      setBlogs([...blogs, ...data.blogs]);
      if (data.blogs.length === 9) setShowMore(true);
      else setShowMore(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-svh border-gray-500">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 ">
          <div className="flex items-center gap-2">
            <label
              htmlFor="searchTerm"
              className="whitespace-nowrap font-semibold"
            >
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sideBarData.searchTerm}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="font-semibold">
              Sort:
            </label>
            <Select onChange={handleChange} id="sort" value={sideBarData.sort}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <label htmlFor="category" className="font-semibold">
              Category:
            </label>
            <Select
              onChange={handleChange}
              id="category"
              value={sideBarData.category}
            >
              <option value="uncategorized">Uncategorized</option>
              <option value="reactjs">Reactjs</option>
              <option value="nextjs">Nextjs</option>
              <option value="javascript">Javascript</option>
            </Select>
          </div>

          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply filter
          </Button>
        </form>
      </div>

      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Blogs Results
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && blogs.length === 0 && (
            <p className="text-xl text-gray-500">No blogs found</p>
          )}

          {loading && <p className="text-xl text-gray-500">Loading...</p>}

          {!loading &&
            blogs &&
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}

          {showMore && (
            <button
              className="text-teal-500 text-lg hover:underline p-7 w-full"
              onClick={handleShowMore}
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
