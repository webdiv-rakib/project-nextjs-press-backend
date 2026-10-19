import Link from 'next/link'
import {
    Bell,
    ChevronsUpDown,
    CreditCard,
    LogOut,
    Settings,
    User,
} from 'lucide-react'

import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Overview', href: '#overview' },
    { label: 'Projects', href: '#projects' },
    { label: 'Activity', href: '#activity' },
    { label: 'Login', href: '/login' },
]

const userMenuItems = [
    { label: 'Profile', icon: User },
    { label: 'Billing', icon: CreditCard },
    { label: 'Settings', icon: Settings },
]

export function NavBar() {
    return (
        <main className="bg-muted/30">
            <header className="border-b bg-background">
                <nav
                    aria-label="Main navigation"
                    className="mx-30 flex pt-5 pb-5 justify-between items-center px-6"
                >
                    <div className="flex items-center gap-10">
                        <Link href="#overview" className="text-lg font-semibold tracking-tight">
                            Northstar
                        </Link>
                    </div>
                    <div className="hidden items-center gap-1 md:flex">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                aria-current={index === 0 ? 'page' : undefined}
                                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${index === 0
                                    ? 'bg-accent text-accent-foreground'
                                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                                    }`}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* <button
                            type="button"
                            aria-label="Notifications"
                            className="hidden rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground sm:inline-flex"
                        >
                            <Bell aria-hidden="true" />
                        </button> */}

                        <DropdownMenu>
                            <DropdownMenuTrigger className="flex items-center gap-2 rounded-md p-1.5 pr-2 text-left outline-none transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
                                <Avatar className="size-8">
                                    <AvatarFallback className="bg-primary text-xs text-primary-foreground">
                                        JD
                                    </AvatarFallback>
                                </Avatar>
                                <span className="hidden text-sm font-medium sm:block">Jordan Davis</span>
                                <ChevronsUpDown aria-hidden="true" className="hidden text-muted-foreground sm:block" />
                                <span className="sr-only">Open user menu</span>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        <p>Jordan Davis</p>
                                        <p className="font-normal text-muted-foreground">jordan@example.com</p>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    {userMenuItems.map((item) => {
                                        const Icon = item.icon
                                        return (
                                            <DropdownMenuItem key={item.label}>
                                                <Icon aria-hidden="true" />
                                                {item.label}
                                            </DropdownMenuItem>
                                        )
                                    })}
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <LogOut aria-hidden="true" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </nav>
            </header>

        </main>
    )
}
