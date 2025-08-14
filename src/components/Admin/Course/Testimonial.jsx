/* eslint-disable react/no-unescaped-entities */
const Testimonials = () => {
  const testimonials = [
    {
      name: "Seemanshu Gupta",
      title: "CEO, Girling",
      videoUrl: "https://www.youtube.com/embed/7cq6aO9CIXI?si=I8ZU5mGoLvo_8zVD",
    },
    {
      name: "Khushboo Jain",
      title: "CEO, Khushboo Couture",
      videoUrl: "https://www.youtube.com/embed/Cse7g--PoXU?si=5hzlClekd7hdun-4",
    },
  ];

  return (
    <section className="py-12 ">
      <div className="container mx-auto ">
        <h3 className="text-3xl font-semibold">Testimonials</h3>
        <h2 className="text-xl font-medium mt-2">
          Watch our student's genuine feedback
        </h2>
        <p className="text-gray-600 mt-2">
          Listen directly from our clients what they say about us
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className=" rounded-lg overflow-hidden bg-white p-2 "
            >
              <div className=" flex flex-col  items-center gap-2">
                <div className="w-full aspect-video mb-2">
                  <iframe
                    src={testimonial?.videoUrl}
                    // title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-md"
                  ></iframe>
                </div>

                <div className="flex flex-col items-start w-full justify-start ">
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
