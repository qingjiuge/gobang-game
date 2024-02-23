import MaskDirective from "@/directives/MaskDirective";

const directives = { // 指令对象
    'mask': MaskDirective
}
export default {
    install(app, option) {
        Object.keys(directives).forEach((key) => {
            app.directive(key, directives[key])
        });
    }
}

