import { useGetAllBlogsQuery } from "../services/blogApi";
import Loading from "../utils/Loading";

const Home = () => {
  const { data, isFetching, isError } = useGetAllBlogsQuery();

  return (
    <main className="container mx-auto">
      <div className="grid place-items-center">
        {isFetching && <Loading />}
        {!isFetching && isError && (
          <p className="font-bold text-xl text-error">ERROR</p>
        )}
      </div>

      {!isFetching &&
        data?.map((item) => <div key={item._id}>{item.title}</div>)}
    </main>
  );
};

export default Home;
