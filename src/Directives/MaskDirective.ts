import Mask from "@/Components/Mask.vue";
import { uuid } from "@/Until/tools";
import { render } from "vue";
const MaskDirective = {
    mounted(el: HTMLElement, bidding, vNode) {
        const id = 'v-mask-' + uuid()
        const maskVNode = h(Mask, { id: id });
        const ele = document.getElementById(id);
        const { value } = bidding;
        if (value) {
            if(ele){
                 ele.style.display='black';
            }else{
                render(maskVNode, document.body)
            }
            
        } else {
            if (ele) {
               ele.style.display='none';
            };

        }

    }
}
export default MaskDirective
