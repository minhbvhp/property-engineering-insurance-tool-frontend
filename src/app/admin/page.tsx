import "server-only";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTabContent from "@/components/admin/user/user-tab-content";
import RoleTabContent from "@/components/admin/role/role-tab-content";
import PermissionTabContent from "@/components/admin/permission/permission-tab-content";
import CompanyTabContent from "@/components/admin/company/company-tab-content";
import CompanyAreaTabContent from "@/components/admin/company-area/company-area-tab-content";
import CompanyBranchTabContent from "@/components/admin/company-branch/company-branch-tab-content";
import RolePermissionMappingTabContent from "@/components/admin/role-permission-mapping/role-permission-mapping-tab-content";

interface IProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function AdminPage(props: IProps) {
  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full h-auto grid-cols-2 grid-rows-2 md:grid-cols-7 md:grid-rows-1">
        <TabsTrigger value="account">Người dùng</TabsTrigger>
        <TabsTrigger value="role">Vai trò</TabsTrigger>
        <TabsTrigger value="permission">Quyền hạn</TabsTrigger>
        <TabsTrigger value="role-permission-mapping">Phân quyền</TabsTrigger>
        <TabsTrigger value="company">Công ty</TabsTrigger>
        <TabsTrigger value="company-area">Khu vực</TabsTrigger>
        <TabsTrigger value="company-branch">Chi nhánh</TabsTrigger>
      </TabsList>

      <TabsContent value="account">
        <UserTabContent {...props} />
      </TabsContent>

      <TabsContent value="role">
        <RoleTabContent />
      </TabsContent>

      <TabsContent value="permission">
        <PermissionTabContent />
      </TabsContent>

      <TabsContent value="role-permission-mapping">
        <RolePermissionMappingTabContent />
      </TabsContent>

      <TabsContent value="company">
        <CompanyTabContent />
      </TabsContent>

      <TabsContent value="company-area">
        <CompanyAreaTabContent />
      </TabsContent>

      <TabsContent value="company-branch">
        <CompanyBranchTabContent />
      </TabsContent>
    </Tabs>
  );
}
