import { PropType } from "vue";
declare type ButtonType = "primary" | "wraning" | "danger" | "default" | "info" | "sucess";
declare const _default: import("vue").DefineComponent<{
    type: {
        type: PropType<ButtonType>;
        default: string;
        vaildator: (val: string) => boolean;
    };
    icon: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    loading: BooleanConstructor;
    round: BooleanConstructor;
}, {
    classs: import("vue").ComputedRef<(string | {
        "is-disabled": boolean;
        "is-loading": boolean;
        "is-round": boolean;
    })[]>;
    handleClick: (e: any) => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click"[], "click", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    type: ButtonType;
    icon: string;
    disabled: boolean;
    loading: boolean;
    round: boolean;
} & {}>, {
    type: ButtonType;
    icon: string;
    disabled: boolean;
    loading: boolean;
    round: boolean;
}>;
export default _default;
