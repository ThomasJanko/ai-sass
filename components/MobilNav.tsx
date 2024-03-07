"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

interface MobilNavProps {
    apiLimitCount: number;
}

const MobilNav = ({ apiLimitCount = 0 }: MobilNavProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;

    return (
    <Sheet>
        <SheetTrigger>
            <Button variant="ghost" size="icon" className='md:hidden'>
                <Menu size={24} />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 text-white">
            <SideBar apiLimitCount={apiLimitCount} />
        </SheetContent>
    </Sheet>
    )
};

export default MobilNav;