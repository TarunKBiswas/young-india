import star from "../../../../assets/website/star.png";
import star1 from "../../../../assets/website/star1.png";
import star2 from "../../../../assets/website/star2.png";
import star3 from "../../../../assets/website/star3.png";
const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: star1,
      value: "5 Crore +",
      description: "Views on free tutorials & courses on youtube.",
      bgColor: "bg-red-100",
      iconColor: "bg-red-500",
    },
    {
      id: 2,
      icon: star2,
      value: "25000+",
      description: "Students bought premium courses world wide.",
      bgColor: "bg-blue-100",
      iconColor: "bg-blue-500",
    },
    {
      id: 3,
      icon: star3,
      value: "12 +",
      description:
        "Awards from top-notch businesses for strategies and courses.",
      bgColor: "bg-green-100",
      iconColor: "bg-green-500",
    },
    {
      id: 4,
      icon: star,
      value: "4.8",
      description:
        "Average ratings on premium courses by students and businesses.",
      bgColor: "bg-yellow-100",
      iconColor: "bg-yellow-500",
    },
  ];

  return (
    <section className="py-16 text-center w-full flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8 text-center w-full lg:max-w-[600px]">
        Learning is the First Process for Starting Any Online Business
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4">
        {stats?.map((stat) => (
          <div
            key={stat?.id}
            className={`flex items-center py-5 md:px-1.5 md:py-2.5 rounded-xl shadow-md bg-white w-full gap-4 lg:gap-2`}
          >
            <div className={`w-16 h-16 flex items-center justify-center`}>
              <img
                src={stat?.icon}
                className="object-contain"
              />
            </div>
            <div className=" w-full text-start">
              <h3 className="text-xl font-semibold">{stat?.value}</h3>
              <p className="text-gray-600 text-sm">{stat?.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsSection;
