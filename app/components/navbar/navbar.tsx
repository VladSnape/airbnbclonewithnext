import { FaAirbnb } from "react-icons/fa6";
import { RxAvatar } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import { createAirbnbHome } from "@/app/actions";


const NavBar = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();


  const createHomewithId = createAirbnbHome.bind(null, {
    userId: user?.id as string,
  });


  return (
    <nav className="p-3 flex justify-between items-center">
      <Link className=" flex gap-2" href={'/'}>
        <FaAirbnb className=" text-primary text-3xl items-center" />
        <h1 className="text-2xl font-bold text-primary">airbnb</h1>
      </Link>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className=" flex gap-1 flex-row-reverse rounded-full shadow hover:shadow-lg border p-2 hover:scale-105 transition-transform ease-in items-center">
              <RxHamburgerMenu className="text-xl" />
              {user?.picture ? (
                <div className="rounded-full border flex items-center bg-cover">
                  <Image src={user?.picture} height={25} width={25} alt="avatar" className="bg-cover rounded-full"></Image>
                </div>
              ) : (<RxAvatar className="text-2xl" />
              )}
            </div></DropdownMenuTrigger>
          <DropdownMenuContent>
            {!user ? (
              <>

                <DropdownMenuItem><LoginLink>Sign in</LoginLink></DropdownMenuItem>
                <DropdownMenuItem><RegisterLink>Sign up</RegisterLink></DropdownMenuItem>
              </>

            ) : (<>
              <DropdownMenuItem>
                <form action={createHomewithId} className="w-full">
                  <button type="submit" className="w-full text-start">
                    Airbnb your Home
                  </button>
                </form>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/my-homes" className="w-full">
                  My Listings
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/favorites" className="w-full">
                  My Favorites
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="/reservations" className="w-full">
                  My Reservations
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem><LogoutLink className=" text-primary">Logout</LogoutLink></DropdownMenuItem>

            </>
            )
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

    </nav>
  )
}

export default NavBar