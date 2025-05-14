import { PageHero } from "@/components/page-hero";
import { Container } from "@/components/ui/container";

export default function TermsOfServicePage() {
  return (
    <>
      <PageHero
        title="Terms of Service"
        description="By accessing or using Telegraph's services, you agree to follow the terms listed below. These terms govern your use of the platform, so please review them carefully before proceeding."
      />
      <Container>
        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-4xl text-muted-foreground mx-auto space-y-4 text-sm md:mb-24 mb-20">
          <p className="text-card-foreground">
            Welcome to Telegraph. By accessing or using our services, you agree
            to comply with the following terms:
          </p>
          <div className="space-y-2">
            <h4>1. User Responsibilities</h4>
            <p>
              When you create an account with Telegraph, you are responsible for
              maintaining the security of your account credentials and ensuring
              that your account is used appropriately. You are liable for all
              actions taken through your account, whether by you or any other
              party using your credentials. In the event of a security breach or
              unauthorized use of your account, you must notify us immediately.
              We reserve the right to suspend or terminate your account if we
              suspect any violation of these terms or misuse of the platform.
            </p>
          </div>
          <div className="space-y-2">
            <h4>2. Prohibited Activities</h4>
            <p>
              As a user of Telegraph, you agree not to use our platform for any
              unlawful activities, including but not limited to engaging in
              fraud, violating intellectual property rights, spreading harmful
              or malicious content, or harassing other users. We strictly
              prohibit the use of our services for distributing viruses,
              malware, or harmful software. Engaging in prohibited activities
              will result in the immediate suspension or termination of your
              account and may lead to legal action.
            </p>
          </div>
          <div className="space-y-2">
            <h4>3. Service Availability</h4>
            <p>
              Telegraph strives to provide uninterrupted access to our services.
              However, we do not guarantee that the platform will always be
              available or that access will be free from interruptions, errors,
              or delays. Scheduled maintenance or updates may impact service
              availability, and we will attempt to notify users in advance when
              possible. However, we are not liable for any damages or losses
              caused by temporary unavailability of our services due to
              technical difficulties or other unforeseen circumstances.
            </p>
          </div>
          <div className="space-y-2">
            <h4>4. Intellectual Property</h4>
            <p>
              All content on the Telegraph platform, including but not limited
              to text, graphics, logos, designs, code, and software, is the
              intellectual property of Telegraph and its licensors. You may not
              reproduce, distribute, modify, or create derivative works from any
              content provided by Telegraph without prior written consent. Any
              unauthorized use of intellectual property is strictly prohibited
              and may result in legal consequences.
            </p>
          </div>
          <div className="space-y-2">
            <h4>5. Liability</h4>
            <p>
              Telegraph is not liable for any direct, indirect, incidental, or
              consequential damages arising from your use of the platform,
              including but not limited to loss of data, business, profits, or
              other damages. We provide the services &ldquo;as-is&rdquo; and
              make no warranties regarding the reliability, security, or
              accuracy of the platform or any content provided. By using the
              platform, you acknowledge that you do so at your own risk.
            </p>
          </div>
          <div className="space-y-2">
            <h4>6. Changes to Terms</h4>
            <p>
              Telegraph reserves the right to modify or update these terms at
              any time without prior notice. Any changes will be effective upon
              posting to the platform. It is your responsibility to review these
              terms regularly. Continued use of the services after changes are
              made constitutes your acceptance of the revised terms. If you do
              not agree to any modifications, you must stop using the services
              immediately.
            </p>
          </div>
        </div>
      </Container>
    </>
  );
}
