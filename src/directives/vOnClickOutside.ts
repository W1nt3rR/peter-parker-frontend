import { type DirectiveBinding } from "vue";
type FocusableElement = HTMLInputElement | HTMLTextAreaElement;

type ClickOutsideElement = FocusableElement & {
    clickOutsideEvent: EventListener;
};

const vOnClickOutside = {
    beforeMount(element: ClickOutsideElement, binding: DirectiveBinding) {
        element.clickOutsideEvent = (event: Event) => {
            if (!(element == event.target || element.contains(event.target as Node))) {
                binding.value(event);
            }
        };
        document.body.addEventListener("click", element.clickOutsideEvent);
    },
    unmounted(element: ClickOutsideElement) {
        document.body.removeEventListener("click", element.clickOutsideEvent);
    },
};

export default vOnClickOutside;
