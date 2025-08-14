import selling1 from "../../../assets/home-page/selling1.png";
import Stats from "../UI/Stats";
import Container from "../UI/Wrappers/Container.Wrapper";
const AboutUsStats = () => {
  return (
    <div className="bg-themecolor w-full ">
      {/* lg:px-44 2xl:px-56 lg:py-20  */}
      <Container>
        <div className="flex flex-col items-center justify-center px-3 py-12  lg:flex-row lg:items-start  lg:justify-start lg:gap-8  xl:gap-12">
          <div className="w-full lg:w-1/2 ">
            <img
              src={selling1}
              className="w-full lg:w-[40vw] object-cover"
              width={"auto"}
              height={"auto"}
              alt="image"
            />
          </div>
          <div className="w-full lg:w-1/2 flex items-start justify-start mt-4 lg:mt-8 ">
            <Stats />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AboutUsStats;
