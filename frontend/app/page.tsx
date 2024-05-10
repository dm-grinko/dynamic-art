import Header from "@/components/header";
import Section from "@/components/section"

interface ISection {
  type: string;
  image: string;
  title: string;
  description: string;
}

export default function Home() {
  const sections: ISection[] = [
    // {
    //   type: "left",
    //   image: "img/img1.png",
    //   title: "Face Recognition",
    //   description: "The app uses face recognition technology to instantly identify each family member when they look at the display. This allows the app to show personalized to-do lists tailored to each individual's needs, helping them stay organized and on track.",
    // },
    // {
    //   type: "right",
    //   image: "img/img4.png",
    //   title: "Instant Updates",
    //   description: "With real-time notifications and updates, you can ensure you never miss a task or important event. Keep up with your schedule effortlessly and maintain a smooth flow of your daily routines.",
    // },
    // {
    //   type: "left",
    //   image: "img/img2.png",
    //   title: "Task Management",
    //   description: "The app provides a simple and efficient way to manage your own tasks. Create, track, and prioritize tasks with ease to stay focused and maximize productivity.",
    // },
    // {
    //   type: "right",
    //   image: "img/img5.png",
    //   title: "Family Insights",
    //   description: "Gain valuable insights into your family’s productivity with aggregated statistics and patterns. Discover how everyone is managing their tasks and identify trends to better support one another.",
    // },
    // {
    //   type: "left",
    //   image: "img/img6.png",
    //   title: "Safe and Secure",
    //   description: "Your family's privacy is a top priority. The app uses advanced security measures to keep your information safe and confidential, giving you peace of mind while managing your day.",
    // },
  ]

  return (
    <div>
      <Header 
        title="Dynamic Art"
        description="Lorem Ipsum...">
      </Header>
      <div className="home-page-content">
        {sections.map((section, i) => {
          return <Section
            key={i}
            type={section.type} 
            image={section.image} 
            title={section.title} 
            description={section.description} >
          </Section>
        })}
      </div>
    </div>
  );
}
