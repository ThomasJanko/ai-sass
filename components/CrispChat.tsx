"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
    useEffect(() => {
        Crisp.configure("f589f2cd-26be-495f-a00b-67d8281788f9")
    }, []);

    return null;
};

