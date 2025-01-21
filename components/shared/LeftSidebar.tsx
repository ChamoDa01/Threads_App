"use client";

import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

function LeftSidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const { userId } = useAuth();

    return (
        <section className="custom-scrollbar leftsidebar">
            <div className="flex w-full flex-1 flex-col gap-6 px-6">
                {sidebarLinks.map((link) => {
                    const isActive = (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;
                    if(link.route === '/profile') link.route = `${link.route}/${userId}`;
                    return (
                        <Link key={link.label} href={link.route} className={`leftsidebar_link ${isActive && 'bg-primary-500'}`}>
                            <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                            <p className="max-lg:hidden text-light-1">{link.label}</p>
                        </Link>
                    );
                })}
            </div>

            <div className="mt-10 px-6">
                <SignedIn>
                    <SignOutButton redirectUrl='/sign-in'>
                        <div className="flex gap-4 p-4 cursor-pointer">
                            <Image src="/assets/logout.svg" alt="Logout" width={24} height={24} />
                            <p className="text-light-2 max-lg:hidden">Logout</p>
                        </div>
                    </SignOutButton>
                </SignedIn>
            </div>
        </section>
    );
}

export default LeftSidebar;