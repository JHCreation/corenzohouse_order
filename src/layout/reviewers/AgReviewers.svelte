<script lang="ts" module>
    import { readable, writable } from "svelte/store";
    export const msgClick= writable<any>    (null)
</script>

<script lang="ts">
    import { AgGrid, makeSvelteCellRenderer } from "ag-grid-svelte5-extended";
    import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
    import { themeQuartz, themeBalham } from "@ag-grid-community/theming";
    import {type ColDef, type GridOptions, type RowHeightParams} from "@ag-grid-community/core"
    import { onMount } from "svelte";
    import ChannelLinkCell from "./cells/ChannelLinkCell.svelte";
    import _ from "lodash";
    import MsgCell from "./cells/MsgCell.svelte";
    import Detail from "./Detail.svelte";
    import Button from "~/lib/components/ui/button/button.svelte";
    import CheckedList from "./CheckedList.svelte";



    interface Person {
        id: string;
        name: string;
        age: number;
    }

    let rowData = $state<Person[]>([
        { id: "1", name: "Jane", age: 25 },
        { id: "2", name: "Jimbo", age: 32 },
        { id: "3", name: "Jensen", age: 41 },
    ]);

    

    let list= $state<any>([])
    onMount(async ()=>{
        const res= await fetch(`${import.meta.env.VITE_CORENZO_URL_PUBLIC}/reviewers`)
        const data= await res.json()
        list= data.list
        console.log(msgClick)
        msgClick.set(handleClickMsg)
        // console.log(data)
    })

    let currentData= $state<any>(null)
    let open= $state(false)
    const setOpen= (state)=> {
        open= state
    }
    const handleClickMsg= (msg)=> (e)=> {
        console.log(msg, setOpen)
        setOpen(true)
        currentData= { msg }
    }
    
    
    function getRowHeight(params: RowHeightParams): number | undefined | null {
        const links= JSON.parse(params.data['link'])
        const line= _.flattenDeep(_.values(links)).length
        return 20*(line==0?1:line);
    }

    const columns: ColDef[] = [
        { field: "name", headerName: "이름", rowDrag: true },
        { field: "gender", headerName: "성별",  },
        { field: "email", headerName: "이메일",  },
        { 
            field: "link", headerName: "채널링크", 
            valueGetter: (p) => JSON.parse(p.data['link']),
            valueFormatter: (p)=> {
                console.log(p.value)
                
                if( p?.value ){
                    // const matches = p.value.match(regex)

                }
                return p.value
            },
            cellRenderer: makeSvelteCellRenderer(ChannelLinkCell),
            // cellClass: ['h-20 text-lg']
        },
        { field: "phone", headerName: "연락처",  },
        { field: "wish_drink", headerName: "관심주류",  },
        { field: "birthday", headerName: "생년월일",  },
        { field: "channel", headerName: "채널",  },
        { 
            field: "msg", headerName: "메세지", 
            cellRenderer: makeSvelteCellRenderer(MsgCell),

         },
        { field: "create_date", headerName: "일자",  },
    ]

    const myTheme = themeQuartz.withParams({
        spacing: 1,
        // accentColor: 'red',
        fontSize: '1em'
    });

    let checkedList= $state<any[]>([])
    const onRowSelected= (event)=> {
        if( event.node.isSelected() ) {
            checkedList.push(event.data)
        }
        if( !event.node.isSelected() ) {
            checkedList= _.filter(checkedList, o=> o.key != event.data.key)
        }
        console.log(event.data,
            "row " + event.node.data.athlete + " selected = " + event.node.isSelected(),
        );
    }

    const options: GridOptions = {
        getRowHeight,
        // rowHeight: 20,
        defaultColDef: {
            flex: 1,
            minWidth: 50,
        },
        rowSelection: {
            mode: "multiRow",
        },
        getRowId: (params) => params.data.key,
        pagination: true,
        paginationAutoPageSize: true,
        onRowSelected,
        theme: myTheme
    };

    

    
    const gridOptions: GridOptions = {
        columnDefs: columns,
        ...options
    }

    const modules = [ClientSideRowModelModule];



    const rightColumns: ColDef[] = [
        { field: "name", headerName: "이름", rowDrag: true },
        { field: "gender", headerName: "성별",  },
        { field: "email", headerName: "이메일",  },
        { 
            field: "link", headerName: "채널링크", 
            valueGetter: (p) => JSON.parse(p.data['link']),
            valueFormatter: (p)=> {
                console.log(p)
                return p.value
            },
            cellRenderer: makeSvelteCellRenderer(ChannelLinkCell),
            // cellClass: ['h-20 text-lg']
        },
        { field: "phone", headerName: "연락처",  },
        { field: "wish_drink", headerName: "관심주류",  },
        { field: "birthday", headerName: "생년월일",  },
        { field: "channel", headerName: "채널",  },
        { field: "msg", headerName: "메세지",  },
        { field: "create_date", headerName: "일자",  },
    ]


    const rigthGridOptions: GridOptions = {
        columnDefs: rightColumns,
        ...options
    }
    
</script>
<Detail {open} {setOpen} {currentData}/>



<div class="h-[calc(100dvh-6rem)] text-xs px-5 pt-10">
    <div class="flex h-full w-full">

        <CheckedList {checkedList} />


        <div class="w-full">
            <AgGrid {gridOptions} rowData={list} {modules} />
        </div>
        
        <!-- <div class="w-1/2">
            <AgGrid gridOptions={rigthGridOptions} rowData={[]} {modules} />
        </div> -->
    </div>
</div>

