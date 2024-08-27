import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";
import useAllCategories from "../customHooks/useAllCategories";

export default function Categories() {
  const { data, isError, isLoading } = useAllCategories();
  if (isLoading) {
    return (
      <div className="h-screen bg-emerald-200 flex justify-center items-center">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <h3>lablablaaaaabla</h3>
      </>
    );
  }

  return (
    <>
      <div className="w-[85%] mx-auto py-5 ">
        <div className="grid grid-cols-3  gap-5">
          {data.data.data.map((category) => (
            <div key={category._id}>
              <img
                className="w-full h-[330px]"
                src={category.image}
                alt={category.name}
              />
              <h6>{category.name}</h6>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
