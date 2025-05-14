import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        title="Privacy Policy"
        description="At Telegraph, we respect your privacy and are committed to protecting your personal information. This policy outlines how we collect, use, and safeguard data from users."
      />
      <Container>
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-4xl text-muted-foreground mx-auto space-y-4 text-sm md:mb-24 mb-20">
          <p className="text-card-foreground">
            By choosing to use the services offered by Telegraph, you
            acknowledge and agree to the terms set forth in this privacy policy.
            If you have any questions, concerns, or require further
            clarification, please feel free to contact us at your convenience.
          </p>
          <div className="space-y-2">
            <h4>1. Information We Collect</h4>
            <p>
              We gather personal information at various stages, including when
              you register for an account, utilize our services, or interact
              with our platform in any capacity. This information may encompass
              your name, email address, and other pertinent details that enable
              us to provide a tailored experience.
            </p>
          </div>
          <div className="space-y-2">
            <h4>2. Use of Information</h4>
            <p>
              Your information is primarily used to deliver, maintain, and
              enhance the quality of our services. Additionally, we utilize your
              data for essential purposes such as ensuring security,
              personalizing your user experience, and facilitating effective
              communication regarding updates and promotional content.
            </p>
          </div>
          <div className="space-y-2">
            <h4>3. Sharing of Data</h4>
            <p>
              We want to assure you that we do not engage in the practice of
              selling your personal information to third parties. However, we
              may find it necessary to share certain data with trusted service
              providers who assist us in enhancing your overall experience on
              our platform. These third parties are contractually obligated to
              protect your data and handle it in accordance with this policy.
            </p>
          </div>
          <div className="space-y-2">
            <h4>4. Security</h4>
            <p>
              We take the security of your information seriously and have
              implemented appropriate measures designed to secure your data and
              prevent any unauthorized access or breaches.
            </p>
          </div>
          <div className="space-y-2">
            <h4>5. Your Rights</h4>
            <p>
              As a user, you have the right to access your personal information,
              request updates, or even ask for the deletion of your data if that
              is your wish. Should you have any inquiries or concerns related to
              your privacy, please do not hesitate to reach out to us.
            </p>
          </div>
          <div className="space-y-2">
            <p>
              By choosing to use the services offered by Telegraph, you
              acknowledge and agree to the terms set forth in this privacy
              policy. If you have any questions, concerns, or require further
              clarification, please feel free to contact us at your convenience.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
