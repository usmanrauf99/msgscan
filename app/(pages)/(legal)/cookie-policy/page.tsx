import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        title="Cookie Policy"
        description="At Telegraph, we understand the importance of your privacy and arecommitted to safeguarding your personal information."
      />
      <Container>
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-4xl text-muted-foreground mx-auto space-y-4 text-sm md:mb-24 mb-20">
          <p className="text-card-foreground">
            This policy aims to explain what cookies are, how we use them, the
            types we employ, and your choices regarding their use.
          </p>
          <div className="space-y-2">
            <h4>What Are Cookies?</h4>
            <p>
              Cookies are text files placed on your device by your web browser
              when you visit a website. They can store a variety of information,
              such as your preferences, login information, and other data that
              helps improve your experience. Cookies are widely used to make
              websites work efficiently and provide information to the site
              owners.
            </p>
          </div>
          <div className="space-y-2">
            <h4>Types of Cookies We Use</h4>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-card-foreground/90">
              1. Essential Cookies:
            </p>
            <p>
              These cookies are vital for the functioning of our website. They
              enable you to navigate our platform and utilize its features, such
              as accessing secure areas of the site. Without these cookies, some
              functionalities may not be available.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-card-foreground/90">
              2. Performance Cookies:
            </p>
            <p>
              These cookies gather information on how visitors interact with our
              website. They collect data on which pages are visited most often,
              and how long users stay on the site, among other metrics. This
              information helps us enhance our services and improve the overall
              user experience.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-card-foreground/90">
              3. Functionality Cookies:
            </p>
            <p>
              These cookies allow our website to remember your preferences and
              provide enhanced, more personalized features. For example, they
              may save your preferred language, login details, or customized
              settings, ensuring you have a consistent and tailored experience
              each time you visit.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-medium text-card-foreground/90">
              4. Targeting Cookies:
            </p>
            <p>
              These cookies are used to deliver advertisements relevant to you
              and your interests. They track your browsing habits and help us
              understand your preferences, allowing us to serve you targeted
              advertising. These cookies may also limit the number of times you
              see an ad and help measure the effectiveness of advertising
              campaigns.
            </p>
          </div>
          <div className="space-y-2">
            <h4>Updates to This Cookie Policy</h4>
            <p>
              We may update this cookie policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We encourage you to review this policy
              periodically for the latest information on our cookie practices.
            </p>
          </div>
          <div className="space-y-2">
            <p>
              If you have any questions or concerns about our cookie policy or
              our use of cookies, please feel free to contact us.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
