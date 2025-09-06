import Home from "./Home.svelte";
import Orders from "./Orders.svelte";
import QrGenerate from "./QrGenerate.svelte";
import Reviewers from "./Reviewers.svelte";
import Login from "./Login.svelte";

export const routes = [
  { path: "/", component: Home },
  { path: "/orders", component: Orders },
  { path: "/qr-generate", component: QrGenerate },
  { path: "/reviewers", component: Reviewers },
  { path: "/login", component: Login },
];