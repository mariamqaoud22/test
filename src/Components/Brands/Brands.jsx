import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isError, isLoading } = useQuery({
    queryKey: "allBrands",
    queryFn: getAllBrands,
  });

  // console.log("data",data);
  if (isError) {
    return (
      <>
        <h3>lablablaaaaabla</h3>
      </>
    );
  }

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

  return (
    <>
      <div className="container py-5 mx-auto">
    
        <h1 className="text-emerald-500 text-center text-4xl font-bold ">
          {" "}
          All Brands{" "}
        </h1>
        <div className="grid grid-cols-4  gap-5">
          {data.data.data.map((brand) => (
            <div key={brand._id} className="brand rounded-xl bg-emerald-200">
              <img src={brand.image} alt={brand.name} className="w-full" />
              <h2 className="text-center">{brand.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
