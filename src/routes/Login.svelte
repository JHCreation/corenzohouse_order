<script lang="ts">
	import { Button } from "$lib/components/ui/button/index.js";
	import * as Card from "$lib/components/ui/card/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
    import { Switch } from "$lib/components/ui/switch/index.js";
    import { CircleCheckBig, Eye, EyeOff } from "@lucide/svelte";
    import { cn } from "~/lib/utils";
    import Cookies from 'js-cookie';
    import { onMount } from "svelte";
    import { Link, navigate, useLocation } from "svelte-routing";
    import { toast, Toaster } from "svelte-sonner";
    import { authUrl } from "~/store/comm_store.svelte";
    import { handleLogout, log, setLog } from "~/components/auth/authorize.svelte";
    import queryString from "query-string";

    const location= useLocation()
    const searchParams = new URLSearchParams($location.search);
    const path= searchParams.get('referer')
    const referer= path ?? '/admin'

    let show= $state(false)
    let remember= $state(false)
    Cookies.set('name', 'value')
    let id= $state('')
    let pw= $state('')

    const submit = async (params) => {
        const formData = new URLSearchParams(); // 또는 new FormData()
        formData.append("username", params.username);
        formData.append("password", params.password);
        const response= await fetch(`${authUrl}/login`, {
            method: 'post',
            headers: {
                // "Content-Type": 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
            body: formData
        })
        const data= await response.json()
        console.log(data)
        if( data?.access_token) {
            console.log(data, referer)
            const { access_token, userid }= data
            const responseLog= {
                // access_token: access_token,
                // userid: userid,
                state: true,
                is_login: true,
            }
            setLog({access_token, state:responseLog})
            return navigate(`${referer}`)

            const qsReferer= `?${queryString.stringify({referer})}`
            setTimeout(e=> {
                console.log('이동', qsReferer)
                navigate(`${qsReferer}`)
            }, 1000)
        } else {
            toast.error(data.detail)
        }
    }
    const handleLogin= (e)=> {
        if( id == '' || pw == '' ) {
            toast.error('아이디와 비밀번호를 입력해주세요.')
            return
        }
        submit({ username: id, password: pw, })
        // navigate('/admin', { preserveScroll: false })
    }
    const handleKeyPress= (e) => {
        console.log(e)
        if( e.key === 'Enter' ) {
            handleLogin(e)
        }
    }
    const logout= () => {
        handleLogout(setLog)
    }

    onMount(()=> {
        // console.log(Cookies.get('rememberUserId'), Cookies.get('rememberUserPw'))
        const rememberId= Cookies.get('rememberUserId')
        const rememberPw= Cookies.get('rememberUserPw')
        if( rememberId === undefined || rememberPw === undefined ) return
        
        id= rememberId
        pw= rememberPw
        remember= true
        
    })

    $effect(()=>{
        if (remember) {
            Cookies.set('rememberUserId', id, { expires: new Date(Date.now() + 360 * 1000) })
            Cookies.set('rememberUserPw', pw, { expires: new Date(Date.now() + 360 * 1000)})
        } else {
            Cookies.remove("rememberUserId");
            Cookies.remove("rememberUserPw");
        }
    })
    $inspect("login gate : ",$log)
</script>


<div class="min-h-dvh flex items-center px-4 md:px-0">
    {#if $log && $log?.access_token}
    <!-- {#if $log } -->
        <div class="m-auto w-full max-w-[450px] flex flex-col gap-2">
            <Card.Root class="mx-auto my-auto w-full max-w-sm">
                <Card.Header class="flex items-center">
                    <CircleCheckBig />

                    <Card.Title class="">로그인이 되어 있습니다.</Card.Title>
                    <!-- <Card.Description>Enter your email below to login to your account</Card.Description> -->
                </Card.Header>
                <!-- <span class="text-nowrap">로그인이 되어 있습니다.</span> -->
                 <div class="flex gap-2 px-5">
                    <Link to="/admin" >
                        <Button>메인으로</Button>
                    </Link>
                    <Button class="" variant={"destructive"} onclick={e=>logout()}>로그아웃</Button>
                </div>
            </Card.Root>
        </div>
    {:else if $log.state != null}
        <Card.Root class="mx-auto my-auto w-full max-w-sm">
            <Card.Header>
                <Card.Title class="text-2xl">로그인</Card.Title>
                <!-- <Card.Description>Enter your email below to login to your account</Card.Description> -->
            </Card.Header>
            <Card.Content>
                <div class="grid gap-4">
                    <div class="grid gap-2">
                        <Label for="id">아이디</Label>
                        <Input id="id" type="text" required bind:value={id} onkeypress={handleKeyPress} />
                    </div>
                    <div class="grid gap-2">
                        <!-- <div class="flex items-center">
                            <Label for="password">Password</Label>
                            <a href="##" class="ml-auto inline-block text-sm underline">
                                Forgot your password?
                            </a>
                        </div> -->
                        <Label for="password">비밀번호</Label>
                        <div class="relative">
                            <Input 
                                id="password" type={cn({
                                    "text": show,
                                    "password": !show,
                                })} required bind:value={pw} 
                                onkeypress={handleKeyPress}
                            />
                            <button onclick={e=> show= !show} class="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2">
                                {#if show} <Eye /> {/if}
                                {#if !show} <EyeOff /> {/if}
                            </button>
                        </div>
                        
                    </div>

                    <div class="flex items-center-safe space-x-2">
                        <Switch bind:checked={remember} onchange={e=> console.log(e, remember)} class="cursor-pointer" />
                        <span class="text-xs">아이디 비번 기억하기</span>
                    </div>
                    <Button type="submit" class="w-full" onclick={handleLogin}>로그인</Button>
                    <!-- <Button variant="outline" class="w-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                                fill="currentColor"
                            />
                        </svg>
                        Login with Google
                    </Button> -->
                </div>
                <!-- <div class="mt-4 text-center text-sm">
                    Don't have an account?
                    <a href="##" class="underline"> Sign up </a>
                </div> -->
            </Card.Content>
        </Card.Root>
    {/if}
    
</div>
<Toaster closeButton theme="light" richColors position={"bottom-center"}/>
