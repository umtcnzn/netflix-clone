import { useCallback, useEffect, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import AccountMenu from "./AccountMenu";

const TOP_OFFSET = 66;

export default function Navbar() {

    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAccountMenu, setAccountMenu] = useState(false);
    const [showBackground, setShowBackground] = useState(false);

    const toogleMobileMenu = useCallback(() => {
        setShowMobileMenu(current => !current)
    }, [])

    const toogleAccountMenu = useCallback(() => {
        setAccountMenu(current => !current)
    }, [])


    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY >= TOP_OFFSET) {
                setShowBackground(true);
            }
            else {
                setShowBackground(false);
            }
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll);
        }
    }, [showMobileMenu])


    return <>
        <nav className="w-full z-40 fixed">
            <div className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${showBackground ? "bg-opacity-90 bg-zinc-900" : ""}`}>
                <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />

                <div className="flex-row ml-8 gap-7 hidden lg:flex">
                    <NavbarItem label="Home" />
                    <NavbarItem label="Series" />
                    <NavbarItem label="Films" />
                    <NavbarItem label="New & Popular" />
                    <NavbarItem label="My List" />
                    <NavbarItem label="Browse by Languages" />
                </div>
                <div onClick={toogleMobileMenu} className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative">
                    <p className="text-white text-sm">Browse</p>
                    <BsChevronDown className={`text-white transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`} />
                    <MobileMenu visible={showMobileMenu} />
                </div>
                <div className="flex flex-row ml-auto gap-7 items-center">
                    <div className="text-gray-200 hover:text-gray-400 cursor-pointer">
                        <BsSearch />
                    </div>
                    <div className="text-gray-200 hover:text-gray-400 cursor-pointer">
                        <BsBell />
                    </div>
                    <div onClick={toogleAccountMenu} className="flex flex-row items-center gap-2 cursor-pointer relative">
                        <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
                            <img src="/images/default-red.png" />
                        </div>
                        <BsChevronDown className={`text-white transition ${showAccountMenu ? "rotate-180" : "rotate-0"}`} />
                        <AccountMenu visible={showAccountMenu} />
                    </div>
                </div>
            </div>
        </nav>
    </>
}