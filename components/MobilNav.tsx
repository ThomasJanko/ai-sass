"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";

interface MobilNavProps {
    apiLimitCount: number;
    isPro: boolean;
}

const MobilNav = ({ apiLimitCount = 0, isPro = false }: MobilNavProps) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if(!isMounted) return null;
    // if(isPro) return null;

    return (
    <Sheet>
        <SheetTrigger>
            <Button variant="ghost" size="icon" className='md:hidden'>
                <Menu size={24} />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 text-white">
            <SideBar apiLimitCount={apiLimitCount} isPro={isPro} />
        </SheetContent>
    </Sheet>
    )
};

export default MobilNav;