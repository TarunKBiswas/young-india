/* eslint-disable react/no-unescaped-entities */
import Container from "./Wrappers/Container.Wrapper";

const XMission = () => {
  return (
    <Container className={"px-2 min-h-[100vh]"}>
      <div className=" mx-auto w-full lg:min-w-[70vw] px-8 lg:px-20 py-8">
        <div className="w-full flex flex-col gap-4 ">
          <h1 className="text-3xl font-bold leading-7 tracking-wider">
            Our Mission & Vision
          </h1>
          <span className="text-lg">
            <span
              //   dangerouslySetInnerHTML={{ __html: content }}
              className="text-base font-medium tracking-wide"
            />
            Our mission is to revolutionize the gifting experience by creating a
            platform where every gift tells a story, conveys love, and
            strengthens relationships. We strive to make gift-giving effortless,
            enjoyable, and meaningful by offering a curated selection of
            premium, personalized, and unique products for every occasion,
            recipient, and celebration. At the heart of our mission are these
            core values: <br /> <br /> 1. Celebrating Relationships: We believe
            gifting is more than exchanging objects—it’s about fostering
            connections and making moments memorable. Our platform is designed
            to help people express their emotions in the most thoughtful and
            impactful ways. <br /> <br /> 2. Personalization and Creativity:
            Every gift should reflect the sender’s thoughtfulness. We provide
            endless customization options to ensure each product feels truly
            one-of-a-kind.
            <br /> <br /> 3. Accessibility and Convenience: From browsing to
            checkout, we aim to simplify the gifting process with an intuitive
            platform, seamless navigation, and reliable delivery services.
            Whether it's a last-minute surprise or a planned gesture, we’ve got
            it covered.
            <br /> <br /> 4. Sustainability and Responsibility: We are committed
            to offering eco-friendly products, packaging, and ethical sourcing
            practices, ensuring that gifting is kind to our planet.
            <br /> <br /> 5. Global Reach with a Local Touch: While we connect
            customers worldwide, we celebrate local artisans and vendors,
            offering a blend of global variety and local craftsmanship. <br />{" "}
            <br />
            6. Customer Delight: Our priority is to provide a stellar shopping
            experience. We listen, respond, and go above and beyond to exceed
            expectations, ensuring every customer feels valued and heard. Our
            Vision: To be the world’s most trusted online gifting destination,
            inspiring joy, connection, and celebration in every corner of the
            globe. We aspire to not just deliver gifts but to deliver happiness,
            making every moment unforgettable.
          </span>
        </div>
      </div>
    </Container>
  );
};

export default XMission;
