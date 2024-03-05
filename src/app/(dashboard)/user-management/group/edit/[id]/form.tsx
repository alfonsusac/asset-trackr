"use client"

import { Input } from "@/components/input"
import { Switch } from "@/components/switch"
import { Tabs, TabsList, TabsTrigger } from "@/components/tabs"
import { UserGroup, UserGroupPermission } from "@prisma/client"
import { TabsContent, TabsTriggerProps } from "@radix-ui/react-tabs"
import { changeUserGroupPermission, updateUserGroupInfo } from "../../action"
import toast from "react-hot-toast"
import { toastAction } from "@/lib/action-toast"

export function EditUserGroupForm(
  props: {
    data: UserGroup
  }
) {
  const { name, description, permissions, id } = props.data


  return (
    <form className="card card-big space-y-4" action={async (formData) => {
      try {
        toastAction(updateUserGroupInfo(props.data.id, {
          name: formData.get('name') as string,
          description: formData.get('description') as string,
        }))
      } catch (error: any) {
        toast.error(`Error: ${ error.message }`)
      }
    }}>
      <h2 className="text-lg mt-0">General</h2>
      <fieldset>
        <label>Group Name</label>
        <Input
          placeholder="Enter group name"
          name="name"
          defaultValue={name}
        />
      </fieldset>
      <fieldset>
        <label>Description</label>
        <Input
          placeholder="Enter description"
          name="description"
          defaultValue={description}
        />
      </fieldset>

      <button className="primary !mt-6">
        Save
      </button>
    </form>
  )

}

export function PermissionSettings(
  props: {
    userGroup: UserGroup
  }
) {
  return (
    <div className="card card-big">
      <h2 className="text-lg mt-0">Permissions</h2>

      <Tabs defaultValue="General">
        <TabsList className="h-auto bg-transparent border-b rounded-none p-0 text-blue-900/40 block">
          {
            permissionMenu.map(i => (
              <TabsTrigger
                className="flex-none px-6 py-2.5 rounded-none my-0 !font-normal data-[state=active]:!shadow-[0_0.3rem_0.1rem_-0.2rem_rgb(29_78_216)]"
                key={i.tabname}
                value={i.tabname}>
                {i.tabname}
              </TabsTrigger>
            ))
          }
        </TabsList>
        {
          permissionMenu.map(menu => (
            <TabsContent
              value={menu.tabname}
              key={menu.tabname}
              className="p-6"
            >
              {/* <header className="!text-sm !font-normal mb-2 !mt-0 text-neutral-800"> */}
              {/* {menu.title ?? menu.tabname} */}
              {/* </header> */}

              <div className="grid grid-cols-2">
                {
                  menu.items.map(item => (
                    <div
                      key={item.title}
                      className="py-2 flex gap-5 items-center"
                    >
                      <Switch
                        defaultChecked={item.key && props.userGroup.permissions.includes(item.key)}
                        disabled={!item.key}
                        onCheckedChange={(checked) => {
                          if (item.key) {
                            toastAction(changeUserGroupPermission(
                              props.userGroup.id,
                              checked ? "add" : "remove",
                              item.key
                            ))
                          }
                        }}
                      />

                      <div className="">
                        <div>
                          {item.title}
                        </div>
                        <div className="text-sm text-neutral-400">
                          {item.description}
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>

            </TabsContent>
          ))
        }
      </Tabs>
    </div>
  )
}

type PermissionMenus = {
  tabname: string,
  title?: string,
  items: PermissionItem[]
}

type PermissionItem = {
  title: string,
  description: string,
  key?: UserGroupPermission
}

const permissionMenu: PermissionMenus[] = [
  {
    tabname: "General",
    title: "General Settings",
    items: [
      {
        title: "Full Access",
        description: "Grant full access to the whole application",
        key: "FullAccess"
      }
    ]
  },
  {
    tabname: "Assets",
    title: "Asset Management",
    items: [
      {
        title: "Access",
        description: "Have access to the Asset Management menu",
        key: "AssetManagement_Access"
      },
      {
        title: "Add Asset",
        description: "Users can add a new asset.",
        key: "AssetManagement_AddAsset"
      },
      {
        title: "Edit Asset",
        description: "Users can edit the asset data.",
        key: "AssetManagement_EditAsset"
      },
      {
        title: "Change Status",
        description: "Users can change the status (Requires approval).",
        key: "AssetManagement_ChangeStatus"
      },
      {
        title: "Asset Handover",
        description: "Handover assets between users and location.",
        key: "AssetManagement_HandoverAsset"
      },
      {
        title: "Download Data",
        description: "Users can download asset data in .csv",
        key: "AssetManagement_DownloadData"
      },
      {
        title: "Delete Asset",
        description: "Users can delete assets (Requires approval).",
        key: "AssetManagement_DeleteAsset"
      },
    ]
  },
  {
    tabname: "Work Order",
    title: "Work Order",
    items: [
      {
        title: "Access",
        description: "Have access to the Asset Management menu",
      },
      {
        title: "Create Work Order",
        description: "Users can add a new work order.",
      },
      {
        title: "Assign Work Order",
        description: "Users can assign work order to worker/assignee.",
      },
      {
        title: "Edit Work Order",
        description: "Users can edit the work order.",
      },
      {
        title: "Set Priority",
        description: "Users can set the priority for each work order.",
      },
      {
        title: "Approve & Reject",
        description: "Users can approve and reject work order resolutions.",
      },
      {
        title: "Cancel",
        description: "Users can cancel work order tickets.",
      },
      {
        title: "Schedule Work Order",
        description: "Users can set schedule work order",
      },
      {
        title: "Add Checklist Forms",
        description: "Users can create and add checklist forms to work orders.",
      },
      {
        title: "Edit Checklist Forms",
        description: "Users can edit checklist forms.",
      },
      {
        title: "Delete Checklist Forms",
        description: "Users can delete checklist forms in a work order.",
      },
    ]
  },
  {
    tabname: "Inspections",
    items: [
      {
        title: "Access",
        description: "Have access tot he Inspection menu",
      },
      {
        title: "Add Inspection",
        description: "User can add inspection data",
      },
      {
        title: "Download Data",
        description: "User can download inspection data in .csv",
      },
    ]
  },
  {
    tabname: "Inventory",
    items: [
      {
        title: "Access",
        description: "Have access to the Inventory menu",
      }
    ]
  },
  {
    tabname: "Approval",
    items: [
      {
        title: "Access",
        description: "Have access to the Approval menu",
      }
    ]
  },
  {
    tabname: "Reports",
    items: [
      {
        title: "Access",
        description: "Have access to the Reports menu",
      }
    ]
  },
  {
    tabname: "Locations",
    items: [
      {
        title: "Access",
        description: "Have access to the Locations menu",
      }
    ]
  },
  {
    tabname: "Users",
    items: [
      {
        title: "Access",
        description: "Have access to the Users menu",
      },
      {
        title: "Add User",
        description: "User can add other user.",
      },
      {
        title: "Edit User",
        description: "User can edit user data.",
      },
      {
        title: "Download Data",
        description: "User can download user data in .csv",
      },
      {
        title: "Delete User",
        description: "User can delete other user.",
      },
      {
        title: "Add Group User",
        description: "User can add group and permission.",
      },
      {
        title: "Edit Group User",
        description: "User can edit group and permission.",
      },
      {
        title: "Delete Group User",
        description: "User can delete group and permission.",
      },
    ]
  },
  {
    tabname: "Settings",
    items: [
      {
        title: "Access",
        description: "Have access to the Settings menu",
      }
    ]
  },
]