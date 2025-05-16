"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Container } from "@/components/ui/container";
import { Logo } from "./logo";
import { ModeToggle } from "./mode-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

type MenuItem = {
  label: string;
  href: string;
  submenu?: Array<{ label: string; description?: string }>;
};

const menuItems: MenuItem[] = [
  { label: "Home", href: "/" },
  { label: "Nodes", href: "/nodes" },
  {
    label: "Ecosystem",
    href: "/ecosystem",
  },
  { label: "Transactions", href: "/transactions" },
  { label: "Analytics", href: "/analytics" },
];

export function NavigationBar() {
  const [open, setOpen] = React.useState(false);

  const DesktopMenu = () => (
    <NavigationMenu className="hidden lg:flex">
      <NavigationMenuList>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            {item.submenu ? (
              <>
                <NavigationMenuTrigger>{item.label}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2">
                    {item.submenu.map((subItem) => (
                      <ListItem
                        key={subItem.label}
                        title={subItem.label}
                        href={`${item.href}/${subItem.label
                          .toLowerCase()
                          .replace(" ", "-")}`}
                      >
                        {subItem.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={item.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {item.label}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between py-6 bg-card border-b md:mb-24 mb-20">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex flex-1 justify-start">
            <Logo />
          </div>
          <div className="flex flex-1 justify-center">
            <DesktopMenu />
          </div>
          <div className="flex-1 justify-end hidden lg:flex space-x-3">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center justify-between w-[80px] rounded-md border border-input bg-background px-3 text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                >
                  Build
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="https://telegraphbridge.com/" target="_blank">
                    Telegraph Home
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="#" target="_blank">
                    Build With Telegraph
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href="https://github.com/telegraphbridge/telegraph-subnet"
                    target="_blank"
                  >
                    Build with Bittensor
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <ModeToggle />
          </div>
          <div className="flex flex-1 justify-end lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="flex lg:hidden"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="mt-20 flex flex-col items-center justify-center gap-4">
                  <Accordion type="single" collapsible className="w-full">
                    {menuItems.map((item) => (
                      <AccordionItem value={item.label} key={item.label}>
                        {item.submenu ? (
                          <>
                            <AccordionTrigger className="h-9 hover:bg-accent rounded-md">
                              <span className="pl-1 font-medium">
                                {item.label}
                              </span>
                            </AccordionTrigger>
                            <AccordionContent>
                              {item.submenu.map((subItem) => (
                                <SheetClose asChild key={subItem.label}>
                                  <Link
                                    href={`${item.href}/${subItem.label
                                      .toLowerCase()
                                      .replace(" ", "-")}`}
                                    className="block w-full p-2 text-sm hover:bg-accent rounded-md"
                                  >
                                    {subItem.label}
                                  </Link>
                                </SheetClose>
                              ))}
                            </AccordionContent>
                          </>
                        ) : (
                          <SheetClose asChild>
                            <Link
                              href={item.href}
                              className="flex h-9 w-full items-center px-4 py-2 font-medium hover:bg-accent rounded-md"
                            >
                              {item.label}
                            </Link>
                          </SheetClose>
                        )}
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
                <div className="mt-10 flex flex-row flex-wrap w-full items-center gap-3 px-6 py-4 lg:hidden rounded-md">
                  <ModeToggle />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="flex items-center justify-between w-[80px] rounded-md border border-input bg-background px-3 text-muted-foreground shadow-sm hover:bg-accent hover:text-accent-foreground"
                      >
                        Build
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem asChild>
                        <Link
                          href="https://telegraphbridge.com/"
                          target="_blank"
                        >
                          Telegraph Home
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="#" target="_blank">
                          Build With Telegraph
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link
                          href="https://github.com/telegraphbridge/telegraph-subnet"
                          target="_blank"
                        >
                          Build with Bittensor
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
