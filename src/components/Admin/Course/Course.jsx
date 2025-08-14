/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import OutletWrapper from "../../../Pages/OutletWrapper";
import DigitalMarketingCard from "../UI/DigitalMarketingCard";
import CourseBanner from "./CourseBanner";
import Testimonials from "./Testimonial";
import StatsSection from "./Stats/StatsSection";
import { useSnapshot } from "valtio";
import { state } from "../../../data/state";

export const coursesData = [
  {
    id: 1,
    title: "SEO MASTERCLASS FOR BEGINNERS",
    subtitle: "20 Lessons | Learn SEO Basics | Lifetime Access",
    instructor: {
      name: "John Doe",
      image_url:
        "https://course.socialseller.in/storage/course/1727095759.png",
    },
    rating: {
      stars: 4.7,
      reviews: 220,
    },
    course_name: "Reselling Business Mastery Course",
    des: "Learn the secrets to building a profitable reselling business, mastering sourcing, pricing, and marketing strategies to maximize profits and scale your success effortlessly.",
    details: {
      duration: "5 H",
      students: "10540+ Students",
      certificate: true,
    },
    cta_button: {
      text: "Enroll Now",
      link: "#",
    },
    lessonData: [
      {
        courseId: 1,
        lesson: 1,
        title: "What is Reselling Business in India",
        link: "https://player.vimeo.com/video/492832134?h=215509dbd7&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 2,
        title: "History of Reselling Business",
        link: "https://player.vimeo.com/video/493344212?h=77d3945443&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 3,
        title: "How to Plan Reselling Business",
        link: "https://player.vimeo.com/video/498329631?h=3fb5b0bef4&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 4,
        title: "How to Execute Reselling Business",
        link: "https://player.vimeo.com/video/497652778?h=004ff4ee7f&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 5,
        title: "How to search wholesalers for Reselling Business",
        link: "https://player.vimeo.com/video/498349821?h=98120ced50&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 6,
        title: "List of trusted Wholesalers (Live Demo)",
        link: "https://player.vimeo.com/video/498364561?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 7,
        title: "How to create a brand page on Instagram",
        link: "https://player.vimeo.com/video/500080971?h=de15d16121&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 8,
        title: "Sell Products on Instagram (Multiple Account technique)",
        link: "https://player.vimeo.com/video/500095397?h=3b27436dec&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 9,
        title: "Instagram Marketing technique",
        link: "https://player.vimeo.com/video/500861463?h=bfd2a9da2a&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 10,
        title: "WhatsApp Sales Technique",
        link: "https://player.vimeo.com/video/500880849?h=80d9ef4c9d&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 11,
        title: "Sales Management in WhatsApp ",
        link: "https://player.vimeo.com/video/501130108?h=742cd96d1d&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 12,
        title: " 4 Stages of Reselling Business ",
        link: "https://player.vimeo.com/video/501135629?h=926ae813f2&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 1,
        lesson: 13,
        title: "Grow & automate Reselling business",
        link: "https://player.vimeo.com/video/501187870?h=07799faf79&amp;title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
    ],
  },
  {
    id: 2,
    title: "CONTENT WRITING MASTERCLASS",
    subtitle: "10 Lessons | Tools & Templates Provided",
    instructor: {
      name: "Emily White",
      image_url:
        "https://course.socialseller.in/storage/course/1727095776.jpg",
    },
    rating: {
      stars: 4.6,
      reviews: 150,
    },
    des: "Master the art of compelling content creation, storytelling, and SEO to captivate your audience.",
    course_name: "Sell Online - Full Course",
    details: {
      duration: "6.1 H",
      students: "1563+ Students",
      certificate: true,
    },
    cta_button: {
      text: "Join Now",
      link: "#",
    },
    lessonData: [
      {
        courseId: 2,
        lesson: 1,
        title: "How online Business works in India ",
        link: "https://player.vimeo.com/video/668560005?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 2,
        title: "Online Business Process",
        link: "https://player.vimeo.com/video/668593024?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 3,
        title: "3 stages of online business",
        link: "https://player.vimeo.com/video/668595632?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 4,
        title: "6 online selling platforms",
        link: "https://player.vimeo.com/video/668993211?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 5,
        title: "Time & money to start online business",
        link: "https://player.vimeo.com/video/678149224?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 6,
        title: "3 business (Types of online business)",
        link: "https://player.vimeo.com/video/678155235?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 7,
        title: "Online work process B.P.C.M.S.R",
        link: "https://player.vimeo.com/video/677575953?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 8,
        title: "Branding",
        link: "https://player.vimeo.com/video/672335382?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 9,
        title: "Products",
        link: "https://player.vimeo.com/video/672255969?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 10,
        title: "Content",
        link: "https://player.vimeo.com/video/677577694?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 11,
        title: "Marketing for online business",
        link: "https://player.vimeo.com/video/678212128?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 12,
        title: "Network Marketing",
        link: "https://player.vimeo.com/video/677608953?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 13,
        title: "Paid ads to grow online business",
        link: "https://player.vimeo.com/video/679013905?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 14,
        title: "Sales for Online Business",
        link: "https://player.vimeo.com/video/678216484?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 2,
        lesson: 15,
        title: "Retargeting",
        link: "https://player.vimeo.com/video/674086574?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
    ],
  },
  {
    id: 3,
    title: "SOCIAL MEDIA MARKETING",
    subtitle: "15 Lessons | Advanced Strategies | Tools Included",
    instructor: {
      name: "Sarah Johnson",
      image_url:
        "https://course.socialseller.in/storage/course/1727095896.png",
    },
    rating: {
      stars: 4.8,
      reviews: 412,
    },
    course_name: "Digital Marketing for Online Selling",
    des: "Unlock the power of social media with proven strategies to grow your brand, engage audiences, and drive sales through impactful marketing techniques.",
    details: {
      duration: "5 H",
      students: "4509+ Students",
      certificate: true,
    },
    cta_button: {
      text: "Start Learning",
      link: "#",
    },
    lessonData: [
      {
        courseId: 3,
        lesson: 1,
        title: "Introduction video",
        link: "https://player.vimeo.com/video/741373696?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 2,
        title: "How WhatsApp marketing works",
        link: "https://player.vimeo.com/video/737820927?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 3,
        title: "3 different types of WhatsApp ",
        link: "https://player.vimeo.com/video/737821225?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 4,
        title: "WhatsApp business features & tricks ",
        link: "https://player.vimeo.com/video/737821514?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 5,
        title: "How to collect database for marketing ",
        link: "https://player.vimeo.com/video/737821762?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 6,
        title: " How to send bulk WhatsApp Messages",
        link: "https://player.vimeo.com/video/737822037?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 7,
        title: " How to create content for marketing",
        link: "https://player.vimeo.com/video/737822158?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 8,
        title: "How to generate leads for WhatsApp marketing",
        link: "https://player.vimeo.com/video/737822306?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 9,
        title: " How to get WhatsApp business API",
        link: "https://player.vimeo.com/video/737822431?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 10,
        title: "Basic features of WhatsApp API",
        link: "https://player.vimeo.com/video/737822641?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 11,
        title: "WhatsApp sales process",
        link: "https://player.vimeo.com/video/737824751?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 12,
        title: "How to create WhatsApp store",
        link: "https://player.vimeo.com/video/741877434?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 3,
        lesson: 13,
        title: "How to manage customers on WhatsApp ",
        link: "https://player.vimeo.com/video/741373569?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
    ],
  },
  {
    id: 4,
    title: "DIGITAL MARKETING FOR ECOMMERCE",
    subtitle: "13 Lessons | Lifetime Access | In-depth Knowledge",
    instructor: {
      name: "Lakshit Sethiya",
      image_url:
        "https://course.socialseller.in/storage/course/1727095641.png",
    },
    rating: {
      stars: 4.9,
      reviews: 396,
    },
    course_name: "Canva Designing Course",
    des: "Master digital marketing strategies tailored for eCommerce, including SEO, paid ads, email marketing, and social media to boost sales and grow your online business.",
    details: {
      duration: "2 H",
      students: "3500+ Students",
      certificate: true,
    },
    cta_button: {
      text: "Watch Now",
      link: "#",
    },
    lessonData: [
      {
        courseId: 4,
        lesson: 1,
        title: "What is digital marketing?",
        link: "https://player.vimeo.com/video/544536626?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 4,
        lesson: 2,
        title: "Digital marketing process",
        link: "https://player.vimeo.com/video/549322787?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 4,
        lesson: 3,
        title: "Canva Designing",
        link: "https://player.vimeo.com/video/534421634?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 4,
        lesson: 4,
        title: "Create advertisement creative for digital marketing",
        link: "https://player.vimeo.com/video/551516191?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 4,
        lesson: 5,
        title: "Introduction video",
        link: "https://player.vimeo.com/video/551799749?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 4,
        lesson: 6,
        title: "Introduction video",
        link: "https://player.vimeo.com/video/565506513?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
      {
        courseId: 4,
        lesson: 7,
        title: "Introduction video",
        link: "https://player.vimeo.com/video/582437061?title=0&amp;byline=0&amp;portrait=0&amp;badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479",
      },
    ],
  },
];
const Course = () => {
  const snap = useSnapshot(state);
 

  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      <CourseBanner />
      <OutletWrapper className={"px-2 lg:px-20 xl:px-24 w-full"}>
        <StatsSection />
        <div className="w-full flex items-center justify-between my-6 ">
          <span className="text-3xl font-semibold">Our Popular Courses</span>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 w-full ">
          {coursesData?.map((c, i) => {
            return (
              <div
                className="w-full h-full cursor-pointer truncate"
                key={i}
                onClick={() => navigate(`/course-detail/${c?.id}`)}
              >
                <DigitalMarketingCard data={c} title={" Watch Now"} />
              </div>
            );
          })}
        </div>
        <Testimonials />
      </OutletWrapper>
    </div>
  );
};

export default Course;
