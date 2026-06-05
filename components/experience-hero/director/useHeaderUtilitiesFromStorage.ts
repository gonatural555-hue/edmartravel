"use client";



import { useEffect, useState } from "react";

import { HERO_HEADER_UTILITIES } from "../heroLayoutProduction";

import type { HeaderUtilitiesDebugValues } from "./experienceHeroDebugConfig";

import { readHeaderUtilitiesForHome } from "./headerUtilitiesStorage";



/**

 * /es → calibración aplicada (localStorage) o producción (heroLayoutProduction).

 * ?director=true → preview en vivo desde localStorage del panel director.

 */

export function useHeaderUtilitiesFromStorage(

  isDirector: boolean

): HeaderUtilitiesDebugValues {

  const [utilities, setUtilities] =

    useState<HeaderUtilitiesDebugValues>(HERO_HEADER_UTILITIES);



  useEffect(() => {

    const readProduction = () =>

      setUtilities(readHeaderUtilitiesForHome(HERO_HEADER_UTILITIES));



    if (!isDirector) {

      readProduction();

      const onApplied = (e: Event) => {

        const detail = (e as CustomEvent<HeaderUtilitiesDebugValues>).detail;

        if (detail) setUtilities(detail);

      };

      window.addEventListener(

        "experience-header-utilities-applied",

        onApplied

      );

      window.addEventListener("experience-hero-debug-updated", readProduction);

      return () => {

        window.removeEventListener(

          "experience-header-utilities-applied",

          onApplied

        );

        window.removeEventListener(

          "experience-hero-debug-updated",

          readProduction

        );

      };

    }



    const readStorage = () =>

      setUtilities(readHeaderUtilitiesForHome(HERO_HEADER_UTILITIES));



    readStorage();

    window.addEventListener("experience-hero-debug-updated", readStorage);

    return () =>

      window.removeEventListener("experience-hero-debug-updated", readStorage);

  }, [isDirector]);



  return utilities;

}

