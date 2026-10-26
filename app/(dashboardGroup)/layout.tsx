import { NavBar } from '@/components/shared/NavBar'
import { SidebarProvider } from '@/components/ui/sidebar';
import { getMe } from '@/service/getMe';
import React from 'react'
import DashboardSidebar from './_components/DashboardSidebar';

const DashboardGroupLayout = async ({ children }: { children: React.ReactNode }) => {
    const user = await getMe();
    return (
        <div>
            <NavBar user={user} />
            <SidebarProvider>
                <div className="flex flex-1">
                    <DashboardSidebar />
                    <main className="flex-1 min-w-0">{children}</main>
                </div>
            </SidebarProvider>
        </div>
    )
}

export default DashboardGroupLayout
