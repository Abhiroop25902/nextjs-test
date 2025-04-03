"use client";

import {Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems,} from "@headlessui/react";
import {Bars3Icon, UserCircleIcon, XMarkIcon,} from "@heroicons/react/24/outline";
import classNames from "classnames";
import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";

type navigationStatus = {
    name: string;
    href: string;
    current: boolean;
};

type navigationBarState = { [id: string]: navigationStatus };

const navigationInitialState: navigationBarState = {
    home: {name: "Home", href: "/", current: false},
    count: {name: "Count", href: "/count", current: false},
};

export default function NavigationBar() {
    const [navigation, setNavigation] = useState(navigationInitialState);
    const currPathName = usePathname().slice(1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function updateCurrentPage(pageKey: string) {
        if (navigation[pageKey].current) {
            return;
        }

        const newNavigationState: navigationBarState = {};


        Object.keys(navigation).forEach((key) => {
            newNavigationState[key] = {
                ...navigation[key],
                current: false,
            };
        });

        newNavigationState[pageKey].current = true;

        setNavigation(newNavigationState);
    }

    useEffect(() => updateCurrentPage(currPathName || "home"), [currPathName, updateCurrentPage]);


    // Disclosure Class provides an "open" and "close state" and is used here for mobile phone navigation dropdown
    // Disclosure Panel
    // Disclosure Button alters the state between open and close
    return (
        <Disclosure as={"nav"} className={"bg-gray-800 flex-none sticky top-0"}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        {/* Mobile menu button*/}
                        <DisclosureButton
                            className={`group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 
                hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white`}
                        >
                            <span className="absolute -inset-0.5"/>
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon
                                aria-hidden="true"
                                className="block h-6 w-6 group-data-[open]:hidden"
                            />
                            <XMarkIcon
                                aria-hidden="true"
                                className="hidden h-6 w-6 group-data-[open]:block"
                            />
                        </DisclosureButton>
                    </div>
                    {/* The Navigation Buttons in Desktop Mode */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {Object.keys(navigation).map((key) => (
                                    <Link
                                        key={navigation[key].name}
                                        href={navigation[key].href}
                                        aria-current={navigation[key].current ? "page" : undefined}
                                        className={classNames(
                                            navigation[key].current
                                                ? "bg-gray-900 text-white"
                                                : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                            "rounded-md px-3 py-2 text-sm font-medium"
                                        )}
                                        onClick={() => updateCurrentPage(key)}
                                    >
                                        {navigation[key].name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <MenuButton
                                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span className="absolute -inset-1.5"/>
                                <span className="sr-only">Open user menu</span>
                                <UserCircleIcon className="h-8 w-8 rounded-full"/>
                            </MenuButton>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <MenuItem>
                                    <a
                                        href="/signup"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                    >
                                        Sign Up
                                    </a>
                                </MenuItem>
                                <MenuItem>
                                    <a
                                        href="/login"
                                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                                    >
                                        Login
                                    </a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
            <DisclosurePanel
                transition
                className="sm:hidden transition-all duration-200 ease-out overflow-hidden
        data-[closed]:max-h-0
        data-[open]:max-h-screen"
            >
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {Object.keys(navigation).map((key) => (
                        <Link
                            key={navigation[key].name}
                            href={navigation[key].href}
                            onClick={() => {
                                updateCurrentPage(key);
                            }}
                            aria-current={navigation[key].current ? "page" : undefined}
                            className={classNames(
                                navigation[key].current
                                    ? "bg-gray-900 text-white"
                                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "block rounded-md px-3 py-2 text-base font-medium"
                            )}
                        >
                            <DisclosureButton as="p">{navigation[key].name}</DisclosureButton>
                        </Link>
                    ))}
                </div>
            </DisclosurePanel>
        </Disclosure>
    );
}
