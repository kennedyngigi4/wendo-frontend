"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

import { useSession, signOut } from "next-auth/react";
import { useWorkspaceStore } from "@/stores/workspaceStore";
import WorkspaceSwitcher from "./dashboard-workspaceswitcher";

import {
  PatientMenus,
  DefaultProviderMainMenus,
  ProviderHospitalMenus,
  ProviderAmbulanceMenus,
  ProviderProfessionalMenus,
} from "@/lib/menus/dashboard-menus";
import { LogOut } from "lucide-react";
import CustomButton from "@/components/ui/custom-button";

const DashboardSidebar = () => {
  const { open } = useSidebar();
  const { data: session } = useSession();

  const activeWorkspace = useWorkspaceStore((s) => s.activeWorkspace);

  const onLogOut = async() => {
    await signOut({ callbackUrl: "/", });
  }

  // 1. Patient menus
  if (session?.user?.role === "patient") {
    return (
      <Sidebar collapsible="icon">
        <SidebarHeader>
          {open ? (
            <Link href="/">
              <Image src="/wendo-logo.png" alt="" height={70} width={70} />
            </Link>
          ) : (
            <Link href="/">
              <Image src="/favicon.png" alt="" height={30} width={30} />
            </Link>
          )}
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {PatientMenus.map((menu) => (
              <SidebarMenuItem key={menu.label}>
                <SidebarMenuButton asChild>
                  <Link href={menu.url}>
                    <menu.icon />
                    <span>{menu.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarFooter>
          <CustomButton 
            label="Log out"
            btnType="button"
            prefixIcon={{ type: "lucide", icon: LogOut }}
            onClick={onLogOut}
            variant="ghost"
            className="text-secondary"
          />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  // 2. Provider menus (workspace based)
  let providerMenus = DefaultProviderMainMenus; // default overview menus

  if (activeWorkspace) {
    if (activeWorkspace.type === "professional") {
      providerMenus = ProviderProfessionalMenus;
    }

    if (activeWorkspace.type === "provider") {
      if (activeWorkspace.provider_type === "hospital" || activeWorkspace.provider_type === "clinic") {
        providerMenus = ProviderHospitalMenus;
      } else if (activeWorkspace.provider_type === "ambulance") {
        providerMenus = ProviderAmbulanceMenus;
      } else {
        providerMenus = DefaultProviderMainMenus;
      }
    }
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        {open ? (
          <Link href="/">
            <Image src="/wendo-logo.png" alt="" height={70} width={70} />
          </Link>
        ) : (
          <Link href="/">
            <Image src="/favicon.png" alt="" height={30} width={30} />
          </Link>
        )}
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarMenu>
          {/* Workspace switcher only for provider dashboard */}
          <SidebarMenuItem className="px-2">
            <WorkspaceSwitcher />
          </SidebarMenuItem>

          {providerMenus.map((menu) => (
            <SidebarMenuItem key={menu.label}>
              <SidebarMenuButton asChild>
                <Link href={menu.url}>
                  <menu.icon />
                  <span>{menu.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <CustomButton
          label="Log out"
          btnType="button"
          prefixIcon={{ type: "lucide", icon: LogOut }}
          onClick={onLogOut}
          variant="ghost"
          className="text-secondary"
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};

export default DashboardSidebar;