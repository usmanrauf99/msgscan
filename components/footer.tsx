import Link from "next/link";
import { Container } from "./ui/container";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-card border-t md:mt-28 mt-24">
      <Container>
        <div className="flex flex-col">
          <div className="flex md:flex-row flex-col justify-between py-10 md:items-start items-center gap-4">
            <div className="flex flex-col gap-7 items-center md:items-start">
              <Logo />

              <div className="flex flex-row gap-2">
                {/* <Button variant="social" size="social">
                  <Image
                    src="/social/instagram.svg"
                    alt="Twitter"
                    width={18}
                    height={18}
                    className="dark:invert-0 invert"
                  />
                </Button>
                <Button variant="social" size="social">
                  <Image
                    src="/social/facebook.svg"
                    alt="Facebook"
                    width={18}
                    height={18}
                    className="dark:invert-0 invert"
                  />
                </Button> */}
                <Link href="https://x.com/telegraphbridge" target="_blank">
                  <Button variant="social" size="social">
                    <Image
                      src="/social/x.svg"
                      alt="X/Twitter"
                      width={18}
                      height={18}
                      className="dark:invert-0 invert"
                    />
                  </Button>
                </Link>
                {/* <Button variant="social" size="social">
                  <Image
                    src="/social/github.svg"
                    alt="Github"
                    width={18}
                    height={18}
                    className="dark:invert-0 invert"
                  />
                </Button> */}
              </div>
            </div>
            <div className="flex flex-row gap-16 text-muted-foreground">
              <div className="flex flex-col gap-3.5">
                <Link href="/" className="footer-link">
                  Home
                </Link>
                <Link href="/nodes" className="footer-link">
                  Nodes
                </Link>
                <Link href="/ecosystem" className="footer-link">
                  Ecosystem
                </Link>
                <Link href="/transactions" className="footer-link">
                  Transactions
                </Link>
              </div>
              <div className="flex flex-col gap-3.5">
                <Link href="/analytics" className="footer-link">
                  Analytics
                </Link>

                <Link href="#" className="footer-link">
                  Documentation
                </Link>
                <Link href="/contact" className="footer-link">
                  Contact
                </Link>
              </div>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-2 justify-between border-t text-sm py-10 md:items-start items-center">
            <span>© 2025 Msgscan. All rights reserved.</span>
            <div className="flex flex-row gap-6">
              <Link href="/terms-of-service" className="footer-link-2">
                Terms of Service
              </Link>
              <Link href="/privacy-policy" className="footer-link-2">
                Privacy Policy
              </Link>
              <Link href="/cookie-policy" className="footer-link-2">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
