<script lang="ts">
    import dayjs from "dayjs";
    import { onMount } from "svelte";
    import { createTable, getCoreRowModel,  } from '@tanstack/table-core'
    console.log(createTable)

    /* let data = [
        { name: "홍길동", age: 25, job: "개발자" },
        { name: "김철수", age: 30, job: "디자이너" },
        { name: "김철수", age: 30, job: "디자이너" },
    ];

    let columns = [
        { accessorKey: "name", header: "이름", cell: (props) => {props.getValue()},  },
        { accessorKey: "age", header: "나이", cell: (props) => {props.getValue()},  },
        { accessorKey: "job", header: "직업", cell: (props) => {props.getValue()},  }
    ]; */

    let columns = [
        { accessorKey: "name", header: "이름", cell: (props) => {props.getValue()},  },
        { accessorKey: "gender", header: "성별", cell: (props) => {props.getValue()},  },
        { accessorKey: "email", header: "이메일", cell: (props) => {props.getValue()},  },
        { accessorKey: "link", header: "채널링크크", cell: (props) => {props.getValue()},  },
        { accessorKey: "phone", header: "연락처", cell: (props) => {props.getValue()},  },
        { accessorKey: "wish_drink", header: "관심주류", cell: (props) => {props.getValue()},  },
        { accessorKey: "birthday", header: "생년월일", cell: (props) => {props.getValue()},  },
        { accessorKey: "channel", header: "채널", cell: (props) => {props.getValue()},  },
        { accessorKey: "create_date", header: "일자", cell: (props) => {props.getValue()},  },
    ];

    $effect(()=> {
        
    })

    let list= $state<any>([])
    onMount(async ()=>{
        const res= await fetch(`${import.meta.env.VITE_CORENZO_URL}/reviewers`)
        const data= await res.json()
        list= data.list
        console.log(data)
    })
    let options= $derived({ 
        data: list, columns, 
        getCoreRowModel: getCoreRowModel(), 
        renderFallbackValue: [], 
        state: {}, onStateChange: ()=> {},  
    })
    const table = createTable(options);
    console.log(table)
    
    
</script>
<table>
<!-- <thead>
    <tr>
    {#each table.getHeaderGroups() as headerGroup}
        {#each headerGroup.headers as header}
        <th>{header.column.columnDef.header}</th>
        {/each}
    {/each}
    </tr>
</thead> -->
<tbody>
    
</tbody>
</table>
{#each table.getRowModel().rows as row}

<div>
    {console.log(row, row.getValue('name'))}
    <!-- {#each row.getVisibleCells() as cell}
    <td>{cell.getValue()}</td>
    {/each} -->
</div>
{/each}
<div class="p-10">
    {#each list as reviewer}
        {@const {name, gender, email, link, msg, phone, wish_drink, birthday, channel, create_date}= reviewer}
        {@const links= JSON.parse(link)}
        <ul class="flex border-b text-xs gap-2 text-nowrap ">
            <li class="w-12">{name}</li>
            <li class="w-12">{gender}</li>
            <li class="w-44">{email}</li>
            <li class="w-72">
                {#each Object.keys(links) as channelName }
                    {#each links[channelName] as link}
                        <div class="text-ellipsis overflow-hidden pb-1" title={link.value}>
                            <a href={link.value} target="_blank" class="hover:underline hover:text-rose-500 text-emerald-400">
                                {link.value}
                            </a>
                        </div>
                    {/each}
                {/each}
            </li>
            <li class="w-28">{msg}</li>
            <li class="w-28">{phone}</li>
            <li class="w-32">{JSON.parse(wish_drink).join(', ')}</li>
            <li class="w-24">{birthday}</li>
            <li class="w-48">{JSON.parse(channel).join(', ')}</li>
            <li class="text-xs">{dayjs(create_date).format('YYYY-MM-DD HH:mm')}</li>
        </ul>
    {/each}
</div>