<script lang="ts">
  import AppSidebar from "./app-sidebar.svelte";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import NavTopDrawer from "./NavTopDrawer.svelte";
  import NavBottom from "./NavBottom.svelte";
  import { menuData } from "./menu-data";
  import { useLocation } from "svelte-routing";
  const { children }= $props()

  const location= useLocation()
  let pathSegments= $derived($location.pathname.split('/').filter(Boolean))

  const getRouteName = (segment: string) => {
    const info= menuData.navMain.find(item => {
      console.log(item, segment)
      if (item.url === `/${segment}`) {
        return true
      }
      if (item.items) {
        return item.items.find(subItem => subItem.url === `/${segment}`)?.title;
      }
    });
    return info ? info.title : segment.charAt(0).toUpperCase() + segment.slice(1);
  };
  console.log('pathSegments', getRouteName('orders'))
</script>

<Sidebar.Provider >
  <AppSidebar class="z-50"/>
  <Sidebar.Inset>
    <header
      class="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear"
    >
      <div class="flex justify-between w-full">
        <div class="flex items-center gap-2 px-4">
          <Sidebar.Trigger class="-ml-1" />
          <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
          <Breadcrumb.Root>
            <Breadcrumb.List>
              <Breadcrumb.Item>
                <Breadcrumb.Link href="/">홈</Breadcrumb.Link>
              </Breadcrumb.Item>
              {#each pathSegments as segment, i}
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  {#if i === pathSegments.length - 1}
                    <Breadcrumb.Page>{getRouteName(segment)}</Breadcrumb.Page>
                  {:else}
                    <Breadcrumb.Link href={'/' + pathSegments.slice(0, i + 1).join('/')}>{getRouteName(segment)}</Breadcrumb.Link>
                  {/if}
                </Breadcrumb.Item>
              {/each}
              
            </Breadcrumb.List>
          </Breadcrumb.Root>
          
        </div>
        <NavTopDrawer />

      </div>
      
    </header>
    
    {@render children?.()}
    <NavBottom />

  </Sidebar.Inset>
</Sidebar.Provider>

