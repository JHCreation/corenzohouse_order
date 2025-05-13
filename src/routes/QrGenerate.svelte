<script lang="ts">
  import QRCode from 'qrcode'
  import { onMount } from 'svelte';
  import printJS from 'print-js'
  import Button from '~/lib/components/ui/button/button.svelte';
  import { Info } from 'lucide-svelte';
  // console.log(QRCode)

  let qrCode = $state<any[]>([])

  async function generateQRCode(code: string[]) {
    code.map(async (c)=> {
      const url= `https://www.secret-kitchen.net?tid=${c}`;
      try {
        const qr= await QRCode.toString(url, { type: "svg" });
        qrCode.push({url, qr, id :c,})
        console.log(qrCode)
      } catch (err) {
        const error = (err as Error).message || "Unknown error: Unable to render QR Code.";
        console.log(error)
      }
    })
    
  }
  generateQRCode(['1','2','3','4','5','6','7','8','9','10','11','12'])
  
  onMount(()=> {
    
    
    /* QRCode.toDataURL('https://order.corenzohouse.com?tid=1')
    .then(url => {
      console.log(url)
    })
    .catch(err => {
      console.error(err)
    }) */

    /* if( canvas )
    QRCode.toCanvas(canvas, 'https://order.corenzohouse.com/', function (error) {
      if (error) console.error(error)
      console.log('success!');
    }) */
  })

  const handlePrint = () => {
    /* const d = new Printd();

    function copyStyles(src, dest) {
      const styleSheets = document.styleSheets;
      let styles = "";
      for (let i = 0; i < styleSheets.length; i++) {
        try {
          const rules = styleSheets[i].cssRules || styleSheets[i].rules;
          for (let j = 0; j < rules.length; j++) {
            styles += rules[j].cssText + "\n";
          }
        } catch (e) {
          console.warn("Unable to access stylesheet:", styleSheets[i]);
        }
      }
      return styles;
    }

    d.print(printRef, {
      styles: `@import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css'); body { font-family: Arial, sans-serif; }`
    }); */
    printJS({
      printable: 'printArea',
      type: 'html',
      targetStyles: ['*'],
      css: ['/src/app.css'],
      scanStyles: false
    })

  };
  
</script>

<div class="w-full max-w-screen-md- mx-auto p-12">
  <Button onclick={handlePrint}>프린트</Button>
  <div class="mt-10">
    <div id="printArea" class="page relative  grid grid-cols-2 grid-rows-3 font-['Paperlogy']">
      {#each qrCode as qr}
        <div class="border border-dashed h-[14.85cm] flex p-[4mm]">
          <div class="qr-menu-item w-full p-4 flex flex-col">
            
            <div class="w-full flex">
              <div class="w-3/5 flex items-start">
                <p class="text-center font-extrabold  leading-4">{qr.id}</p>
                {@html qr.qr}
              </div>
              
              <div class="w-2/5 pt-4 pl-2">
                <ul class="list-disc list-outside text-[0.8em] leading-4 break-keep">
                  <li class="py-1">QR코드를 스캔해 메뉴를 확인합니다.</li>
                  <li class="py-1">장바구니에 담고 주문하기 버튼을 클릭해 주문합니다.</li>
                </ul>
              </div>
            </div>

            <div class="mt-4 flex-1 flex flex-col justify-center">
              <div class="flex items-center">
                <Info size={16} class="mr-1.5 font-bold"/>
                <p class="leading-4 font-bold">안내사항</p>
              </div>
              
              <ul class="list-disc list- mt-2 leading-5 text-sm pl-4">
                <li class="ml-1 py-0.5">물, 냅킨, 물티슈는 셀프입니다.</li>
                <li class="ml-1 py-0.5">
                  운영시간
                  <ul class="list-none list-inside text-[0.9em] leading-4">
                    <li class="">화 - 목 : 18:00 - 24:00</li>
                    <li class="">금-토: 18:00 - 01:00 ( 다음날 휴일인 날도 동일 )</li>
                    <li class="">일: 18:00 - 23:00</li>
                    <li class="">월요일 정기휴무</li>
                  </ul>
                </li>
                <li class="ml-1 py-0.5">드시다가 남은 모든 주류는 포장 가능합니다.</li>
                <li class="ml-1 py-0.5">웨이팅 있을 시 사용시간 2시간으로 제한될 수 있는 점 양해 부탁드립니다.</li>
                <li class="ml-1 py-0.5">wifi - CORENZO_HOUSE / corenzo1234</li>
              </ul>
            </div>

          </div>
        </div>
      {/each}
    </div>
  </div>
  
  
</div>

<style>
  .page {
    width: 21cm;
    min-height: 29.7cm;
    font-family: 'Paperlogy';
    /* padding: 1.5cm 1.5cm 2cm 1.5cm; */
  }

  @page {
    size: A4;
    margin: 20cm;
  }

  @media print {
    .page {
      margin: 0;
      /* border: initial;
      border-radius: initial;
      width: initial;
      min-height: initial;
      box-shadow: initial;
      background: initial;
      page-break-after: always; */
    }
  }
  /* .qr-menu-item {
    border: 15px solid #ddd;
    border-image-source: url('/img/corenzo-border.svg');
    border-image-slice: 40;
    border-image-repeat: round;
  } */
</style>